import styled from 'styled-components';

export const Page = styled.div``;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Titulo = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.heading};

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const BtnAdd = styled.button<{ $secondary?: boolean }>`
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  border: none;
  background: ${({ theme, $secondary }) => $secondary ? theme.secondary : theme.primary};
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0.25rem;
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.25rem;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.35rem 0.9rem;
  border-radius: 6px;
  border: none;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background: ${({ $active, theme }) => $active ? theme.card : 'transparent'};
  color: ${({ $active, theme }) => $active ? theme.primary : theme.textMuted};
  box-shadow: ${({ $active, theme }) => $active ? theme.shadowSm : 'none'};
  transition: all 0.2s;
`;

export const Busca = styled.input`
  padding: 0.45rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.88rem;
  min-width: 200px;
  flex: 1;
  max-width: 300px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 480px) {
    min-width: 0;
    max-width: 100%;
    width: 100%;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.25rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
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
