using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController(IAlbumService albumService) : Controller
{
    private readonly IAlbumService _albumService = albumService;

    // GET: /api/Albums
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumResponse>>> GetAlbums()
    {
        var albums = await _albumService.GetAllAsync();
        return albums.Select(MapToAlbumResponse).ToList();
    }

    // GET: /api/Albums/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AlbumResponse>> GetAlbumById(Guid id)
    {
        var album = await _albumService.GetById(id);

        if (album == null)
        {
            return NotFound();
        }
        return MapToAlbumResponse(album);
    }

    // POST: /api/Albums
    [HttpPost]
    public async Task<ActionResult<AlbumResponse>> CreateAlbum(AlbumRequest albumRequest)
    {
        if (!ModelState.IsValid) // Check if validation rules were broken during request-model binding.
        {
            return BadRequest(ModelState);
        }

        Photo? coverPhoto = null;

        if (albumRequest.CoverPhotoId != null) // Get profile picture if specified
        {
            coverPhoto = await _context.Media.OfType<Photo>().SingleOrDefaultAsync(photo => photo.Id == albumRequest.CoverPhotoId);

            if (coverPhoto == null)
            {
                return BadRequest("Invalid CoverPhotoId. Photo not found.");
            }
        }

        var album = new Album
        {
            Id = albumRequest.Id,
            Title = albumRequest.Title,
            Description = albumRequest.Description,
            CoverPhoto = coverPhoto,
            Events = [] // This action does not allow adding events
        };

        _context.Albums.Add(album);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateAlbum), new { id = album.Id });
    }

    private static AlbumResponse MapToAlbumResponse(Album album)
    {
        return new AlbumResponse
        {
            Id = album.Id,
            Title = album.Title,
            Description = album.Description,
            CoverPhotoId = album.CoverPhoto?.Id,
            EventIds = [.. album.Events.Select(e => e.Id)]
        };
    }
}