using System.Security.Claims;
using AutoMapper;
using biblioteca_back.DTOs;
using biblioteca_back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace biblioteca_back.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _service;
        private readonly IMapper _mapper;

        public UsuariosController(IUsuarioService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        private int? TokenUsuarioId =>
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        [Authorize(Roles = "Bibliotecario")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usuarios = await _service.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<UsuarioDTO>>(usuarios));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            // Aluno só pode ver o próprio perfil
            if (User.IsInRole("Aluno") && id != TokenUsuarioId)
                return Forbid();

            var usuario = await _service.GetByIdAsync(id);
            if (usuario is null) return NotFound(new { message = $"Usuário {id} não encontrado." });
            return Ok(_mapper.Map<UsuarioDTO>(usuario));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UsuarioCreateDTO dto)
        {
            var criado = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criado.UsuarioId }, _mapper.Map<UsuarioDTO>(criado));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UsuarioUpdateDTO dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
