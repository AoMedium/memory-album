using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class Event : BaseEntity
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
    public Position? Location { get; set; }
    public ICollection<Person> People { get; set; } = [];
    public ICollection<Tag> Tags { get; set; } = [];
    public ICollection<Photo> Photos { get; set; } = [];
    public ICollection<Video> Videos { get; set; } = [];
}