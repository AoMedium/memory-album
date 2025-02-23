using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Albums
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Album>>> GetAlbums()
    {
        return await _context.Albums
            .Include(album => album.Cover)
            .ToListAsync();
    }

    // GET: /api/Albums/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Album>> GetAlbumById(Guid id)
    {
        var album = await _context.Albums.FindAsync(id);

        if (album == null)
        {
            return NotFound();
        }

        return album;
    }

    // POST: /api/Albums
    [HttpPost]
    public async Task<ActionResult<Album>> PostAlbum(Album album)
    {
        _context.Albums.Add(album);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(PostAlbum), new { id = album.Id });
    }
}