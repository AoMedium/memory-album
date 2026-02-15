using MemoryAlbumServer.Models.Common;
using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Models.Entities;

public class Person : BaseEntity
{
    public required string FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Description { get; set; }
    public Photo? ProfilePicture { get; set; }
    public DateTime? Birthday { get; set; }
}
