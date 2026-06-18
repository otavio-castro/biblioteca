using biblioteca_back.Context;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace biblioteca_back.Repositories
{
    public class LivroRepository : ILivroRepository
    {
        private readonly AppDbContext _context;

        public LivroRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Livro>> GetAllAsync(StatusItem? status = null)
        {
            var query = _context.Livros.AsQueryable();
            if (status.HasValue)
                query = query.Where(l => l.Status == status.Value);
            return await query.ToListAsync();
        }

        public async Task<Livro?> GetByIdAsync(int id)
            => await _context.Livros.FindAsync(id);

        public async Task<Livro> CreateAsync(Livro livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();
            return livro;
        }

        public async Task UpdateAsync(Livro livro)
        {
            _context.Livros.Update(livro);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var livro = await GetByIdAsync(id);
            if (livro is not null)
            {
                _context.Livros.Remove(livro);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Livro?> GetMaisSolicitadoAsync()
            => await _context.Livros
                .OrderByDescending(l => l.ContadorEmprestimos)
                .FirstOrDefaultAsync();
    }
}
