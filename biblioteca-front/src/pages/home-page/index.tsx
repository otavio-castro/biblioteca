import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import type { Livro, Revista, Emprestimo } from '../../types/entities';
import { useAuthStore } from '../../stores/auth.store';

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='120' viewBox='0 0 80 120'%3E%3Crect width='80' height='120' fill='%231C1A17'/%3E%3Crect x='5' y='5' width='70' height='110' rx='3' fill='%23242018' stroke='%2338342C' stroke-width='1'/%3E%3Ctext x='40' y='65' font-size='28' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E";

interface MaisSolicitado {
  itemId: number;
  titulo: string;
  autor: string;
  contadorEmprestimos: number;
  imagemUrl?: string;
}

const HomePage = () => {
  const nome = useAuthStore((s) => s.nome);
  const location = useLocation();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [revistas, setRevistas] = useState<Revista[]>([]);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [maisSolicitado, setMaisSolicitado] = useState<MaisSolicitado | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const [l, r, e, m] = await Promise.allSettled([
          api.get<Livro[]>('/livros'),
          api.get<Revista[]>('/revistas'),
          api.get<Emprestimo[]>('/emprestimos'),
          api.get<MaisSolicitado>('/relatorios/mais-solicitado'),
        ]);
        if (l.status === 'fulfilled') setLivros(l.value.data);
        if (r.status === 'fulfilled') setRevistas(r.value.data);
        if (e.status === 'fulfilled') setEmprestimos(e.value.data);
        if (m.status === 'fulfilled') setMaisSolicitado(m.value.data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [location.pathname]);

  const disponiveis = livros.filter((l) => l.status === 'Disponivel').length;
  const ativos = emprestimos.filter((e) => e.status === 'Ativo').length;

  if (loading) return <Styled.Page><Styled.Loading>Carregando...</Styled.Loading></Styled.Page>;

  return (
    <Styled.Page>
      <Styled.Saudacao>Olá, {nome} 👋</Styled.Saudacao>
      <Styled.Subtitulo>Aqui está um resumo do acervo hoje.</Styled.Subtitulo>

      <Styled.StatsGrid>
        <Styled.StatCard $color="primary">
          <Styled.StatIcon>📖</Styled.StatIcon>
          <Styled.StatNum>{livros.length}</Styled.StatNum>
          <Styled.StatLabel>Livros</Styled.StatLabel>
        </Styled.StatCard>
        <Styled.StatCard $color="secondary">
          <Styled.StatIcon>📰</Styled.StatIcon>
          <Styled.StatNum>{revistas.length}</Styled.StatNum>
          <Styled.StatLabel>Revistas</Styled.StatLabel>
        </Styled.StatCard>
        <Styled.StatCard $color="success">
          <Styled.StatIcon>✅</Styled.StatIcon>
          <Styled.StatNum>{disponiveis}</Styled.StatNum>
          <Styled.StatLabel>Disponíveis</Styled.StatLabel>
        </Styled.StatCard>
        <Styled.StatCard $color="warning">
          <Styled.StatIcon>🔖</Styled.StatIcon>
          <Styled.StatNum>{ativos}</Styled.StatNum>
          <Styled.StatLabel>Em Empréstimo</Styled.StatLabel>
        </Styled.StatCard>
      </Styled.StatsGrid>

      {maisSolicitado && (
        <Styled.Section>
          <Styled.SectionTitle>⭐ Mais Solicitado</Styled.SectionTitle>
          <Styled.DestCard>
            <Styled.DestCover
              src={maisSolicitado.imagemUrl || PLACEHOLDER}
              alt={maisSolicitado.titulo}
              onError={(e) => { const img = e.target as HTMLImageElement; img.onerror = null; img.src = PLACEHOLDER; }}
            />
            <Styled.DestInfo>
              <Styled.DestTitulo>{maisSolicitado.titulo}</Styled.DestTitulo>
              <Styled.DestMeta>{maisSolicitado.autor}</Styled.DestMeta>
              <Styled.DestCount>{maisSolicitado.contadorEmprestimos} empréstimos realizados</Styled.DestCount>
            </Styled.DestInfo>
          </Styled.DestCard>
        </Styled.Section>
      )}
    </Styled.Page>
  );
};

export default HomePage;
