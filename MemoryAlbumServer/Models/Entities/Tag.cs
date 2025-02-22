using System.Drawing;

namespace MemoryAlbumServer.Models.Entities;

public class Tag
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Color Color { get; set; }
}
