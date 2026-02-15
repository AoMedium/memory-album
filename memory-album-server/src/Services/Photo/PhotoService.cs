using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities.Media;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Services;

public class PhotoService(MemoryAlbumContext _context) : IPhotoService
{
    private readonly MemoryAlbumContext _context = _context;

    public async Task<Photo?> GetById(Guid id)
    {
        var photo = await _context.Media
            .OfType<Photo>()
            .SingleOrDefaultAsync(photo => photo.Id == id);

        return photo;
    }
}