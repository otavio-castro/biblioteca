using biblioteca_back.DTOs;
using biblioteca_back.Exceptions;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using biblioteca_back.Services.Interfaces;

namespace biblioteca_back.Services
{
    public class LivroService : ILivroService
    {
        private readonly ILivroRepository _repository;

        public LivroService(ILivroRepository repository) => _repository = repository;

        public async Task<IEnumerable<Livro>> GetAllAsync(StatusItem? status = null)
            => await _repository.GetAllAsync(status);

        public async Task<Livro?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Livro> CreateAsync(LivroCreateDTO dto)
        {
            var livro = new Livro
            {
                Titulo = dto.Titulo,
                AnoPublicacao = dto.AnoPublicacao,
                Autor = dto.Autor,
                ImagemUrl = dto.ImagemUrl,
                Status = StatusItem.Disponivel,
                ContadorEmprestimos = 0
            };
            return await _repository.CreateAsync(livro);
        }

        public async Task UpdateAsync(int id, LivroUpdateDTO dto)
        {
            var livro = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Livro {id} não encontrado.");

            livro.Titulo = dto.Titulo;
            livro.AnoPublicacao = dto.AnoPublicacao;
            livro.Autor = dto.Autor;
            livro.ImagemUrl = dto.ImagemUrl;

            await _repository.UpdateAsync(livro);
        }

        public async Task DeleteAsync(int id)
        {
            var livro = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Livro {id} não encontrado.");

            if (livro.Status == StatusItem.Emprestado)
                throw new ConflictException("Não é possível remover um livro com empréstimo ativo.");

            await _repository.DeleteAsync(id);
        }

        public async Task<Livro?> GetMaisSolicitadoAsync()
            => await _repository.GetMaisSolicitadoAsync();
    }
}
