using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Services;

public interface IPhotoService
{
    Task<Photo?> GetById(Guid id);
}