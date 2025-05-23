using MemoryAlbumServer.Models.Common;

namespace MemoryAlbumServer.Models.Entities;

public class PersonDto : BaseEntity
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Description { get; set; }
    public Guid? ProfilePictureId { get; set; }
    public DateTime Birthday { get; set; }
}
