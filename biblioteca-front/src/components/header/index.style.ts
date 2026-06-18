import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  background: ${({ theme }) => theme.surface};
  border-bottom: 2px solid ${({ theme }) => theme.border};
  box-shadow: ${({ theme }) => theme.shadowSm};
`;

export const HeaderBar = styled.header`
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 0.75rem;
  }
`;

export const Brand = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.heading};
  white-space: nowrap;
  flex-shrink: 0;
  img { display: block; }
  &:hover { color: ${({ theme }) => theme.primary}; }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled(NavLink)`
  padding: 0.35rem 0.85rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textMuted};
  transition: color 0.2s, background 0.2s;
  &:hover {
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.card};
  }
  &.active {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}18;
    font-weight: 600;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const ThemeBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.3rem 0.55rem;
  font-size: 1rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: background 0.2s;
  &:hover { background: ${({ theme }) => theme.card}; }
`;

export const LogoutBtn = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  padding: 0.3rem 0.75rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textMuted};
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
  &:hover {
    color: ${({ theme }) => theme.error};
    border-color: ${({ theme }) => theme.error};
    background: ${({ theme }) => theme.error}11;
  }
`;

export const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-left: auto;
  cursor: pointer;
  line-height: 1;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    padding: 0.75rem 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    gap: 0.25rem;
  }
`;

export const MobileNavItem = styled(NavLink)`
  padding: 0.65rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textMuted};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.primary}18;
    font-weight: 600;
  }
`;

export const MobileUserRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 0.75rem 0.5rem 0.25rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
