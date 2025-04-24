using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;

public class LocationGetResponse : BaseEntity
{
    public required string Name { get; set; }
    public required GeoPosition Anchor { get; set; }
    public required string Zone { get; set; }
}