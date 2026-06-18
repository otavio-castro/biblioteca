using biblioteca_back.DTOs;
using biblioteca_back.Models;

namespace biblioteca_back.Services.Interfaces
{
    public interface IEmprestimoService
    {
        Task<IEnumerable<Emprestimo>> GetAllAsync(StatusEmprestimo? status = null, int? usuarioId = null);
        Task<Emprestimo?> GetByIdAsync(int id);
        Task<Emprestimo> CreateAsync(EmprestimoCreateDTO dto);
        Task DevolverAsync(int id);
        Task<RelatorioMaisSolicitadoDTO?> GetMaisSolicitadoAsync();
        Task<IEnumerable<EmprestimoAtivoDTO>> GetEmprestimosAtivosAsync(int? usuarioId = null);
    }
}
