using biblioteca_back.Models;

namespace biblioteca_back.Repositories.Interfaces
{
    public interface IRevistaRepository
    {
        Task<IEnumerable<Revista>> GetAllAsync();
        Task<Revista?> GetByIdAsync(int id);
        Task<Revista> CreateAsync(Revista revista);
        Task UpdateAsync(Revista revista);
        Task DeleteAsync(int id);
    }
}
