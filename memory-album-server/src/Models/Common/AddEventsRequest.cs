namespace MemoryAlbumServer.Models.Common;

public class AddEventsRequest
{
    public ICollection<Guid> EventIds { get; set; } = [];
}