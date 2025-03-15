using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController(IEventService eventService) : Controller
{
    private readonly IEventService _eventService = eventService;

    // GET: /api/Events
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventGetResponse>>> GetEvents()
    {
        var events = await _eventService.GetAll();
        return events.Select(MapToEventGetResponse).ToList();
    }

    // GET: /api/Events/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<EventGetResponse>> GetEventById(Guid id)
    {
        var ev = await _eventService.GetById(id);

        if (ev == null)
        {
            return NotFound();
        }

        return MapToEventGetResponse(ev);
    }

    // POST: /api/Events
    [HttpPost]
    public async Task<IActionResult> CreateEvent(EventCreateRequest request)
    {
        var ev = new Event
        {
            Title = request.Title,
            Description = request.Description,
            Timestamp = request.Timestamp,
            Location = request.Location
        };

        ev = await _eventService.CreateEvent(ev);

        return CreatedAtAction(nameof(CreateEvent), new { id = ev.Id });
    }

    private static EventGetResponse MapToEventGetResponse(Event ev)
    {
        return new EventGetResponse
        {
            Id = ev.Id,
            Title = ev.Title,
            Description = ev.Description,
            Timestamp = ev.Timestamp,
            Location = ev.Location,
            PersonIds = [.. ev.People.Select(person => person.Id)],
            TagIds = [.. ev.Tags.Select(tag => tag.Id)],
            PhotoIds = [.. ev.Photos.Select(photo => photo.Id)],
            VideoIds = [.. ev.Videos.Select(video => video.Id)]
        };
    }
}