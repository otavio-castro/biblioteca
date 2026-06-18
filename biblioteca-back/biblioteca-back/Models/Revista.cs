using System.ComponentModel.DataAnnotations;

namespace biblioteca_back.Models
{
    public class Revista : ItemBiblioteca
    {
        [Required, StringLength(150)]
        public string Editora { get; set; } = string.Empty;

        [Required]
        public int Edicao { get; set; }

        [Required]
        public Periodicidade Periodicidade { get; set; } = Periodicidade.Mensal;

        public override string ExibirInformacoes()
            => $"Revista: {Titulo} — Editora: {Editora} — Ed. {Edicao} ({AnoPublicacao}) — {Periodicidade}";
    }

    public enum Periodicidade { Semanal = 0, Mensal = 1, Bimestral = 2, Trimestral = 3 }
}
