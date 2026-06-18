namespace biblioteca_back.DTOs
{
    public class RelatorioMaisSolicitadoDTO
    {
        public int ItemId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public int ContadorEmprestimos { get; set; }
    }
}
