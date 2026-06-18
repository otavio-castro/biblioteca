using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace biblioteca_back.Models
{
    [Table("ItensBiblioteca")]
    public abstract class ItemBiblioteca
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ItemId { get; set; }

        [Required, StringLength(200)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        public int AnoPublicacao { get; set; }

        public string? ImagemUrl { get; set; }

        public ICollection<Emprestimo> Emprestimos { get; set; } = [];

        public abstract string ExibirInformacoes();
    }
}
