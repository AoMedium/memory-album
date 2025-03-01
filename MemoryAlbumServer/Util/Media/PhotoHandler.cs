using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Util.Media;

public class PhotoHandler(IFormFile file) : MediumHandler(file)
{
    private static readonly string[] PermittedExtensions = [".png", ".jpg", ".jpeg"];

    // private readonly string[] videoExtensions = [".mov", ".mp4"];

    public static bool IsPhoto(IFormFile file)
    {
        var ext = GetExtension(file);

        if (string.IsNullOrEmpty(ext))
        {
            throw new InvalidOperationException("Extension is null or empty.");
        }

        return PermittedExtensions.Contains(ext);
    }
    public async Task<Photo> CreatePhotoAsync()
    {
        using var memoryStream = new MemoryStream();

        await FormFile.CopyToAsync(memoryStream);

        return new Photo
        {
            Data = memoryStream.ToArray()
        };
    }
}