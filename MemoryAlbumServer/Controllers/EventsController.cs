using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Events
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events
            .Include(e => e.People)
            .Include(e => e.Tags)
            .ToListAsync();
    }

    // GET: /api/Events/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEventById(Guid id)
    {
        var e = await _context.Events.FindAsync(id);

        if (e == null)
        {
            return NotFound();
        }

        return e;
    }

    // POST: /api/Events
    [HttpPost]
    public async Task<ActionResult<Album>> CreateEvent(Event ev)
    {
        _context.Events.Add(ev);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateEvent), new { id = ev.Id });
    }
}