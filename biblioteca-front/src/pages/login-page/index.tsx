import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useAuthStore } from '../../stores/auth.store';
import type { LoginResponse } from '../../types/entities';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', { email, senha });
      setAuth(data);
      navigate('/');
    } catch {
      setErro('Email ou senha inválidos. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Page>
      <Styled.Card>
        <Styled.Logo>📚</Styled.Logo>
        <Styled.Titulo>Sistema de Biblioteca</Styled.Titulo>
        <Styled.Subtitulo>Acesse sua conta para continuar</Styled.Subtitulo>
        <form onSubmit={handleSubmit}>
          <Styled.Field>
            <Styled.Label htmlFor="email">E-mail</Styled.Label>
            <Styled.Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label htmlFor="senha">Senha</Styled.Label>
            <Styled.Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </Styled.Field>
          {erro && <Styled.Erro>{erro}</Styled.Erro>}
          <Styled.Btn type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Styled.Btn>
        </form>
        <Styled.Hint>
          Bibliotecário: bibliotecario@biblioteca.com / bibliotecario@123
        </Styled.Hint>
      </Styled.Card>
    </Styled.Page>
  );
};

export default LoginPage;
