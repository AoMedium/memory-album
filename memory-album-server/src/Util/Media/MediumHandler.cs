using MemoryAlbumServer.Models.Entities.Media;

namespace MemoryAlbumServer.Util.Media;

public class MediumHandler(IFormFile file)
{
    protected readonly IFormFile FormFile = file;

    public async Task<Medium> CreateMediumAsync()
    {
        if (PhotoHandler.IsPhoto(FormFile))
        {
            return await new PhotoHandler(FormFile).CreatePhotoAsync();
        }
        else if (VideoHandler.IsVideo(FormFile))
        {
            return await new VideoHandler(FormFile).CreateVideoAsync();
        }
        throw new InvalidOperationException("Cannot create media from unsupported extensions.");

    }
    protected static string GetExtension(IFormFile file)
    {
        return Path.GetExtension(file.FileName).ToLowerInvariant();
    }
}