namespace MemoryAlbumServer.Models.Entities;

public class AlbumAddEventsRequest
{
    public ICollection<Guid> EventIds { get; set; } = [];
}