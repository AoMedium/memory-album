using MemoryAlbumServer.Models.Entities.Media;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public class EventResponse
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime Timestamp { get; set; }
    public Position? Location { get; set; }
}