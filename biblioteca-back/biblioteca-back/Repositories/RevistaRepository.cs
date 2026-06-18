using biblioteca_back.Context;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace biblioteca_back.Repositories
{
    public class RevistaRepository : IRevistaRepository
    {
        private readonly AppDbContext _context;

        public RevistaRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Revista>> GetAllAsync()
            => await _context.Revistas.ToListAsync();

        public async Task<Revista?> GetByIdAsync(int id)
            => await _context.Revistas.FindAsync(id);

        public async Task<Revista> CreateAsync(Revista revista)
        {
            _context.Revistas.Add(revista);
            await _context.SaveChangesAsync();
            return revista;
        }

        public async Task UpdateAsync(Revista revista)
        {
            _context.Revistas.Update(revista);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var revista = await GetByIdAsync(id);
            if (revista is not null)
            {
                _context.Revistas.Remove(revista);
                await _context.SaveChangesAsync();
            }
        }
    }
}
