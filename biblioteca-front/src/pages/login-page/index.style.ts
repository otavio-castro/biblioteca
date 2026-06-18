import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.background};
  padding: 2rem;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

export const Logo = styled.div`
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
`;

export const Titulo = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 0.25rem;
`;

export const Subtitulo = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 1.75rem;
`;

export const Field = styled.div`
  text-align: left;
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
  padding: 0.65rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  transition: border-color 0.2s;
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
  padding: 0.6rem 0.9rem;
  font-size: 0.83rem;
  margin-bottom: 1rem;
  text-align: left;
`;

export const Btn = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: 'Georgia', serif;
  transition: background 0.2s, opacity 0.2s;
  margin-top: 0.25rem;
  &:hover:not(:disabled) { background: ${({ theme }) => theme.primaryDark}; }
  &:disabled { opacity: 0.6; }
`;

export const Hint = styled.p`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 1.5rem;
  opacity: 0.75;
`;
