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
        context.SaveChanges();
    }

    private static void PopulateData(MemoryAlbumContext context)
    {
        Dictionary<string, Photo> photos = [];

        photos.Add("test-photo-1", new Photo { Data = Encoding.ASCII.GetBytes("test-photo-1") });
        photos.Add("test-photo-2", new Photo { Data = Encoding.ASCII.GetBytes("test-photo-2") });
        photos.Add("test-photo-3", new Photo { Data = Encoding.ASCII.GetBytes("test-photo-3") });

        photos.Add("cover-photo-1", new Photo { Data = Encoding.ASCII.GetBytes("cover-photo-1") });

        Dictionary<string, Video> videos = [];

        videos.Add("test-video-1", new Video { Data = Encoding.ASCII.GetBytes("test-video-1") });
        videos.Add("test-video-2", new Video { Data = Encoding.ASCII.GetBytes("test-video-2") });
        videos.Add("test-video-3", new Video { Data = Encoding.ASCII.GetBytes("test-video-3") });

        var event1 = new Event
        {
            Title = "Event 1",
            Photos = [.. photos.Values],
            Videos = [videos["test-video-1"]]
        };

        var person = new Person
        {
            FirstName = "Test Name"
        };

        var personEvent = new Event
        {
            Title = "Person Event",
            Photos = [photos["test-photo-2"]],
            // People = [person]
        };


        var album1 = new Album
        {
            Title = "Album Title 1",
            Description = "Album description 1",
            // Cover = photos["cover-photo-1"],
            Events = [event1]
        };

        var album2 = new Album
        {
            Title = "Album Title 2",
            Description = "Album description 2"
        };

        var personAlbum = new Album
        {
            Title = "Person Album",
            Events = [personEvent]
        };




        context.Albums.AddRange([album1, album2, personAlbum]);
    }
}