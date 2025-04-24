using MemoryAlbumServer.Models.Entities;

namespace MemoryAlbumServer.Services;

public interface IEventService
{
    Task<IEnumerable<Event>> GetAll();
    Task<Event?> GetById(Guid id);
    Task<IEnumerable<Event>> GetByIds(ICollection<Guid> ids);

    Task<Event> Add(Event ev);
}