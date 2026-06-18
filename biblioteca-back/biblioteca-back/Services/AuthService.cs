using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using biblioteca_back.DTOs;
using biblioteca_back.Models;
using biblioteca_back.Repositories.Interfaces;
using biblioteca_back.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace biblioteca_back.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IConfiguration _config;

        public AuthService(IUsuarioRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
        }

        public async Task<LoginResponseDTO?> LoginAsync(LoginDTO dto)
        {
            var usuario = await _repository.GetByEmailAsync(dto.Email);
            if (usuario is null) return null;

            if (!BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha)) return null;

            var token = GerarToken(usuario);

            return new LoginResponseDTO
            {
                Token = token,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil.ToString(),
                UsuarioId = usuario.UsuarioId
            };
        }

        private string GerarToken(Usuario usuario)
        {
            var chave = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!));

            var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Role, usuario.Perfil.ToString()),
                new Claim(ClaimTypes.NameIdentifier, usuario.UsuarioId.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(8),
                signingCredentials: credenciais);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
