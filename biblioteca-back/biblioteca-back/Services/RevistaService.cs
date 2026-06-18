using biblioteca_back.DTOs;
using biblioteca_back.Exceptions;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using biblioteca_back.Services.Interfaces;

namespace biblioteca_back.Services
{
    public class RevistaService : IRevistaService
    {
        private readonly IRevistaRepository _repository;

        public RevistaService(IRevistaRepository repository) => _repository = repository;

        public async Task<IEnumerable<Revista>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Revista?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Revista> CreateAsync(RevistaCreateDTO dto)
        {
            var revista = new Revista
            {
                Titulo = dto.Titulo,
                AnoPublicacao = dto.AnoPublicacao,
                Editora = dto.Editora,
                Edicao = dto.Edicao,
                Periodicidade = dto.Periodicidade,
                ImagemUrl = dto.ImagemUrl
            };
            return await _repository.CreateAsync(revista);
        }

        public async Task UpdateAsync(int id, RevistaUpdateDTO dto)
        {
            var revista = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Revista {id} não encontrada.");

            revista.Titulo = dto.Titulo;
            revista.AnoPublicacao = dto.AnoPublicacao;
            revista.Editora = dto.Editora;
            revista.Edicao = dto.Edicao;
            revista.Periodicidade = dto.Periodicidade;
            revista.ImagemUrl = dto.ImagemUrl;

            await _repository.UpdateAsync(revista);
        }

        public async Task DeleteAsync(int id)
        {
            _ = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Revista {id} não encontrada.");

            await _repository.DeleteAsync(id);
        }
    }
}
