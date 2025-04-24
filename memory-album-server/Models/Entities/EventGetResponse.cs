using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class EventGetResponse : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
    public Geoposition? Position { get; set; }
    public ICollection<Guid> PersonIds { get; set; } = [];
    public ICollection<Guid> TagIds { get; set; } = [];
    public ICollection<Guid> PhotoIds { get; set; } = [];
    public ICollection<Guid> VideoIds { get; set; } = [];
}