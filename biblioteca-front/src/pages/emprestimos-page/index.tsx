import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useEmprestimosStore } from '../../stores/emprestimos.store';
import BadgeStatus from '../../components/badge-status';
import type { Emprestimo } from '../../types/entities';

type Aba = 'ativos' | 'devolvidos' | 'atrasados';

const fmt = (d: string) => new Date(d).toLocaleDateString('pt-BR');

const EmprestimosPage = () => {
  const { emprestimos, setEmprestimos, devolverEmprestimo } = useEmprestimosStore();
  const navigate = useNavigate();
  const [aba, setAba] = useState<Aba>('ativos');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get<Emprestimo[]>('/emprestimos')
      .then(({ data }) => setEmprestimos(data))
      .catch(() => setErro('Não foi possível carregar empréstimos.'))
      .finally(() => setLoading(false));
  }, []);

  const handleDevolver = async (id: number) => {
    try {
      await api.patch(`/emprestimos/${id}/devolver`);
      devolverEmprestimo(id);
      setAba('devolvidos');
    } catch {
      setErro('Não foi possível registrar a devolução.');
    }
  };

  const agora = new Date();
  const filtrados = emprestimos.filter((e) => {
    if (aba === 'ativos') return e.status === 'Ativo' && new Date(e.dataDevolucaoPrevista) >= agora;
    if (aba === 'atrasados') return e.status === 'Ativo' && new Date(e.dataDevolucaoPrevista) < agora;
    return e.status === 'Devolvido';
  });

  const statusVariant = (e: Emprestimo) => {
    if (e.status === 'Devolvido') return 'devolvido';
    if (new Date(e.dataDevolucaoPrevista) < agora) return 'atrasado';
    return 'ativo';
  };

  return (
    <Styled.Page>
      <Styled.TopBar>
        <Styled.Titulo>Empréstimos</Styled.Titulo>
        <Styled.BtnAdd onClick={() => navigate('/emprestimos/novo')}>+ Novo Empréstimo</Styled.BtnAdd>
      </Styled.TopBar>

      <Styled.Tabs>
        {(['ativos', 'atrasados', 'devolvidos'] as Aba[]).map((a) => (
          <Styled.Tab key={a} $active={aba === a} onClick={() => setAba(a)}>
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </Styled.Tab>
        ))}
      </Styled.Tabs>

      {erro && <Styled.Erro>{erro}</Styled.Erro>}
      {loading && <Styled.Info>Carregando...</Styled.Info>}
      {!loading && filtrados.length === 0 && <Styled.Info>Nenhum empréstimo nesta categoria.</Styled.Info>}

      {!loading && filtrados.length > 0 && (
        <Styled.TableWrapper>
          <Styled.Table>
            <thead>
              <tr>
                <Styled.Th>Item</Styled.Th>
                <Styled.Th>Usuário</Styled.Th>
                <Styled.Th>Empréstimo</Styled.Th>
                <Styled.Th>Devolução Prevista</Styled.Th>
                <Styled.Th>Status</Styled.Th>
                {aba !== 'devolvidos' && <Styled.Th>Ações</Styled.Th>}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((e) => (
                <Styled.Tr key={e.emprestimoId} $atrasado={statusVariant(e) === 'atrasado'}>
                  <Styled.Td data-label="Item">{e.tituloItem}</Styled.Td>
                  <Styled.Td data-label="Usuário">{e.nomeUsuario}</Styled.Td>
                  <Styled.Td data-label="Empréstimo">{fmt(e.dataEmprestimo)}</Styled.Td>
                  <Styled.Td data-label="Previsão">{fmt(e.dataDevolucaoPrevista)}</Styled.Td>
                  <Styled.Td data-label="Status"><BadgeStatus variant={statusVariant(e)} /></Styled.Td>
                  {aba !== 'devolvidos' && (
                    <Styled.Td data-label="Ações">
                      <Styled.BtnDevolver onClick={() => handleDevolver(e.emprestimoId)}>
                        Devolver
                      </Styled.BtnDevolver>
                    </Styled.Td>
                  )}
                </Styled.Tr>
              ))}
            </tbody>
          </Styled.Table>
        </Styled.TableWrapper>
      )}
    </Styled.Page>
  );
};

export default EmprestimosPage;
