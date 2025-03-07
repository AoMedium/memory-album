using MemoryAlbumServer.Models.Common;

namespace MemoryAlbumServer.Models.Entities;

public class AlbumResponse : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid? CoverPhotoId { get; set; }
    public ICollection<Guid> EventIds { get; set; } = [];
}