using MemoryAlbumServer.Models.Entities.Media;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Models.Entities;

[EntityTypeConfiguration(typeof(AlbumConfiguration))]
public class Album
{
    public int Id { get; set; }

    public string Title { get; set; }
    public string Description { get; set; }
    public Photo Cover { get; set; }
    public ICollection<Event> Events { get; set; }
}