namespace MemoryAlbumServer.Models.Entities;

public class AlbumResponse
{
    public Guid Id { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid? CoverPhotoId { get; set; }
    public ICollection<Guid> EventIds { get; set; } = [];
}