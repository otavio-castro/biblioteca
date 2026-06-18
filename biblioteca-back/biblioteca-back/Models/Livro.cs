using System.ComponentModel.DataAnnotations;

namespace biblioteca_back.Models
{
    public class Livro : ItemBiblioteca
    {
        [Required, StringLength(150)]
        public string Autor { get; set; } = string.Empty;

        [Required]
        public StatusItem Status { get; set; } = StatusItem.Disponivel;

        public int ContadorEmprestimos { get; set; } = 0;

        public override string ExibirInformacoes()
            => $"Livro: {Titulo} — Autor: {Autor} ({AnoPublicacao}) — Status: {Status}";
    }

    public enum StatusItem { Disponivel = 0, Emprestado = 1 }
}
