using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class RevistaDTO
    {
        public int ItemId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public int AnoPublicacao { get; set; }
        public string? ImagemUrl { get; set; }
        public string TipoItem { get; set; } = "Revista";
        public string Editora { get; set; } = string.Empty;
        public int Edicao { get; set; }
        public Periodicidade Periodicidade { get; set; }
    }
}
