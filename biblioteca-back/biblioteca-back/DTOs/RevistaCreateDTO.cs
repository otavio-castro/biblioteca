using System.ComponentModel.DataAnnotations;
using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class RevistaCreateDTO
    {
        [Required, StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public int AnoPublicacao { get; set; }

        [Required, StringLength(150)]
        public string Editora { get; set; } = string.Empty;

        [Required]
        public int Edicao { get; set; }

        [Required]
        public Periodicidade Periodicidade { get; set; } = Periodicidade.Mensal;

        public string? ImagemUrl { get; set; }
    }
}
