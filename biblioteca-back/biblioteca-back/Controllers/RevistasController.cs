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
    public class RevistasController : ControllerBase
    {
        private readonly IRevistaService _service;
        private readonly IMapper _mapper;

        public RevistasController(IRevistaService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var revistas = await _service.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RevistaDTO>>(revistas));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var revista = await _service.GetByIdAsync(id);
            if (revista is null) return NotFound(new { message = $"Revista {id} não encontrada." });
            return Ok(_mapper.Map<RevistaDTO>(revista));
        }

        [Authorize(Roles = "Bibliotecario")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RevistaCreateDTO dto)
        {
            var criada = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = criada.ItemId }, _mapper.Map<RevistaDTO>(criada));
        }

        [Authorize(Roles = "Bibliotecario")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RevistaUpdateDTO dto)
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
