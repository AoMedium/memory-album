namespace MemoryAlbumServer.Models.Entities.Media;

public class Photo
{
    public Guid Id { get; set; }
    public byte[]? Data { get; set; }
}
