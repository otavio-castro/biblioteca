using System.Security.Claims;
using biblioteca_back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace biblioteca_back.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RelatoriosController : ControllerBase
    {
        private readonly IEmprestimoService _service;

        public RelatoriosController(IEmprestimoService service) => _service = service;

        private int? TokenUsuarioId =>
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        [HttpGet("mais-solicitado")]
        public async Task<IActionResult> MaisSolicitado()
        {
            var resultado = await _service.GetMaisSolicitadoAsync();
            if (resultado is null) return NotFound(new { message = "Nenhum livro com empréstimos registrados." });
            return Ok(resultado);
        }

        [HttpGet("emprestimos-ativos")]
        public async Task<IActionResult> EmprestimosAtivos()
        {
            // Aluno vê apenas os próprios empréstimos ativos
            var filtroUsuario = User.IsInRole("Aluno") ? TokenUsuarioId : null;
            var resultado = await _service.GetEmprestimosAtivosAsync(filtroUsuario);
            return Ok(resultado);
        }
    }
}
