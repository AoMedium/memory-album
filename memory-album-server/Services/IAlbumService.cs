using MemoryAlbumServer.Data;
using MemoryAlbumServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace MemoryAlbumServer.Services;

public interface IAlbumService
{
    Task<IEnumerable<Album>> GetAllAsync();
    Task<Album?> GetById(Guid id);
}