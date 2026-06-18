using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace biblioteca_back.Models
{
    [Table("Emprestimos")]
    public class Emprestimo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmprestimoId { get; set; }

        [ForeignKey("Item")]
        public int ItemId { get; set; }
        public ItemBiblioteca? Item { get; set; }

        [ForeignKey("Usuario")]
        public int UsuarioId { get; set; }
        public Usuario? Usuario { get; set; }

        public DateTime DataEmprestimo { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime DataDevolucaoPrevista { get; set; }

        public DateTime? DataDevolucaoEfetiva { get; set; }

        [Required]
        public StatusEmprestimo Status { get; set; } = StatusEmprestimo.Ativo;
    }

    public enum StatusEmprestimo { Ativo = 0, Devolvido = 1, Atrasado = 2 }
}
