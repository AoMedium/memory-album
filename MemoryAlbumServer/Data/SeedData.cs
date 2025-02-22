using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MemoryAlbumServer.Data;
using System;
using System.Linq;
using MemoryAlbumServer.Models.Entities;
using MemoryAlbumServer.Models.Entities.Media;
using System.Text;

namespace MvcMovie.Models;

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
        context.Albums.AddRange(
            new Album
            {
                Title = "Album Title 1",
                Description = "Album description 1",
                Cover = new Photo
                {
                    Data = Encoding.ASCII.GetBytes("test-photo")
                },
                Events = [
                    new Memory
                    {
                        Title = "Memory 1",
                        Photos = [
                            new Photo { Data = Encoding.ASCII.GetBytes("test-photo-1") },
                            new Photo { Data = Encoding.ASCII.GetBytes("test-photo-2") },
                        ],
                        Videos = [
                            new Video { Data = Encoding.ASCII.GetBytes("test-video-1") }
                        ]
                    },
                    new Event
                    {
                        Title = "Event 1"
                    }
                ]
            },
            new Album
            {
                Title = "Album Title 2",
                Description = "Album description 2"
            },
            new Album
            {
                Title = "Album Title 3",
                Description = "Album description 3"
            }
        );
        context.SaveChanges();
    }
}