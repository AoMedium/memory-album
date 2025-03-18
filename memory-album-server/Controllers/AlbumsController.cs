using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController(IAlbumService albumService, IEventService eventService, IPhotoService photoService) : Controller
{
    private readonly IAlbumService _albumService = albumService;
    private readonly IEventService _eventService = eventService;
    private readonly IPhotoService _photoService = photoService;

    // GET: /api/Albums
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AlbumGetResponse>>> GetAlbums()
    {
        var albums = await _albumService.GetAll();
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
    public async Task<ActionResult<EntityCreatedResponse>> CreateAlbum(AlbumCreateRequest request)
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
        return CreatedAtAction(nameof(CreateAlbum), new EntityCreatedResponse { Id = album.Id });
    }

    // PATCH: /api/Albums/{id}/Events
    [HttpPatch("{id}/Events")]
    public async Task<IActionResult> AddEvents(Guid id, AlbumAddEventsRequest request)
    {
        var eventIds = request.EventIds.ToHashSet();

        if (eventIds.Count != request.EventIds.Count)
        {
            return BadRequest("Duplicate event IDs in request");
        }

        var album = await _albumService.GetById(id);
        var events = await _eventService.GetByIds(eventIds);

        if (album == null)
        {
            return NotFound("Could not find album");
        }

        if (events.Count() != eventIds.Count)
        {
            return NotFound("One or more events with the given IDs could not be found");
        }

        // TODO: check if events are already added?

        await _albumService.AddEvents(album, events);
        return NoContent();
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