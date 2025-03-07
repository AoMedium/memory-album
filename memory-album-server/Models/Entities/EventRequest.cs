using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class EventRequest : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
    public Position? Location { get; set; }
}