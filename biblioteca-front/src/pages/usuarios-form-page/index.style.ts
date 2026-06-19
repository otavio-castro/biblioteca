import styled from 'styled-components';

export const Page = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadowSm};
`;

export const Titulo = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1.5rem;
`;

export const Field = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 0.35rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.85rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }
`;

export const Erro = styled.p`
  color: ${({ theme }) => theme.error};
  background: ${({ theme }) => theme.error}11;
  border: 1px solid ${({ theme }) => theme.error}33;
  border-radius: 6px;
  padding: 0.6rem 0.85rem;
  font-size: 0.83rem;
  margin-bottom: 1rem;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.6rem 0.85rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;
  }
`;

export const BtnCancel = styled.button`
  padding: 0.55rem 1.1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.textMuted};
  font-size: 0.9rem;
`;

export const BtnSubmit = styled.button`
  padding: 0.55rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  &:disabled { opacity: 0.6; }
`;
