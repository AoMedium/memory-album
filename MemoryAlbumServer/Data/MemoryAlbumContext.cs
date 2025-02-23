using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Data;

public class MemoryAlbumContext(DbContextOptions<MemoryAlbumContext> options) : DbContext(options)
{
    public DbSet<Album> Albums { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<Memory> Memories { get; set; }
    public DbSet<Person> People { get; set; }
    public DbSet<Tag> Tags { get; set; }

    // Media
    public DbSet<Medium> Media { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Video> Videos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Album>()
            .Property(album => album.Title).IsRequired();

        // TODO: add configurations

        modelBuilder.Entity<Event>(entity =>
        {
            entity.OwnsOne(e => e.Location); // Configures Location as a property rather than an entity
            entity.Property(e => e.Title).IsRequired();
        });

        modelBuilder.Entity<Person>(entity =>
        {
            entity.Property(e => e.FirstName).IsRequired();
        });

        modelBuilder.Entity<Photo>()
            .Property(photo => photo.Data).IsRequired();

        modelBuilder.Entity<Video>()
            .Property(video => video.Data).IsRequired();
    }
}