namespace MemoryAlbumServer.Models.Entities;

/// <summary>
/// TODO: implement cascading sharing permissions
/// </summary>
public abstract class ShareableContent
{
    public Guid Id { get; set; }
    public AccessType AccessType { get; set; }

    // public ICollection<User> SharedUsers { get; set; }
}