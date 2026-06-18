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

const PLACEHOLDER = 'https://via.placeholder.com/120x180/D4A96A/2C1A0E?text=📚';

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
        onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }}
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
