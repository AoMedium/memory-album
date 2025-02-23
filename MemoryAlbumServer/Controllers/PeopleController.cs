using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PeopleController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/People
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Person>>> GetPeople()
    {
        return await _context.People.ToListAsync();
    }

    // GET: /api/People/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Person>> GetPersonById(Guid id)
    {
        var person = await _context.People.FindAsync(id);

        if (person == null)
        {
            return NotFound();
        }

        return person;
    }

    // POST: /api/People
    [HttpPost]
    public async Task<ActionResult<Person>> CreatePerson(Person person)
    {
        _context.People.Add(person);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreatePerson), new { id = person.Id });
    }
}