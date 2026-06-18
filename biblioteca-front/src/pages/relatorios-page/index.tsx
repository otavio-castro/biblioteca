import { useEffect, useState } from 'react';
import * as Styled from "./index.style.ts";
import api from '../../config/api';

interface MaisSolicitado {
  itemId: number;
  titulo: string;
  autor: string;
  contadorEmprestimos: number;
  imagemUrl?: string;
}

interface EmprestimoAtivo {
  emprestimoId: number;
  tituloItem: string;
  nomeUsuario: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  estaAtrasado: boolean;
}

const fmt = (d: string) => new Date(d).toLocaleDateString('pt-BR');

const RelatoriosPage = () => {
  const [maisSolicitado, setMaisSolicitado] = useState<MaisSolicitado | null>(null);
  const [ativos, setAtivos] = useState<EmprestimoAtivo[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    Promise.allSettled([
      api.get<MaisSolicitado>('/relatorios/mais-solicitado'),
      api.get<EmprestimoAtivo[]>('/relatorios/emprestimos-ativos'),
    ]).then(([m, a]) => {
      if (m.status === 'fulfilled') setMaisSolicitado(m.value.data);
      if (a.status === 'fulfilled') setAtivos(a.value.data);
      if (m.status === 'rejected' && a.status === 'rejected') setErro('Não foi possível carregar os relatórios.');
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <Styled.Page><Styled.Info>Carregando relatórios...</Styled.Info></Styled.Page>;

  return (
    <Styled.Page>
      <Styled.Titulo>Relatórios</Styled.Titulo>
      {erro && <Styled.Erro>{erro}</Styled.Erro>}

      {maisSolicitado && (
        <Styled.Section>
          <Styled.SectionTitle>⭐ Livro Mais Solicitado</Styled.SectionTitle>
          <Styled.DestCard>
            <Styled.Cover
              src={maisSolicitado.imagemUrl || 'https://via.placeholder.com/80x110/D4A96A/2C1A0E?text=📚'}
              alt={maisSolicitado.titulo}
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x110/D4A96A/2C1A0E?text=📚'; }}
            />
            <div>
              <Styled.DestTitulo>{maisSolicitado.titulo}</Styled.DestTitulo>
              <Styled.DestMeta>{maisSolicitado.autor}</Styled.DestMeta>
              <Styled.DestCount>{maisSolicitado.contadorEmprestimos} empréstimos realizados</Styled.DestCount>
            </div>
          </Styled.DestCard>
        </Styled.Section>
      )}

      <Styled.Section>
        <Styled.SectionTitle>🔖 Empréstimos Ativos ({ativos.length})</Styled.SectionTitle>
        {ativos.length === 0 && <Styled.Info>Nenhum empréstimo ativo no momento.</Styled.Info>}
        {ativos.length > 0 && (
          <Styled.TableWrapper>
            <Styled.Table>
              <thead>
                <tr>
                  <Styled.Th>Item</Styled.Th>
                  <Styled.Th>Usuário</Styled.Th>
                  <Styled.Th>Empréstimo</Styled.Th>
                  <Styled.Th>Devolução Prevista</Styled.Th>
                  <Styled.Th>Situação</Styled.Th>
                </tr>
              </thead>
              <tbody>
                {ativos.map((e) => (
                  <Styled.Tr key={e.emprestimoId} $atrasado={e.estaAtrasado}>
                    <Styled.Td data-label="Item">{e.tituloItem}</Styled.Td>
                    <Styled.Td data-label="Usuário">{e.nomeUsuario}</Styled.Td>
                    <Styled.Td data-label="Empréstimo">{fmt(e.dataEmprestimo)}</Styled.Td>
                    <Styled.Td data-label="Previsão">{fmt(e.dataDevolucaoPrevista)}</Styled.Td>
                    <Styled.Td data-label="Situação">
                      <Styled.Situacao $atrasado={e.estaAtrasado}>
                        {e.estaAtrasado ? '⚠️ Atrasado' : '✅ No prazo'}
                      </Styled.Situacao>
                    </Styled.Td>
                  </Styled.Tr>
                ))}
              </tbody>
            </Styled.Table>
          </Styled.TableWrapper>
        )}
      </Styled.Section>
    </Styled.Page>
  );
};

export default RelatoriosPage;
