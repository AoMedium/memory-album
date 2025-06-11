using System.Threading.Tasks;
using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;
using MemoryAlbumServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationsController(ILocationService locationService, IEventService eventService) : Controller
{
    private readonly ILocationService _locationService = locationService;
    private readonly IEventService _eventService = eventService;

    // GET: /api/Locations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LocationGetResponse>>> GetLocations()
    {
        var locations = await _locationService.GetAll();
        return locations.Select(MapToLocationGetResponse).ToList();
    }

    // GET: /api/Locations/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LocationGetResponse>> GetLocationById(Guid id)
    {
        var location = await _locationService.GetById(id);

        if (location == null)
        {
            return NotFound();
        }
        return MapToLocationGetResponse(location);
    }

    // POST: /api/Locations
    [HttpPost]
    public async Task<ActionResult<EntityCreatedResponse>> CreateLocation(LocationCreateRequest request)
    {
        if (!ModelState.IsValid) // Check if validation rules were broken during request-model binding.
        {
            return BadRequest(ModelState);
        }
        var location = new Location
        {
            Name = request.Name,
            Anchor = request.Anchor
        };

        await _locationService.Add(location);

        return CreatedAtAction(nameof(CreateLocation), new EntityCreatedResponse { Id = location.Id });
    }

    // PATCH: /api/Locations/{id}/Events
    [HttpPatch("{id}/Events")]
    public async Task<IActionResult> AddEvents(Guid id, AddEventsRequest request)
    {
        // FIXME: duplicate code with AlbumsController
        var eventIds = request.EventIds.ToHashSet();

        if (eventIds.Count != request.EventIds.Count)
        {
            return BadRequest("Duplicate event IDs in request");
        }

        var location = await _locationService.GetById(id);
        var events = await _eventService.GetByIds(eventIds);

        if (location == null)
        {
            return NotFound("Could not find location");
        }

        if (events.Count() != eventIds.Count)
        {
            return NotFound("One or more events with the given IDs could not be found");
        }

        // TODO: check if events are already added?

        await _locationService.AddEvents(location, events);
        return Ok("Added event to location");
    }

    private static LocationGetResponse MapToLocationGetResponse(Location location)
    {
        return new LocationGetResponse
        {
            Id = location.Id,
            Name = location.Name,
            Anchor = location.Anchor,
            EventIds = [.. location.Events.Select(e => e.Id)]
        };
    }
}