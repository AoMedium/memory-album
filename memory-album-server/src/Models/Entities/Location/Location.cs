using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;

public class Location : BaseEntity
{
    public required string Name { get; set; }
    public required GeoPosition Anchor { get; set; }
    public ICollection<Event> Events { get; set; } = [];
}