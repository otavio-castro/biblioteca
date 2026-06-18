import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useItensStore } from '../../stores/itens.store';
import { useAuthStore } from '../../stores/auth.store';
import CardItem from '../../components/card-item';
import Modal from '../../components/modal';
import type { Livro, Revista } from '../../types/entities';

type Filtro = 'todos' | 'livros' | 'revistas';

const AcervoPage = () => {
  const { livros, revistas, setLivros, setRevistas, removeLivro, removeRevista } = useItensStore();
  const isBibliotecario = useAuthStore((s) => s.isBibliotecario)();
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<(Livro | Revista) | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [l, r] = await Promise.all([
          api.get<Livro[]>('/livros'),
          api.get<Revista[]>('/revistas'),
        ]);
        setLivros(l.data);
        setRevistas(r.data);
      } catch {
        setErro('Não foi possível carregar o acervo.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      const endpoint = confirmDelete.tipoItem === 'Livro' ? 'livros' : 'revistas';
      await api.delete(`/${endpoint}/${confirmDelete.itemId}`);
      if (confirmDelete.tipoItem === 'Livro') removeLivro(confirmDelete.itemId);
      else removeRevista(confirmDelete.itemId);
      setConfirmDelete(null);
    } catch {
      setErro('Não foi possível excluir o item. Verifique se não há empréstimos ativos.');
      setConfirmDelete(null);
    }
  };

  const handleEdit = (item: Livro | Revista) => {
    const rota = item.tipoItem === 'Livro'
      ? `/livros/${item.itemId}/editar`
      : `/revistas/${item.itemId}/editar`;
    navigate(rota);
  };

  const handleEmprestar = (livro: Livro) => {
    navigate('/emprestimos/novo', { state: { livroId: livro.itemId } });
  };

  const itens = [
    ...(filtro !== 'revistas' ? livros : []),
    ...(filtro !== 'livros' ? revistas : []),
  ].filter((i) => i.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <Styled.Page>
      <Styled.TopBar>
        <Styled.Titulo>Acervo</Styled.Titulo>
        {isBibliotecario && (
          <Styled.BtnGroup>
            <Styled.BtnAdd onClick={() => navigate('/livros/novo')}>+ Novo Livro</Styled.BtnAdd>
            <Styled.BtnAdd $secondary onClick={() => navigate('/revistas/novo')}>+ Nova Revista</Styled.BtnAdd>
          </Styled.BtnGroup>
        )}
      </Styled.TopBar>

      <Styled.Toolbar>
        <Styled.Tabs>
          {(['todos', 'livros', 'revistas'] as Filtro[]).map((f) => (
            <Styled.Tab key={f} $active={filtro === f} onClick={() => setFiltro(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Styled.Tab>
          ))}
        </Styled.Tabs>
        <Styled.Busca
          placeholder="Buscar por título..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </Styled.Toolbar>

      {erro && <Styled.Erro>{erro}</Styled.Erro>}
      {loading && <Styled.Info>Carregando acervo...</Styled.Info>}
      {!loading && itens.length === 0 && <Styled.Info>Nenhum item encontrado.</Styled.Info>}

      <Styled.Grid>
        {itens.map((item) => (
          <CardItem
            key={item.itemId}
            item={item as Livro | Revista}
            onEdit={isBibliotecario ? handleEdit : undefined}
            onDelete={isBibliotecario ? (i) => setConfirmDelete(i) : undefined}
            onEmprestar={handleEmprestar}
          />
        ))}
      </Styled.Grid>

      <Modal
        isOpen={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Confirmar exclusão"
      >
        <Styled.ConfirmText>
          Deseja excluir "<strong>{confirmDelete?.titulo}</strong>"?
          Esta ação não pode ser desfeita.
        </Styled.ConfirmText>
        <Styled.ConfirmActions>
          <Styled.BtnCancel onClick={() => setConfirmDelete(null)}>Cancelar</Styled.BtnCancel>
          <Styled.BtnConfirmDelete onClick={handleDelete}>Excluir</Styled.BtnConfirmDelete>
        </Styled.ConfirmActions>
      </Modal>
    </Styled.Page>
  );
};

export default AcervoPage;
