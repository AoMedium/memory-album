using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Services;

public class LocationService(MemoryAlbumContext _context) : ILocationService
{
    private readonly MemoryAlbumContext _context = _context;

    public async Task<IEnumerable<Location>> GetAll()
    {
        var locations = await _context.Locations.ToListAsync();

        return locations;
    }

    public async Task<Location?> GetById(Guid id)
    {
        var location = await _context.Locations
            .SingleOrDefaultAsync(location => id == location.Id);

        return location;
    }

    public async Task<Location> Add(Location location)
    {
        _context.Locations.Add(location);
        await _context.SaveChangesAsync();

        // Return the created location with its generated ID
        return location;
    }
}