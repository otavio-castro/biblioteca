import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
  padding: 1rem;
`;

export const Dialog = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadowMd};
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.2s ease;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.heading};
  font-family: 'Georgia', serif;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textMuted};
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  &:hover {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.surface};
  }
`;

export const Body = styled.div`
  padding: 1.5rem;
`;
