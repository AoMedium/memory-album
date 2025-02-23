using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Albums
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumDto>>> GetAlbums()
    {
        var albums = _context.Albums
            .Include(album => album.CoverPhoto) // Need to include or it will be missing from DTO
            .Include(album => album.Events)
            .Select(album => MapToAlbumDto(album));
        return await albums.ToListAsync();
    }

    // GET: /api/Albums/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AlbumDto>> GetAlbumById(Guid id)
    {
        var album = await _context.Albums
            .Include(album => album.CoverPhoto) // Need to include or it will be missing from DTO
            .Include(album => album.Events)
            .SingleOrDefaultAsync(album => id == album.Id);

        if (album == null)
        {
            return NotFound();
        }

        var albumDto = MapToAlbumDto(album);
        return albumDto;
    }

    // POST: /api/Albums
    [HttpPost]
    public async Task<ActionResult<AlbumDto>> CreateAlbum(AlbumDto albumDto)
    {
        if (!ModelState.IsValid) // Check if validation rules were broken during request-model binding.
        {
            return BadRequest(ModelState);
        }

        Photo? coverPhoto = null;

        if (albumDto.CoverPhotoId != null) // Get profile picture if specified
        {
            coverPhoto = await _context.Media.OfType<Photo>().SingleOrDefaultAsync(photo => photo.Id == albumDto.CoverPhotoId);

            if (coverPhoto == null)
            {
                return BadRequest("Invalid CoverPhotoId. Photo not found.");
            }
        }

        var events = await _context.Events
            .Where(e => albumDto.EventIds.Contains(e.Id))
            .ToListAsync();

        if (events.Count != albumDto.EventIds.Count)
        {
            return BadRequest("One or more EventIds are invalid.");
        }

        var album = new Album
        {
            Id = albumDto.Id,
            Title = albumDto.Title,
            Description = albumDto.Description,
            CoverPhoto = coverPhoto,
            Events = events
        };

        _context.Albums.Add(album);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateAlbum), new { id = album.Id });
    }

    private static AlbumDto MapToAlbumDto(Album album)
    {
        return new AlbumDto
        {
            Id = album.Id,
            Title = album.Title,
            Description = album.Description,
            CoverPhotoId = album.CoverPhoto?.Id,
            EventIds = [.. album.Events.Select(e => e.Id)]
        };
    }
}