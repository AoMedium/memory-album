using MemoryAlbumServer.Models.Entities;

namespace MemoryAlbumServer.Services;

public interface ILocationService
{
    Task<IEnumerable<Location>> GetAll();
    Task<Location?> GetById(Guid id);
    Task<Location> Add(Location location);
}