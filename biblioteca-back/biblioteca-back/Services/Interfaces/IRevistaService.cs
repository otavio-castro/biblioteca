using biblioteca_back.DTOs;
using biblioteca_back.Models;

namespace biblioteca_back.Services.Interfaces
{
    public interface IRevistaService
    {
        Task<IEnumerable<Revista>> GetAllAsync();
        Task<Revista?> GetByIdAsync(int id);
        Task<Revista> CreateAsync(RevistaCreateDTO dto);
        Task UpdateAsync(int id, RevistaUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
