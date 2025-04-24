using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController(IEventService eventService, ILocationService locationService) : Controller
{
    private readonly IEventService _eventService = eventService;
    private readonly ILocationService _locationService = locationService;

    // GET: /api/Events
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventGetResponse>>> GetEventsByIds([FromQuery] IEnumerable<Guid> ids)
    {
        IEnumerable<Event> events;

        // If no ids are provided, return all events
        if (!ids.Any())
        {
            events = await _eventService.GetAll();
            return events.Select(MapToEventGetResponse).ToList();
        }

        // Otherwise, return events with the provided ids
        var eventIds = ids.ToHashSet();
        events = await _eventService.GetByIds(eventIds);

        if (!events.Any())
        {
            return NotFound("Cannot find any events with the provided ids.");
        }

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
    public async Task<ActionResult<EntityCreatedResponse>> CreateEvent(EventCreateRequest request)
    {
        var location = request.LocationId.HasValue
            ? await _locationService.GetById(request.LocationId.Value)
            : null;

        if (request.LocationId.HasValue && location == null)
        {
            return BadRequest($"Location with ID {request.LocationId} not found.");
        }

        var ev = new Event
        {
            Title = request.Title,
            Description = request.Description,
            Timestamp = DateTimeOffset.FromUnixTimeMilliseconds(request.Timestamp).UtcDateTime,
            Position = request.Position,
            Location = location
        };

        ev = await _eventService.Add(ev);

        return CreatedAtAction(nameof(CreateEvent), new EntityCreatedResponse { Id = ev.Id });
    }

    private static EventGetResponse MapToEventGetResponse(Event ev)
    {
        return new EventGetResponse
        {
            Id = ev.Id,
            Title = ev.Title,
            Description = ev.Description,
            Timestamp = ev.Timestamp,
            Position = ev.Position,
            LocationId = ev.Location?.Id,
            PersonIds = [.. ev.People.Select(person => person.Id)],
            TagIds = [.. ev.Tags.Select(tag => tag.Id)],
            PhotoIds = [.. ev.Photos.Select(photo => photo.Id)],
            VideoIds = [.. ev.Videos.Select(video => video.Id)]
        };
    }
}