import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components';

type BadgeVariant = 'disponivel' | 'emprestado' | 'atrasado' | 'devolvido' | 'ativo' | 'bibliotecario' | 'aluno';

const variantColors = (variant: BadgeVariant, theme: DefaultTheme): string => {
  switch (variant) {
    case 'disponivel':
      return `background: ${theme.success}22; color: ${theme.success}; border: 1px solid ${theme.success}44;`;
    case 'emprestado':
      return `background: ${theme.warning}22; color: ${theme.warning}; border: 1px solid ${theme.warning}44;`;
    case 'atrasado':
      return `background: ${theme.error}22; color: ${theme.error}; border: 1px solid ${theme.error}44;`;
    case 'devolvido':
      return `background: ${theme.textMuted}22; color: ${theme.textMuted}; border: 1px solid ${theme.textMuted}44;`;
    case 'ativo':
      return `background: ${theme.primary}22; color: ${theme.primary}; border: 1px solid ${theme.primary}44;`;
    case 'bibliotecario':
      return `background: ${theme.accent}22; color: ${theme.accent}; border: 1px solid ${theme.accent}44;`;
    case 'aluno':
      return `background: ${theme.secondary}22; color: ${theme.secondary}; border: 1px solid ${theme.secondary}44;`;
  }
};

export const Badge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  font-family: 'Georgia', serif;
  letter-spacing: 0.03em;
  white-space: nowrap;
  ${({ $variant, theme }) => variantColors($variant, theme)}
`;
