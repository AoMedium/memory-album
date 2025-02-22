using System.ComponentModel.DataAnnotations;
using MemoryAlbumServer.Models.Properties;

namespace MemoryAlbumServer.Models.Entities;
public abstract class Event
{
    public Guid Id { get; set; }

    [Required]
    public string? Title { get; set; }
    public string? Description { get; set; }
    [Required]
    public DateTime Timestamp { get; set; }
    [Required]
    public Position? Location { get; set; }
    public ICollection<Tag>? Tags { get; set; }

    // // Navigation properties
    // public Guid AlbumId { get; set; }
    // public Album Album { get; set; } = null!;
}