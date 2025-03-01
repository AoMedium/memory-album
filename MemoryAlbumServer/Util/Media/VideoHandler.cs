using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Util.Media;

public class VideoHandler(IFormFile file) : MediumHandler(file)
{
    private static readonly string[] PermittedExtensions = [".mov", ".mp4"];

    public static bool IsVideo(IFormFile file)
    {
        var ext = GetExtension(file);

        if (string.IsNullOrEmpty(ext))
        {
            throw new InvalidOperationException("Extension is null or empty.");
        }

        return PermittedExtensions.Contains(ext);
    }
    public async Task<Video> CreateVideoAsync()
    {
        using var memoryStream = new MemoryStream();

        await FormFile.CopyToAsync(memoryStream);

        return new Video
        {
            Data = memoryStream.ToArray()
        };
    }
}