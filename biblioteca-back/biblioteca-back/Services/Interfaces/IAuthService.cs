using biblioteca_back.DTOs;

namespace biblioteca_back.Services.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponseDTO?> LoginAsync(LoginDTO dto);
    }
}
