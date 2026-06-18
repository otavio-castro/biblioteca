namespace biblioteca_back.DTOs
{
    public class EmprestimoAtivoDTO
    {
        public int EmprestimoId { get; set; }
        public string TituloItem { get; set; } = string.Empty;
        public string NomeUsuario { get; set; } = string.Empty;
        public DateTime DataEmprestimo { get; set; }
        public DateTime DataDevolucaoPrevista { get; set; }
        public bool EstaAtrasado { get; set; }
    }
}
