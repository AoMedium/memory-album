using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;

public class Location : BaseEntity
{
    public required string Name { get; set; }
    public required GeoPosition Anchor { get; set; }
    public required GeoJson Zone { get; set; }
}