using System.Threading.Tasks;
using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
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
    public async Task<ActionResult<IEnumerable<PersonDto>>> GetPeople()
    {
        var people = _context.People
            .Include(person => person.ProfilePicture) // Need to include or it will be missing from DTO
            .Select(person => MapToPersonDto(person));

        return await people.ToListAsync();
    }

    // GET: /api/People/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<PersonDto>> GetPersonById(Guid id)
    {
        var person = await _context.People
            .Include(person => person.ProfilePicture) // Need to include or it will be missing from DT
            .SingleOrDefaultAsync(person => id == person.Id);

        if (person == null)
        {
            return NotFound();
        }

        var personDto = MapToPersonDto(person);
        return personDto;
    }

    // POST: /api/People
    [HttpPost]
    public async Task<ActionResult> CreatePerson(PersonDto personDto)
    {
        if (!ModelState.IsValid) // Check if validation rules were broken during request-model binding.
        {
            return BadRequest(ModelState);
        }

        Photo? profilePicture = null;

        if (personDto.ProfilePictureId != null) // Get profile picture if specified
        {
            profilePicture = await _context.Media.OfType<Photo>().SingleOrDefaultAsync(photo => photo.Id == personDto.ProfilePictureId);

            if (profilePicture == null)
            {
                return BadRequest("Invalid ProfilePictureId. Photo not found.");
            }
        }

        var person = new Person
        {
            FirstName = personDto.FirstName,
            LastName = personDto.LastName,
            Description = personDto.Description,
            ProfilePicture = profilePicture,
            Birthday = personDto.Birthday,
        };

        _context.People.Add(person);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(CreatePerson), new { id = person.Id });
    }

    /// <summary>
    /// Remember to include any referenced entities before passing this person.
    /// </summary>
    /// <param name="person"></param>
    /// <returns></returns>
    private static PersonDto MapToPersonDto(Person person)
    {
        return new PersonDto
        {
            Id = person.Id,
            FirstName = person.FirstName,
            LastName = person.LastName,
            Description = person.Description,
            ProfilePictureId = person.ProfilePicture?.Id,
            Birthday = person.Birthday
        };
    }
}