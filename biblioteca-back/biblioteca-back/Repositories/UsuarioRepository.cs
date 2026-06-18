using biblioteca_back.Context;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace biblioteca_back.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppDbContext _context;

        public UsuarioRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Usuario>> GetAllAsync()
            => await _context.Usuarios.ToListAsync();

        public async Task<Usuario?> GetByIdAsync(int id)
            => await _context.Usuarios.FindAsync(id);

        public async Task<Usuario?> GetByEmailAsync(string email)
            => await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<Usuario> CreateAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task UpdateAsync(Usuario usuario)
        {
            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var usuario = await GetByIdAsync(id);
            if (usuario is not null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }
    }
}
