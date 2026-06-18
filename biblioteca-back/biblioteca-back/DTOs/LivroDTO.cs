using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class LivroDTO
    {
        public int ItemId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public int AnoPublicacao { get; set; }
        public string? ImagemUrl { get; set; }
        public string TipoItem { get; set; } = "Livro";
        public string Autor { get; set; } = string.Empty;
        public StatusItem Status { get; set; }
        public int ContadorEmprestimos { get; set; }
    }
}
