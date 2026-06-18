using biblioteca_back.Models;

namespace biblioteca_back.Repositories.Interfaces
{
    public interface ILivroRepository
    {
        Task<IEnumerable<Livro>> GetAllAsync(StatusItem? status = null);
        Task<Livro?> GetByIdAsync(int id);
        Task<Livro> CreateAsync(Livro livro);
        Task UpdateAsync(Livro livro);
        Task DeleteAsync(int id);
        Task<Livro?> GetMaisSolicitadoAsync();
    }
}
