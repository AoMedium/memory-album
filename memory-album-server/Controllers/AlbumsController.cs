using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController(IAlbumService albumService, IPhotoService photoService) : Controller
{
    private readonly IAlbumService _albumService = albumService;
    private readonly IPhotoService _photoService = photoService;

    // GET: /api/Albums
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumGetResponse>>> GetAlbums()
    {
        var albums = await _albumService.GetAllAsync();
        return albums.Select(MapToAlbumGetResponse).ToList();
    }

    // GET: /api/Albums/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AlbumGetResponse>> GetAlbumById(Guid id)
    {
        var album = await _albumService.GetById(id);

        if (album == null)
        {
            return NotFound();
        }
        return MapToAlbumGetResponse(album);
    }

    // POST: /api/Albums
    [HttpPost]
    public async Task<ActionResult<AlbumCreateResponse>> CreateAlbum(AlbumCreateRequest request)
    {
        if (!ModelState.IsValid) // Check if validation rules were broken during request-model binding.
        {
            return BadRequest(ModelState);
        }

        Photo? coverPhoto = null;

        if (request.CoverPhotoId.HasValue) // Get profile picture if specified
        {
            coverPhoto = await _photoService.GetById(request.CoverPhotoId.Value);

            if (coverPhoto == null)
            {
                return BadRequest("Invalid CoverPhotoId. Photo not found.");
            }
        }

        var album = new Album
        {
            Title = request.Title,
            Description = request.Description,
            CoverPhoto = coverPhoto,
            Events = [] // This action does not allow adding events
        };

        await _albumService.Add(album);

        // Return created album with the generated id
        return CreatedAtAction(nameof(CreateAlbum), new AlbumCreateResponse { Id = album.Id });
    }

    private static AlbumGetResponse MapToAlbumGetResponse(Album album)
    {
        return new AlbumGetResponse
        {
            Id = album.Id,
            Title = album.Title,
            Description = album.Description,
            CoverPhotoId = album.CoverPhoto?.Id,
            EventIds = [.. album.Events.Select(e => e.Id)]
        };
    }
}