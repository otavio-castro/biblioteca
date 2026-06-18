import styled from 'styled-components';

export const Page = styled.div``;

export const Titulo = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const DestCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  max-width: 480px;
  box-shadow: ${({ theme }) => theme.shadowSm};

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const Cover = styled.img`
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

export const DestTitulo = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 0.25rem;
`;

export const DestMeta = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0 0 0.35rem;
`;

export const DestCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadowSm};

  @media (max-width: 640px) {
    overflow-x: unset;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.card};

  @media (max-width: 640px) {
    display: block;
    background: transparent;

    thead { display: none; }
    tbody { display: block; }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.8rem 1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const Tr = styled.tr<{ $atrasado?: boolean }>`
  background: ${({ $atrasado, theme }) => $atrasado ? `${theme.error}08` : 'transparent'};
  &:not(:last-child) td { border-bottom: 1px solid ${({ theme }) => theme.border}; }
  &:hover td { background: ${({ theme }) => theme.surface}; }

  @media (max-width: 640px) {
    display: block;
    border: 1px solid ${({ $atrasado, theme }) => $atrasado ? theme.error + '66' : theme.border};
    border-radius: 10px;
    margin-bottom: 0.75rem;
    background: ${({ theme }) => theme.card};
    overflow: hidden;

    &:not(:last-child) td { border-bottom: none; }
    &:hover td { background: transparent; }
  }
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.text};

  @media (max-width: 640px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.85rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};

    &:last-child { border-bottom: none; }

    &::before {
      content: attr(data-label);
      font-weight: 700;
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: ${({ theme }) => theme.textMuted};
      flex-shrink: 0;
      margin-right: 0.75rem;
    }
  }
`;

export const Situacao = styled.span<{ $atrasado: boolean }>`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ $atrasado, theme }) => $atrasado ? theme.error : theme.success};
`;

export const Erro = styled.p`
  color: ${({ theme }) => theme.error};
  background: ${({ theme }) => theme.error}11;
  border: 1px solid ${({ theme }) => theme.error}33;
  border-radius: 6px;
  padding: 0.6rem 0.9rem;
  margin-bottom: 1rem;
`;

export const Info = styled.p`
  color: ${({ theme }) => theme.textMuted};
  padding: 1rem 0;
`;
