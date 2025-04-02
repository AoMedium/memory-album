using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Services;

public class AlbumService(MemoryAlbumContext _context) : IAlbumService
{
    private readonly MemoryAlbumContext _context = _context;

    public async Task<IEnumerable<Album>> GetAll()
    {
        var albums = await _context.Albums
            .Include(album => album.CoverPhoto) // Need to include or it will be missing from DTO
            .Include(album => album.Events)
            .ToListAsync();

        return albums;
    }

    public async Task<Album?> GetById(Guid id)
    {
        var album = await _context.Albums
           .Include(album => album.CoverPhoto) // Need to include or it will be missing from DTO
           .Include(album => album.Events)
           .SingleOrDefaultAsync(album => id == album.Id);

        return album;
    }

    public async Task<Album> Add(Album album)
    {
        _context.Albums.Add(album);
        await _context.SaveChangesAsync();

        // Return the created album with its generated ID
        return album;
    }

    public async Task AddEvents(Album album, IEnumerable<Event> events)
    {
        foreach (var ev in events)
        {
            album.Events.Add(ev);
        }
        await _context.SaveChangesAsync();
    }
}