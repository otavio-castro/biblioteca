import { create } from 'zustand';
import type { LoginResponse } from '../types/entities';

interface AuthStore {
  token: string | null;
  nome: string | null;
  perfil: 'Bibliotecario' | 'Aluno' | null;
  email: string | null;
  usuarioId: number | null;
  setAuth: (data: LoginResponse) => void;
  logout: () => void;
  isBibliotecario: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: localStorage.getItem('token'),
  nome: localStorage.getItem('nome'),
  perfil: (localStorage.getItem('perfil') as 'Bibliotecario' | 'Aluno' | null),
  email: localStorage.getItem('email'),
  usuarioId: localStorage.getItem('usuarioId') ? Number(localStorage.getItem('usuarioId')) : null,

  setAuth: (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('nome', data.nome);
    localStorage.setItem('perfil', data.perfil);
    localStorage.setItem('email', data.email);
    localStorage.setItem('usuarioId', String(data.usuarioId));
    set({ token: data.token, nome: data.nome, perfil: data.perfil, email: data.email, usuarioId: data.usuarioId });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('perfil');
    localStorage.removeItem('email');
    localStorage.removeItem('usuarioId');
    set({ token: null, nome: null, perfil: null, email: null, usuarioId: null });
  },

  isBibliotecario: () => get().perfil === 'Bibliotecario',
}));
