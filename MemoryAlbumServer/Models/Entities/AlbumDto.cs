namespace MemoryAlbumServer.Models.Entities;

public class AlbumDto
{
    public Guid Id { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }
    public Guid? CoverPhotoId { get; set; }
    public HashSet<Guid> EventIds { get; set; } = [];
}