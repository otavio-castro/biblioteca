using System.ComponentModel.DataAnnotations;

namespace biblioteca_back.DTOs
{
    public class LivroCreateDTO
    {
        [Required, StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public int AnoPublicacao { get; set; }

        [Required, StringLength(150)]
        public string Autor { get; set; } = string.Empty;

        public string? ImagemUrl { get; set; }
    }
}
