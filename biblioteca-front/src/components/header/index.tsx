import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import BadgeStatus from '../badge-status';
import { useAuthStore } from '../../stores/auth.store';
import { useThemeContext } from '../../theme/ThemeContext';

const Header = () => {
  const { nome, perfil, logout, isBibliotecario } = useAuthStore();
  const { isDark, toggleTheme } = useThemeContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isBib = isBibliotecario();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  const userBadge = perfil && (
    <BadgeStatus
      variant={perfil === 'Bibliotecario' ? 'bibliotecario' : 'aluno'}
      label={perfil === 'Bibliotecario' ? 'Bibliotecário' : 'Aluno'}
    />
  );

  return (
    <Styled.HeaderWrapper>
      <Styled.HeaderBar>
        <Styled.Brand to="/" onClick={closeMenu}>
          <img src="/favicon.svg" alt="BookStack" width={28} height={28} />
          BookStack
        </Styled.Brand>

        <Styled.Nav>
          <Styled.NavItem to="/acervo">Acervo</Styled.NavItem>
          <Styled.NavItem to="/emprestimos">Empréstimos</Styled.NavItem>
          {isBib && <Styled.NavItem to="/usuarios">Usuários</Styled.NavItem>}
          <Styled.NavItem to="/relatorios">Relatórios</Styled.NavItem>
        </Styled.Nav>

        <Styled.Controls>
          <Styled.ThemeBtn onClick={toggleTheme} title={isDark ? 'Modo claro' : 'Modo escuro'}>
            {isDark ? '☀️' : '🌙'}
          </Styled.ThemeBtn>
          {nome && (
            <Styled.UserInfo>
              <span>{nome}</span>
              {userBadge}
            </Styled.UserInfo>
          )}
          <Styled.LogoutBtn onClick={handleLogout}>Sair</Styled.LogoutBtn>
        </Styled.Controls>

        <Styled.HamburgerBtn onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </Styled.HamburgerBtn>
      </Styled.HeaderBar>

      <Styled.MobileMenu $open={menuOpen}>
        <Styled.MobileNavItem to="/acervo" onClick={closeMenu}>📚 Acervo</Styled.MobileNavItem>
        <Styled.MobileNavItem to="/emprestimos" onClick={closeMenu}>🔖 Empréstimos</Styled.MobileNavItem>
        {isBib && <Styled.MobileNavItem to="/usuarios" onClick={closeMenu}>👥 Usuários</Styled.MobileNavItem>}
        <Styled.MobileNavItem to="/relatorios" onClick={closeMenu}>📊 Relatórios</Styled.MobileNavItem>

        <Styled.MobileUserRow>
          {nome && (
            <Styled.UserInfo>
              <span>{nome}</span>
              {userBadge}
            </Styled.UserInfo>
          )}
          <Styled.MobileActions>
            <Styled.ThemeBtn onClick={toggleTheme}>{isDark ? '☀️' : '🌙'}</Styled.ThemeBtn>
            <Styled.LogoutBtn onClick={handleLogout}>Sair</Styled.LogoutBtn>
          </Styled.MobileActions>
        </Styled.MobileUserRow>
      </Styled.MobileMenu>
    </Styled.HeaderWrapper>
  );
};

export default Header;
