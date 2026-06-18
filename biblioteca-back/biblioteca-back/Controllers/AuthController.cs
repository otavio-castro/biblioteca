using biblioteca_back.DTOs;
using biblioteca_back.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace biblioteca_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(IAuthService service) => _service = service;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO dto)
        {
            var resultado = await _service.LoginAsync(dto);
            if (resultado is null)
                return Unauthorized(new { message = "Email ou senha incorretos." });

            return Ok(resultado);
        }
    }
}
