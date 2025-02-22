using System.ComponentModel.DataAnnotations;

namespace MemoryAlbumServer.Models.Entities;
public abstract class Event
{
    public int Id { get; set; }

    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    [Required]
    public DateTime Timestamp { get; set; }
    [Required]
    public Position? Location { get; set; }
    public ICollection<Tag>? Tags { get; set; }
}