using MemoryAlbumServer.Models.Entities;

namespace MemoryAlbumServer.Services;

public interface IAlbumService
{
    Task<IEnumerable<Album>> GetAll();
    Task<Album?> GetById(Guid id);
    Task<Album> Add(Album album);
    Task AddEvents(Album album, IEnumerable<Event> events);
}