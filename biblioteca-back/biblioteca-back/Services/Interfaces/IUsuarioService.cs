using biblioteca_back.DTOs;
using biblioteca_back.Models;

namespace biblioteca_back.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task<Usuario?> GetByIdAsync(int id);
        Task<Usuario> CreateAsync(UsuarioCreateDTO dto);
        Task UpdateAsync(int id, UsuarioUpdateDTO dto);
        Task DeleteAsync(int id);
    }
}
