using biblioteca_back.Models;

namespace biblioteca_back.DTOs
{
    public class EmprestimoDTO
    {
        public int EmprestimoId { get; set; }
        public int ItemId { get; set; }
        public string? TituloItem { get; set; }
        public int UsuarioId { get; set; }
        public string? NomeUsuario { get; set; }
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataDevolucaoPrevista { get; set; }
        public DateTime? DataDevolucaoEfetiva { get; set; }
        public StatusEmprestimo Status { get; set; }
    }
}
