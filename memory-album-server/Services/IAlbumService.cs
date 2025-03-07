using MemoryAlbumServer.Models.Entities;

namespace MemoryAlbumServer.Services;

public interface IAlbumService
{
    Task<IEnumerable<Album>> GetAllAsync();
    Task<Album?> GetById(Guid id);
    Task<Album> Add(Album album);
}