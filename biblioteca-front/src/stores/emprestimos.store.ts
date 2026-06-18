import { create } from 'zustand';
import type { Emprestimo } from '../types/entities';

interface EmprestimosStore {
  emprestimos: Emprestimo[];
  setEmprestimos: (emprestimos: Emprestimo[]) => void;
  addEmprestimo: (emprestimo: Emprestimo) => void;
  devolverEmprestimo: (id: number) => void;
}

export const useEmprestimosStore = create<EmprestimosStore>((set) => ({
  emprestimos: [],
  setEmprestimos: (emprestimos) => set({ emprestimos }),
  addEmprestimo: (emprestimo) => set((s) => ({ emprestimos: [...s.emprestimos, emprestimo] })),
  devolverEmprestimo: (id) =>
    set((s) => ({
      emprestimos: s.emprestimos.map((e) =>
        e.emprestimoId === id ? { ...e, status: 'Devolvido', dataDevolucaoEfetiva: new Date().toISOString() } : e
      ),
    })),
}));
