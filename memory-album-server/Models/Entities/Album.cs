using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class Album : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Photo? CoverPhoto { get; set; }
    public ICollection<Event> Events { get; set; } = [];
}