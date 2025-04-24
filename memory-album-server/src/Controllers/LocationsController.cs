using System.Threading.Tasks;
using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LocationsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Locations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<LocationGetResponse>>> GetLocations()
    {
        var locations = _context.Locations
            .Select(location => MapToLocationGetResponse(location))
            .ToListAsync();

        return await locations;
    }

    // GET: /api/Locations/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<LocationGetResponse>> GetLocationById(Guid id)
    {
        var location = await _context.Locations.SingleOrDefaultAsync(location => id == location.Id);

        if (location == null)
        {
            return NotFound();
        }

        var locationDto = MapToLocationGetResponse(location);

        return locationDto;
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
            Anchor = request.Anchor,
            Zone = new GeoJson { Json = request.Zone } // TODO: GeoJson validation
        };

        _context.Locations.Add(location);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateLocation), new EntityCreatedResponse { Id = location.Id });
    }

    private static LocationGetResponse MapToLocationGetResponse(Location location)
    {
        return new LocationGetResponse
        {
            Id = location.Id,
            Name = location.Name,
            Anchor = location.Anchor,
            Zone = location.Zone.Json
        };
    }
}