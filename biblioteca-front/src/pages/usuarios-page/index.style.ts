import styled from 'styled-components';

export const Page = styled.div``;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const Titulo = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.heading};

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const BtnAdd = styled.button`
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  &:hover { opacity: 0.85; }
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

export const Tr = styled.tr`
  &:not(:last-child) td { border-bottom: 1px solid ${({ theme }) => theme.border}; }
  &:hover td { background: ${({ theme }) => theme.surface}; }

  @media (max-width: 640px) {
    display: block;
    border: 1px solid ${({ theme }) => theme.border};
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

export const BtnEdit = styled.button`
  padding: 0.3rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  background: transparent;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.8rem;
  margin-right: 0.4rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.surface}; }
`;

export const BtnDel = styled.button`
  padding: 0.3rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.error}44;
  border-radius: 5px;
  background: transparent;
  color: ${({ theme }) => theme.error};
  font-size: 0.8rem;
  cursor: pointer;
  &:hover { background: ${({ theme }) => theme.error}11; }
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
  padding: 2rem;
  text-align: center;
`;

export const ConfirmText = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

export const ConfirmActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const BtnCancel = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: transparent;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.88rem;
  cursor: pointer;
`;

export const BtnConfirmDelete = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.error};
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
`;
