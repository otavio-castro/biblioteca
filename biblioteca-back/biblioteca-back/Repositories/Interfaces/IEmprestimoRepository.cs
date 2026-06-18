using biblioteca_back.Models;

namespace biblioteca_back.Repositories.Interfaces
{
    public interface IEmprestimoRepository
    {
        Task<IEnumerable<Emprestimo>> GetAllAsync(StatusEmprestimo? status = null, int? usuarioId = null);
        Task<Emprestimo?> GetByIdAsync(int id);
        Task<IEnumerable<Emprestimo>> GetAtivosAsync();
        Task<Emprestimo> CreateAsync(Emprestimo emprestimo);
        Task UpdateAsync(Emprestimo emprestimo);
    }
}
