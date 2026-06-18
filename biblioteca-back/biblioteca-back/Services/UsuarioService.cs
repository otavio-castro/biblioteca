using biblioteca_back.DTOs;
using biblioteca_back.Exceptions;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using biblioteca_back.Services.Interfaces;

namespace biblioteca_back.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository) => _repository = repository;

        public async Task<IEnumerable<Usuario>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Usuario?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Usuario> CreateAsync(UsuarioCreateDTO dto)
        {
            var existente = await _repository.GetByEmailAsync(dto.Email);
            if (existente is not null)
                throw new ConflictException($"Email '{dto.Email}' já está cadastrado.");

            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Perfil = dto.Perfil
            };
            return await _repository.CreateAsync(usuario);
        }

        public async Task UpdateAsync(int id, UsuarioUpdateDTO dto)
        {
            var usuario = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Usuário {id} não encontrado.");

            var emailEmUso = await _repository.GetByEmailAsync(dto.Email);
            if (emailEmUso is not null && emailEmUso.UsuarioId != id)
                throw new ConflictException($"Email '{dto.Email}' já está em uso por outro usuário.");

            usuario.Nome = dto.Nome;
            usuario.Email = dto.Email;
            usuario.Telefone = dto.Telefone;

            await _repository.UpdateAsync(usuario);
        }

        public async Task DeleteAsync(int id)
        {
            _ = await _repository.GetByIdAsync(id)
                ?? throw new NotFoundException($"Usuário {id} não encontrado.");

            await _repository.DeleteAsync(id);
        }
    }
}
