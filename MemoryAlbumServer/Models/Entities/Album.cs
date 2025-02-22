using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class Album
{
    public int Id { get; set; }

    public string Title { get; set; }
    public string Description { get; set; }
    public Photo Cover { get; set; }
    public ICollection<Event> Events { get; set; }
}