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
    public class LivrosController : ControllerBase
    {
        private readonly ILivroService _service;
        private readonly IMapper _mapper;

        public LivrosController(ILivroService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] StatusItem? status)
        {
            var livros = await _service.GetAllAsync(status);
            return Ok(_mapper.Map<IEnumerable<LivroDTO>>(livros));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var livro = await _service.GetByIdAsync(id);
            if (livro is null) return NotFound(new { message = $"Livro {id} não encontrado." });
            return Ok(_mapper.Map<LivroDTO>(livro));
        }

        [Authorize(Roles = "Bibliotecario")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] LivroCreateDTO dto)
        {
            var criado = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criado.ItemId }, _mapper.Map<LivroDTO>(criado));
        }

        [Authorize(Roles = "Bibliotecario")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] LivroUpdateDTO dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [Authorize(Roles = "Bibliotecario")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}
