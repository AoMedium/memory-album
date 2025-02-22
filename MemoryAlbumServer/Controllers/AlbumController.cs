using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace MemoryAlbumServer.Controllers;

[ApiController]
[Route("[controller]")]
public class AlbumsController(MemoryAlbumContext context) : Controller
{
    private readonly MemoryAlbumContext _context = context;

    // GET: /Albums
    [HttpGet]
    public IEnumerable<Album> Get()
    {
        return _context.Albums.AsEnumerable();
    }
}