using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class Event
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
    public Position? Location { get; set; }
    public ICollection<Person> People { get; set; } = [];
    public ICollection<Tag> Tags { get; set; } = [];
}