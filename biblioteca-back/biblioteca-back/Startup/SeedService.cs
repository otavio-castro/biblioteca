using biblioteca_back.Context;
using biblioteca_back.Models;
using Microsoft.EntityFrameworkCore;

namespace biblioteca_back.Startup
{
    public class SeedService
    {
        private readonly AppDbContext _context;

        public SeedService(AppDbContext context) => _context = context;

        public async Task SeedAsync()
        {
            await SeedAcervoAsync();
            await _context.SaveChangesAsync();
        }

        // ── Acervo ──────────────────────────────────────────────────────────────

        private async Task SeedAcervoAsync()
        {
            var titulosExistentes = await _context.Set<ItemBiblioteca>()
                .Select(i => i.Titulo).ToHashSetAsync();

            // Capas via Open Library: https://covers.openlibrary.org/b/isbn/{ISBN}-L.jpg
            var livros = new List<Livro>
            {
                new() {
                    Titulo = "Harry Potter e a Pedra Filosofal",
                    Autor = "J.K. Rowling", AnoPublicacao = 1997,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg"
                },
                new() {
                    Titulo = "Harry Potter e a Câmara Secreta",
                    Autor = "J.K. Rowling", AnoPublicacao = 1998,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg"
                },
                new() {
                    Titulo = "Harry Potter e o Prisioneiro de Azkaban",
                    Autor = "J.K. Rowling", AnoPublicacao = 1999,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780439136365-L.jpg"
                },
                new() {
                    Titulo = "Harry Potter e o Cálice de Fogo",
                    Autor = "J.K. Rowling", AnoPublicacao = 2000,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780439139601-L.jpg"
                },
                new() {
                    Titulo = "O Senhor dos Anéis: A Sociedade do Anel",
                    Autor = "J.R.R. Tolkien", AnoPublicacao = 1954,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780618640157-L.jpg"
                },
                new() {
                    Titulo = "O Hobbit",
                    Autor = "J.R.R. Tolkien", AnoPublicacao = 1937,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg"
                },
                new() {
                    Titulo = "Dom Casmurro",
                    Autor = "Machado de Assis", AnoPublicacao = 1899,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9788535914849-L.jpg"
                },
                new() {
                    Titulo = "O Alquimista",
                    Autor = "Paulo Coelho", AnoPublicacao = 1988,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg"
                },
                new() {
                    Titulo = "1984",
                    Autor = "George Orwell", AnoPublicacao = 1949,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg"
                },
                new() {
                    Titulo = "O Pequeno Príncipe",
                    Autor = "Antoine de Saint-Exupéry", AnoPublicacao = 1943,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780156012195-L.jpg"
                },
                new() {
                    Titulo = "Duna",
                    Autor = "Frank Herbert", AnoPublicacao = 1965,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg"
                },
                new() {
                    Titulo = "Sapiens: Uma Breve História da Humanidade",
                    Autor = "Yuval Noah Harari", AnoPublicacao = 2011,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg"
                },
                new() {
                    Titulo = "Clean Code",
                    Autor = "Robert C. Martin", AnoPublicacao = 2008,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"
                },
                new() {
                    Titulo = "A Metamorfose",
                    Autor = "Franz Kafka", AnoPublicacao = 1915,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg"
                },
                new() {
                    Titulo = "O Código Da Vinci",
                    Autor = "Dan Brown", AnoPublicacao = 2003,
                    ImagemUrl = "https://covers.openlibrary.org/b/isbn/9780307474278-L.jpg"
                },
            };

            var revistas = new List<Revista>
            {
                new() {
                    Titulo = "National Geographic Brasil",
                    Editora = "Editora Abril", AnoPublicacao = 2024, Edicao = 287,
                    Periodicidade = Periodicidade.Mensal,
                    ImagemUrl = "https://covers.openlibrary.org/b/issn/1519-3691-L.jpg"
                },
                new() {
                    Titulo = "Superinteressante",
                    Editora = "Editora Abril", AnoPublicacao = 2024, Edicao = 458,
                    Periodicidade = Periodicidade.Mensal,
                    ImagemUrl = "https://covers.openlibrary.org/b/issn/0104-1789-L.jpg"
                },
                new() {
                    Titulo = "Galileu",
                    Editora = "Editora Globo", AnoPublicacao = 2024, Edicao = 390,
                    Periodicidade = Periodicidade.Mensal,
                    ImagemUrl = "https://covers.openlibrary.org/b/issn/0104-1789-L.jpg"
                },
                new() {
                    Titulo = "Scientific American Brasil",
                    Editora = "Springer Nature", AnoPublicacao = 2024, Edicao = 261,
                    Periodicidade = Periodicidade.Mensal,
                    ImagemUrl = "https://covers.openlibrary.org/b/issn/1676-9791-L.jpg"
                },
                new() {
                    Titulo = "Veja",
                    Editora = "Editora Abril", AnoPublicacao = 2024, Edicao = 2887,
                    Periodicidade = Periodicidade.Semanal,
                    ImagemUrl = "https://covers.openlibrary.org/b/issn/0100-3054-L.jpg"
                },
            };

            _context.Set<Livro>().AddRange(livros.Where(l => !titulosExistentes.Contains(l.Titulo)));
            _context.Set<Revista>().AddRange(revistas.Where(r => !titulosExistentes.Contains(r.Titulo)));
        }
    }
}
