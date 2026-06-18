using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class UsuarioDTO
    {
        public int UsuarioId { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Telefone { get; set; }
        public PerfilUsuario Perfil { get; set; }
    }
}
