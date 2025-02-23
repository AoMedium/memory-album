using Microsoft.EntityFrameworkCore;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using System.Text;

namespace MemoryAlbumServer.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new MemoryAlbumContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<MemoryAlbumContext>>());

        // Look for any movies.
        if (context.Albums.Any())
        {
            return;   // DB has been seeded
        }

        PopulateData(context);
    }

    private static void PopulateData(MemoryAlbumContext context)
    {
        // Media

        Dictionary<string, Photo> photos = [];
        photos.Add("test-photo-1", new Photo { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("test-photo-1") });
        photos.Add("test-photo-2", new Photo { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("test-photo-2") });
        photos.Add("test-photo-3", new Photo { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("test-photo-3") });
        photos.Add("cover-photo-1", new Photo { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("cover-photo-1") });

        Dictionary<string, Video> videos = [];
        videos.Add("test-video-1", new Video { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("test-video-1") });
        videos.Add("test-video-2", new Video { Id = Guid.NewGuid(), Data = Encoding.ASCII.GetBytes("test-video-2") });

        context.Media.AddRange([.. photos.Values, .. videos.Values]);
        context.SaveChanges();

        var contextPhotos = context.Media.OfType<Photo>();
        var contextVideos = context.Media.OfType<Video>();





        // People

        var person1 = new Person
        {
            Id = Guid.NewGuid(),
            FirstName = "Test Name"
        };

        var person2 = new Person
        {
            Id = Guid.NewGuid(),
            FirstName = "Profile Person",
            ProfilePicture = contextPhotos.SingleOrDefault(p => p.Id == photos["test-photo-3"].Id),
        };

        context.People.AddRange([person1, person2]);





        // Events

#pragma warning disable CS8601 // Possible null reference assignment.
        var event1 = new Event
        {
            Id = Guid.NewGuid(),
            Title = "Event 1",
            Photos = [
                    contextPhotos.SingleOrDefault(p => p.Id == photos["test-photo-1"].Id),
                    contextPhotos.SingleOrDefault(p => p.Id == photos["test-photo-2"].Id)
                ],
            Videos = [contextVideos.SingleOrDefault(v => v.Id == videos["test-video-2"].Id)]
        };

        var personEvent = new Event
        {
            Id = Guid.NewGuid(),
            Title = "Person Event",
            Photos = [contextPhotos.SingleOrDefault(p => p.Id == photos["test-photo-2"].Id)],
            People = [context.People.Find(person1.Id), context.People.Find(person2.Id)]
        };

        context.Events.AddRange([event1, personEvent]);



        // Albums

        var album1 = new Album
        {
            Title = "Album Title 1",
            Description = "Album description 1",
            Cover = contextPhotos.SingleOrDefault(p => p.Id == photos["cover-photo-1"].Id),
            Events = [context.Events.Find(event1.Id)]
        };

        var album2 = new Album
        {
            Title = "Album Title 2",
            Description = "Album description 2"
        };

        var personAlbum = new Album
        {
            Title = "Person Album",
            Events = [context.Events.Find(personEvent.Id)]
        };

        context.Albums.AddRange([album1, album2, personAlbum]);

#pragma warning restore CS8601 // Possible null reference assignment.

        context.SaveChanges();
    }
}