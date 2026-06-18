using System.ComponentModel.DataAnnotations;

namespace biblioteca_back.DTOs
{
    public class EmprestimoCreateDTO
    {
        [Required]
        public int ItemId { get; set; }

        // Nullable: Aluno não envia (backend usa o claim do token)
        public int? UsuarioId { get; set; }

        [Required]
        public DateTime DataDevolucaoPrevista { get; set; }
    }
}
