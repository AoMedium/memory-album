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
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Video> Videos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Album>();

        // TODO: add configurations
        modelBuilder.Entity<Event>();
        modelBuilder.Entity<Memory>();
        modelBuilder.Entity<Person>();
        modelBuilder.Entity<Tag>();
        modelBuilder.Entity<Photo>();
        modelBuilder.Entity<Video>();
    }

}