import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);
  }
`;

export const Cover = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: ${({ theme }) => theme.surface};
`;

export const Info = styled.div`
  padding: 0.85rem 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const TipoTag = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textMuted};
`;

export const Titulo = styled.h3`
  font-size: 0.95rem;
  font-family: 'Georgia', serif;
  color: ${({ theme }) => theme.heading};
  line-height: 1.3;
  margin: 0.1rem 0;
`;

export const Meta = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0;
`;

export const Ano = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const Contador = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem 1rem 0.85rem;
  flex-wrap: wrap;
`;

const BaseBtn = styled.button`
  flex: 1;
  padding: 0.35rem 0.6rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  border: none;
  transition: opacity 0.2s;
  &:hover { opacity: 0.85; }
`;

export const BtnEmprestar = styled(BaseBtn)`
  background: ${({ theme }) => theme.primary};
  color: #fff;
`;

export const BtnEdit = styled(BaseBtn)`
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

export const BtnDelete = styled(BaseBtn)`
  background: ${({ theme }) => theme.error}22;
  color: ${({ theme }) => theme.error};
  border: 1px solid ${({ theme }) => theme.error}44;
`;
