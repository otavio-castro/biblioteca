using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace biblioteca_back.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioId { get; set; }

        [Required, StringLength(150)]
        public string Nome { get; set; } = string.Empty;

        [Required, StringLength(200)]
        public string Email { get; set; } = string.Empty;

        [StringLength(20)]
        public string? Telefone { get; set; }

        [Required]
        public string Senha { get; set; } = string.Empty;

        [Required]
        public PerfilUsuario Perfil { get; set; } = PerfilUsuario.Aluno;

        public ICollection<Emprestimo> Emprestimos { get; set; } = [];
    }

    public enum PerfilUsuario { Bibliotecario = 0, Aluno = 1 }
}
