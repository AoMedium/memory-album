using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class EventCreateRequest
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public long Timestamp { get; set; }
    public Geoposition? Position { get; set; }
}