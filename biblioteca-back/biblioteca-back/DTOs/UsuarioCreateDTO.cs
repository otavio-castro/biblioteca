using System.ComponentModel.DataAnnotations;
using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class UsuarioCreateDTO
    {
        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(200), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Telefone { get; set; }

        [Required, StringLength(100)]
        public string Senha { get; set; } = string.Empty;

        public PerfilUsuario Perfil { get; set; } = PerfilUsuario.Aluno;
    }
}
