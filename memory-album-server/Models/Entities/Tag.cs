using MemoryAlbumServer.Models.Common;

namespace MemoryAlbumServer.Models.Entities;

public class Tag : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Color { get; set; }
}
