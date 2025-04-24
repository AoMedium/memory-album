using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Util.Media;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /api/Media
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Medium>>> GetMedia()
    {
        return await _context.Media.ToListAsync();
    }

    // POST: /api/Media

    /// <summary>
    /// https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-9.0
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> PostMedium(IFormFile file)
    {
        const float fileSizeLimit = 2097.152f; // TODO: replace with config value https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-9.0

        if (file == null || file.Length == 0)
        {
            return BadRequest();
        }

        if (file.Length > fileSizeLimit)
        {
            return BadRequest($"File size larger than {fileSizeLimit / 1024f / 1024f}MB");
        }

        Medium medium;

        try
        {
            medium = await new MediumHandler(file).CreateMediumAsync();
        }
        catch (InvalidOperationException e)
        {
            return BadRequest(e.Message);
        }

        _context.Media.Add(medium);
        await _context.SaveChangesAsync();

        long size = file.Length;

        return Ok(new { size, id = medium.Id });
    }

    // GET: /api/Media/Photos
    [HttpGet("Photos")]
    public async Task<ActionResult<IEnumerable<Photo>>> GetPhotos()
    {
        return await _context.Media.OfType<Photo>().ToListAsync();
    }

    // GET: /api/Media/Photos/{id}
    [HttpGet("Photos/{id}")]
    public async Task<ActionResult<Photo>> GetPhotoById(Guid id)
    {
        var photo = await _context.Media.OfType<Photo>().SingleOrDefaultAsync(x => x.Id == id);

        if (photo == null)
        {
            return NotFound();
        }
        return photo;
    }

    // GET: /api/Media/Videos
    [HttpGet("Videos")]
    public async Task<ActionResult<IEnumerable<Video>>> GetVideos()
    {
        return await _context.Media.OfType<Video>().ToListAsync();
    }

    // GET: /api/Media/Videos/{id}
    [HttpGet("Videos/{id}")]
    public async Task<ActionResult<Video>> GetVideoById(Guid id)
    {
        var video = await _context.Media.OfType<Video>().SingleOrDefaultAsync(x => x.Id == id);

        if (video == null)
        {
            return NotFound();
        }
        return video;
    }
}