using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class Memory : Event
{
    public ICollection<Photo> Photos { get; set; } = [];
    public ICollection<Video> Videos { get; set; } = [];
}
