using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class AlbumRequest
{
    public Guid Id { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid? CoverPhotoId { get; set; }
}