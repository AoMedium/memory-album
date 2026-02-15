using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;

public class EventCreateRequest
{
    public required string Title { get; set; }
    public string? Description { get; set; }
    public long Timestamp { get; set; }
    public required GeoPosition Position { get; set; }
}