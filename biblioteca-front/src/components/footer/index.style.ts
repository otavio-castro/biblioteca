import styled from 'styled-components';

export const FooterBar = styled.footer`
  background: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => theme.border};
  padding: 1rem 2rem;
  margin-top: auto;
`;

export const Text = styled.p`
  text-align: center;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0;
`;
