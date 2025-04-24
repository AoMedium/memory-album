using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Tags
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
    {
        return await _context.Tags.ToListAsync();
    }

    // GET: /api/Tags/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Tag>> GetTagById(Guid id)
    {
        var tag = await _context.Tags.FindAsync(id);

        if (tag == null)
        {
            return NotFound();
        }

        return tag;
    }

    // POST: /api/Tags
    [HttpPost]
    public async Task<ActionResult<EntityCreatedResponse>> CreateTag(Tag tag)
    {
        _context.Tags.Add(tag);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateTag), new EntityCreatedResponse { Id = tag.Id });
    }
}