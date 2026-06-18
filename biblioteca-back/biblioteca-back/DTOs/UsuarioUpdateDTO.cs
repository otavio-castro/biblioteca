using System.ComponentModel.DataAnnotations;

namespace biblioteca_back.DTOs
{
    public class UsuarioUpdateDTO
    {
        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(200), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Telefone { get; set; }
    }
}
