using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class Album
{
    public Guid Id { get; set; }

    public string? Title { get; set; }
    public string? Description { get; set; }
    public Photo? CoverPhoto { get; set; }
    public ICollection<Event> Events { get; set; } = [];
}