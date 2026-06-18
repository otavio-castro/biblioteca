using System.Security.Claims;
using AutoMapper;
using biblioteca_back.DTOs;
using biblioteca_back.Models;
using biblioteca_back.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace biblioteca_back.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmprestimosController : ControllerBase
    {
        private readonly IEmprestimoService _service;
        private readonly IMapper _mapper;

        public EmprestimosController(IEmprestimoService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        private int? TokenUsuarioId =>
            int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

        private bool IsAluno => User.IsInRole("Aluno");

        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] StatusEmprestimo? status,
            [FromQuery] int? usuarioId)
        {
            // Aluno sempre vê apenas seus próprios empréstimos
            var filtroUsuario = IsAluno ? TokenUsuarioId : usuarioId;
            var emprestimos = await _service.GetAllAsync(status, filtroUsuario);
            return Ok(_mapper.Map<IEnumerable<EmprestimoDTO>>(emprestimos));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emprestimo = await _service.GetByIdAsync(id);
            if (emprestimo is null) return NotFound(new { message = $"Empréstimo {id} não encontrado." });

            // Aluno só acessa o próprio
            if (IsAluno && emprestimo.UsuarioId != TokenUsuarioId)
                return Forbid();

            return Ok(_mapper.Map<EmprestimoDTO>(emprestimo));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmprestimoCreateDTO dto)
        {
            // Aluno sempre usa o próprio id; Bibliotecário precisa informar
            if (IsAluno)
                dto.UsuarioId = TokenUsuarioId!.Value;
            else if (dto.UsuarioId is null)
                return BadRequest(new { message = "UsuarioId é obrigatório para Bibliotecário." });

            var criado = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criado.EmprestimoId }, _mapper.Map<EmprestimoDTO>(criado));
        }

        [HttpPatch("{id}/devolver")]
        public async Task<IActionResult> Devolver(int id)
        {
            // Aluno só pode devolver o próprio empréstimo
            if (IsAluno)
            {
                var emprestimo = await _service.GetByIdAsync(id);
                if (emprestimo is null) return NotFound(new { message = $"Empréstimo {id} não encontrado." });
                if (emprestimo.UsuarioId != TokenUsuarioId) return Forbid();
            }

            await _service.DevolverAsync(id);
            return NoContent();
        }
    }
}
