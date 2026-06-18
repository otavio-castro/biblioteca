using biblioteca_back.DTOs;
using biblioteca_back.Exceptions;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using biblioteca_back.Services.Interfaces;

namespace biblioteca_back.Services
{
    public class EmprestimoService : IEmprestimoService
    {
        private readonly IEmprestimoRepository _repository;
        private readonly ILivroRepository _livroRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public EmprestimoService(
            IEmprestimoRepository repository,
            ILivroRepository livroRepository,
            IUsuarioRepository usuarioRepository)
        {
            _repository = repository;
            _livroRepository = livroRepository;
            _usuarioRepository = usuarioRepository;
        }

        public async Task<IEnumerable<Emprestimo>> GetAllAsync(StatusEmprestimo? status = null, int? usuarioId = null)
            => await _repository.GetAllAsync(status, usuarioId);

        public async Task<Emprestimo?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Emprestimo> CreateAsync(EmprestimoCreateDTO dto)
        {
            var livro = await _livroRepository.GetByIdAsync(dto.ItemId)
                ?? throw new NotFoundException($"Livro {dto.ItemId} não encontrado. Apenas livros podem ser emprestados.");

            if (livro.Status == StatusItem.Emprestado)
                throw new ConflictException($"O livro '{livro.Titulo}' já está emprestado.");

            _ = await _usuarioRepository.GetByIdAsync(dto.UsuarioId!.Value)
                ?? throw new NotFoundException($"Usuário {dto.UsuarioId} não encontrado.");

            livro.Status = StatusItem.Emprestado;
            livro.ContadorEmprestimos++;
            await _livroRepository.UpdateAsync(livro);

            var emprestimo = new Emprestimo
            {
                ItemId = dto.ItemId,
                UsuarioId = dto.UsuarioId!.Value,
                DataEmprestimo = DateTime.UtcNow,
                DataDevolucaoPrevista = dto.DataDevolucaoPrevista,
                Status = StatusEmprestimo.Ativo
            };

            return await _repository.CreateAsync(emprestimo);
        }

        public async Task DevolverAsync(int id)
        {
            var emprestimo = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Empréstimo {id} não encontrado.");

            if (emprestimo.Status == StatusEmprestimo.Devolvido)
                throw new ConflictException("Este empréstimo já foi devolvido.");

            emprestimo.Status = StatusEmprestimo.Devolvido;
            emprestimo.DataDevolucaoEfetiva = DateTime.UtcNow;

            if (emprestimo.Item is Livro livro)
            {
                livro.Status = StatusItem.Disponivel;
                await _livroRepository.UpdateAsync(livro);
            }

            await _repository.UpdateAsync(emprestimo);
        }

        public async Task<RelatorioMaisSolicitadoDTO?> GetMaisSolicitadoAsync()
        {
            var livro = await _livroRepository.GetMaisSolicitadoAsync();
            if (livro is null || livro.ContadorEmprestimos == 0) return null;

            return new RelatorioMaisSolicitadoDTO
            {
                ItemId = livro.ItemId,
                Titulo = livro.Titulo,
                Autor = livro.Autor,
                ContadorEmprestimos = livro.ContadorEmprestimos
            };
        }

        public async Task<IEnumerable<EmprestimoAtivoDTO>> GetEmprestimosAtivosAsync(int? usuarioId = null)
        {
            var ativos = await _repository.GetAtivosAsync();
            if (usuarioId.HasValue)
                ativos = ativos.Where(e => e.UsuarioId == usuarioId.Value);

            var agora = DateTime.UtcNow;

            return ativos.Select(e => new EmprestimoAtivoDTO
            {
                EmprestimoId = e.EmprestimoId,
                TituloItem = e.Item?.Titulo ?? string.Empty,
                NomeUsuario = e.Usuario?.Nome ?? string.Empty,
                DataEmprestimo = e.DataEmprestimo,
                DataDevolucaoPrevista = e.DataDevolucaoPrevista,
                EstaAtrasado = e.DataDevolucaoPrevista < agora
            });
        }
    }
}
