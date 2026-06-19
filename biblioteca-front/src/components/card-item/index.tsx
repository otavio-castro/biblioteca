import * as Styled from "./index.style.ts";
import BadgeStatus from "../badge-status";
import type { Livro, Revista } from "../../types/entities";
import { useAuthStore } from "../../stores/auth.store";
import { PERIODICIDADE_LABELS } from "../../types/entities";

interface Props {
  item: Livro | Revista;
  onEdit?: (item: Livro | Revista) => void;
  onDelete?: (item: Livro | Revista) => void;
  onEmprestar?: (item: Livro) => void;
}

// SVG inline — sem dependência externa, nunca falha
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='180' viewBox='0 0 120 180'%3E%3Crect width='120' height='180' fill='%231C1A17'/%3E%3Crect x='8' y='8' width='104' height='164' rx='4' fill='%23242018' stroke='%2338342C' stroke-width='1'/%3E%3Ctext x='60' y='100' font-size='36' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E";

const CardItem = ({ item, onEdit, onDelete, onEmprestar }: Props) => {
  const isBibliotecario = useAuthStore((s) => s.isBibliotecario)();

  const isLivro = item.tipoItem === 'Livro';
  const livro = isLivro ? (item as Livro) : null;
  const revista = !isLivro ? (item as Revista) : null;

  const statusVariant = livro
    ? livro.status === 'Disponivel' ? 'disponivel' : 'emprestado'
    : null;

  return (
    <Styled.Card>
      <Styled.Cover
        src={item.imagemUrl || PLACEHOLDER}
        alt={item.titulo}
        onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = PLACEHOLDER; }}
      />
      <Styled.Info>
        <Styled.TipoTag>{item.tipoItem}</Styled.TipoTag>
        <Styled.Titulo>{item.titulo}</Styled.Titulo>
        {livro && <Styled.Meta>{livro.autor}</Styled.Meta>}
        {revista && <Styled.Meta>{revista.editora} · Ed. {revista.edicao}</Styled.Meta>}
        {revista && <Styled.Meta>{PERIODICIDADE_LABELS[revista.periodicidade]}</Styled.Meta>}
        <Styled.Ano>{item.anoPublicacao}</Styled.Ano>
        {statusVariant && <BadgeStatus variant={statusVariant} />}
        {livro && livro.contadorEmprestimos > 0 && (
          <Styled.Contador>{livro.contadorEmprestimos}× emprestado</Styled.Contador>
        )}
      </Styled.Info>
      <Styled.Actions>
        {livro && livro.status === 'Disponivel' && onEmprestar && (
          <Styled.BtnEmprestar onClick={() => onEmprestar(livro)}>
            Emprestar
          </Styled.BtnEmprestar>
        )}
        {isBibliotecario && onEdit && (
          <Styled.BtnEdit onClick={() => onEdit(item)}>Editar</Styled.BtnEdit>
        )}
        {isBibliotecario && onDelete && (
          <Styled.BtnDelete onClick={() => onDelete(item)}>Excluir</Styled.BtnDelete>
        )}
      </Styled.Actions>
    </Styled.Card>
  );
};

export default CardItem;
