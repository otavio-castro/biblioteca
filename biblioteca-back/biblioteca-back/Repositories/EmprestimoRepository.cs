using biblioteca_back.Context;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace biblioteca_back.Repositories
{
    public class EmprestimoRepository : IEmprestimoRepository
    {
        private readonly AppDbContext _context;

        public EmprestimoRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Emprestimo>> GetAllAsync(StatusEmprestimo? status = null, int? usuarioId = null)
        {
            var query = _context.Emprestimos
                .Include(e => e.Item)
                .Include(e => e.Usuario)
                .AsQueryable();

            if (status.HasValue)
                query = query.Where(e => e.Status == status.Value);

            if (usuarioId.HasValue)
                query = query.Where(e => e.UsuarioId == usuarioId.Value);

            return await query.ToListAsync();
        }

        public async Task<Emprestimo?> GetByIdAsync(int id)
            => await _context.Emprestimos
                .Include(e => e.Item)
                .Include(e => e.Usuario)
                .FirstOrDefaultAsync(e => e.EmprestimoId == id);

        public async Task<IEnumerable<Emprestimo>> GetAtivosAsync()
            => await _context.Emprestimos
                .Include(e => e.Item)
                .Include(e => e.Usuario)
                .Where(e => e.Status == StatusEmprestimo.Ativo)
                .OrderBy(e => e.DataDevolucaoPrevista)
                .ToListAsync();

        public async Task<Emprestimo> CreateAsync(Emprestimo emprestimo)
        {
            _context.Emprestimos.Add(emprestimo);
            await _context.SaveChangesAsync();
            return emprestimo;
        }

        public async Task UpdateAsync(Emprestimo emprestimo)
        {
            _context.Emprestimos.Update(emprestimo);
            await _context.SaveChangesAsync();
        }
    }
}
