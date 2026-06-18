import { create } from 'zustand';
import type { Usuario } from '../types/entities';

interface UsuariosStore {
  usuarios: Usuario[];
  setUsuarios: (usuarios: Usuario[]) => void;
  addUsuario: (usuario: Usuario) => void;
  updateUsuario: (id: number, usuario: Partial<Usuario>) => void;
  removeUsuario: (id: number) => void;
}

export const useUsuariosStore = create<UsuariosStore>((set) => ({
  usuarios: [],
  setUsuarios: (usuarios) => set({ usuarios }),
  addUsuario: (usuario) => set((s) => ({ usuarios: [...s.usuarios, usuario] })),
  updateUsuario: (id, usuario) =>
    set((s) => ({ usuarios: s.usuarios.map((u) => (u.usuarioId === id ? { ...u, ...usuario } : u)) })),
  removeUsuario: (id) => set((s) => ({ usuarios: s.usuarios.filter((u) => u.usuarioId !== id) })),
}));
