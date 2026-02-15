using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Services;

public class EventService(MemoryAlbumContext _context) : IEventService
{
    private readonly MemoryAlbumContext _context = _context;

    public async Task<IEnumerable<Event>> GetAll()
    {
        return await _context.Events
            .Include(e => e.People)
            .Include(e => e.Tags)
            .ToListAsync();
    }

    public async Task<Event?> GetById(Guid id)
    {
        return await _context.FindAsync<Event>(id);
    }
    public async Task<IEnumerable<Event>> GetByIds(ICollection<Guid> ids)
    {
        return await _context.Events
            .Where(ev => ids.Contains(ev.Id))
            .ToListAsync();
    }

    public async Task<Event> Add(Event ev)
    {
        _context.Events.Add(ev);
        await _context.SaveChangesAsync();
        return ev;
    }

}