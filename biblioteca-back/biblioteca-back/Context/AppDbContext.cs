using Microsoft.EntityFrameworkCore;
using biblioteca_back.Models;

namespace biblioteca_back.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ItemBiblioteca> ItensBiblioteca { get; set; }
        public DbSet<Livro> Livros { get; set; }
        public DbSet<Revista> Revistas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Emprestimo> Emprestimos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ItemBiblioteca>()
                .HasDiscriminator<string>("TipoItem")
                .HasValue<Livro>("Livro")
                .HasValue<Revista>("Revista");
        }
    }
}
