using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Util.Media;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("[controller]")]
public class MediaController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /Photos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Medium>>> GetMedia()
    {
        return await _context.Media.ToListAsync();
    }

    // POST: /Photos

    /// <summary>
    /// https://learn.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-9.0
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<IActionResult> PostMedia(IFormFile file)
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
}