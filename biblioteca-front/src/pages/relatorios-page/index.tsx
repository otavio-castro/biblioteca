import { useEffect, useState } from 'react';
import * as Styled from "./index.style.ts";
import api from '../../config/api';

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='110' viewBox='0 0 80 110'%3E%3Crect width='80' height='110' fill='%231C1A17'/%3E%3Crect x='5' y='5' width='70' height='100' rx='3' fill='%23242018' stroke='%2338342C' stroke-width='1'/%3E%3Ctext x='40' y='58' font-size='28' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E";

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
              src={maisSolicitado.imagemUrl || PLACEHOLDER}
              alt={maisSolicitado.titulo}
              onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = PLACEHOLDER; }}
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
