import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useUsuariosStore } from '../../stores/usuarios.store';
import { useAuthStore } from '../../stores/auth.store';
import BadgeStatus from '../../components/badge-status';
import Modal from '../../components/modal';
import type { Usuario } from '../../types/entities';

const UsuariosPage = () => {
  const { usuarios, setUsuarios, removeUsuario } = useUsuariosStore();
  const isBibliotecario = useAuthStore((s) => s.isBibliotecario)();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<Usuario | null>(null);

  useEffect(() => {
    api.get<Usuario[]>('/usuarios')
      .then(({ data }) => setUsuarios(data))
      .catch(() => setErro('Não foi possível carregar usuários.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await api.delete(`/usuarios/${confirmDelete.usuarioId}`);
      removeUsuario(confirmDelete.usuarioId);
      setConfirmDelete(null);
    } catch {
      setErro('Não foi possível excluir o usuário. Verifique se não há empréstimos ativos.');
      setConfirmDelete(null);
    }
  };

  return (
    <Styled.Page>
      <Styled.TopBar>
        <Styled.Titulo>Usuários</Styled.Titulo>
        <Styled.BtnAdd onClick={() => navigate('/usuarios/novo')}>+ Novo Usuário</Styled.BtnAdd>
      </Styled.TopBar>

      {erro && <Styled.Erro>{erro}</Styled.Erro>}
      {loading && <Styled.Info>Carregando...</Styled.Info>}
      {!loading && usuarios.length === 0 && <Styled.Info>Nenhum usuário cadastrado.</Styled.Info>}

      {!loading && usuarios.length > 0 && (
        <Styled.TableWrapper>
          <Styled.Table>
            <thead>
              <tr>
                <Styled.Th>Nome</Styled.Th>
                <Styled.Th>E-mail</Styled.Th>
                <Styled.Th>Telefone</Styled.Th>
                <Styled.Th>Perfil</Styled.Th>
                {isBibliotecario && <Styled.Th>Ações</Styled.Th>}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <Styled.Tr key={u.usuarioId}>
                  <Styled.Td data-label="Nome">{u.nome}</Styled.Td>
                  <Styled.Td data-label="E-mail">{u.email}</Styled.Td>
                  <Styled.Td data-label="Telefone">{u.telefone || '—'}</Styled.Td>
                  <Styled.Td data-label="Perfil">
                    {u.perfil && (
                      <BadgeStatus
                        variant={u.perfil === 'Bibliotecario' ? 'bibliotecario' : 'aluno'}
                        label={u.perfil === 'Bibliotecario' ? 'Bibliotecário' : 'Aluno'}
                      />
                    )}
                  </Styled.Td>
                  {isBibliotecario && (
                    <Styled.Td data-label="Ações">
                      <Styled.BtnEdit onClick={() => navigate(`/usuarios/${u.usuarioId}/editar`)}>Editar</Styled.BtnEdit>
                      <Styled.BtnDel onClick={() => setConfirmDelete(u)}>Excluir</Styled.BtnDel>
                    </Styled.Td>
                  )}
                </Styled.Tr>
              ))}
            </tbody>
          </Styled.Table>
        </Styled.TableWrapper>
      )}

      <Modal isOpen={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="Confirmar exclusão">
        <Styled.ConfirmText>Excluir <strong>{confirmDelete?.nome}</strong>?</Styled.ConfirmText>
        <Styled.ConfirmActions>
          <Styled.BtnCancel onClick={() => setConfirmDelete(null)}>Cancelar</Styled.BtnCancel>
          <Styled.BtnConfirmDelete onClick={handleDelete}>Excluir</Styled.BtnConfirmDelete>
        </Styled.ConfirmActions>
      </Modal>
    </Styled.Page>
  );
};

export default UsuariosPage;
