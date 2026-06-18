import { create } from 'zustand';
import type { Livro, Revista } from '../types/entities';

interface ItensStore {
  livros: Livro[];
  revistas: Revista[];
  setLivros: (livros: Livro[]) => void;
  setRevistas: (revistas: Revista[]) => void;
  addLivro: (livro: Livro) => void;
  addRevista: (revista: Revista) => void;
  updateLivro: (id: number, livro: Partial<Livro>) => void;
  updateRevista: (id: number, revista: Partial<Revista>) => void;
  removeLivro: (id: number) => void;
  removeRevista: (id: number) => void;
}

export const useItensStore = create<ItensStore>((set) => ({
  livros: [],
  revistas: [],
  setLivros: (livros) => set({ livros }),
  setRevistas: (revistas) => set({ revistas }),
  addLivro: (livro) => set((s) => ({ livros: [...s.livros, livro] })),
  addRevista: (revista) => set((s) => ({ revistas: [...s.revistas, revista] })),
  updateLivro: (id, livro) =>
    set((s) => ({ livros: s.livros.map((l) => (l.itemId === id ? { ...l, ...livro } : l)) })),
  updateRevista: (id, revista) =>
    set((s) => ({ revistas: s.revistas.map((r) => (r.itemId === id ? { ...r, ...revista } : r)) })),
  removeLivro: (id) => set((s) => ({ livros: s.livros.filter((l) => l.itemId !== id) })),
  removeRevista: (id) => set((s) => ({ revistas: s.revistas.filter((r) => r.itemId !== id) })),
}));
