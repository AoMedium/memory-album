using MemoryAlbumServer.Models.Common;

namespace MemoryAlbumServer.Models.Entities;

/// <summary>
/// TODO: implement cascading sharing permissions
/// </summary>
public abstract class ShareableContent : BaseEntity
{
    public AccessType AccessType { get; set; }

    // public ICollection<User> SharedUsers { get; set; }
}