using MemoryAlbumServer.Models.Common;

namespace MemoryAlbumServer.Models.Entities;

public class AlbumGetResponse : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid? CoverPhotoId { get; set; }
    public ICollection<Guid> EventIds { get; set; } = [];
}