using AutoMapper;
using biblioteca_back.DTOs;
using biblioteca_back.Models;

namespace biblioteca_back.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Livro, LivroDTO>()
                .ForMember(d => d.TipoItem, o => o.MapFrom(_ => "Livro"));

            CreateMap<Revista, RevistaDTO>()
                .ForMember(d => d.TipoItem, o => o.MapFrom(_ => "Revista"));

            CreateMap<Usuario, UsuarioDTO>();

            CreateMap<Emprestimo, EmprestimoDTO>()
                .ForMember(d => d.TituloItem, o => o.MapFrom(s => s.Item != null ? s.Item.Titulo : null))
                .ForMember(d => d.NomeUsuario, o => o.MapFrom(s => s.Usuario != null ? s.Usuario.Nome : null));
        }
    }
}
