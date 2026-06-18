using biblioteca_back.DTOs;
using biblioteca_back.Models;

namespace biblioteca_back.Services.Interfaces
{
    public interface ILivroService
    {
        Task<IEnumerable<Livro>> GetAllAsync(StatusItem? status = null);
        Task<Livro?> GetByIdAsync(int id);
        Task<Livro> CreateAsync(LivroCreateDTO dto);
        Task UpdateAsync(int id, LivroUpdateDTO dto);
        Task DeleteAsync(int id);
        Task<Livro?> GetMaisSolicitadoAsync();
    }
}
