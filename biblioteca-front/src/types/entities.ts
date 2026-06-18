export interface ItemBiblioteca {
  itemId: number;
  titulo: string;
  anoPublicacao: number;
  tipoItem: 'Livro' | 'Revista';
  imagemUrl?: string;
}

export interface Livro extends ItemBiblioteca {
  tipoItem: 'Livro';
  autor: string;
  status: StatusItem;
  contadorEmprestimos: number;
}

export interface Revista extends ItemBiblioteca {
  tipoItem: 'Revista';
  editora: string;
  edicao: number;
  periodicidade: Periodicidade;
}

export interface Usuario {
  usuarioId: number;
  nome: string;
  email: string;
  telefone?: string;
  perfil?: 'Bibliotecario' | 'Aluno';
}

export interface Emprestimo {
  emprestimoId: number;
  itemId: number;
  tituloItem?: string;
  usuarioId: number;
  nomeUsuario?: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva?: string;
  status: StatusEmprestimo;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  perfil: 'Bibliotecario' | 'Aluno';
  usuarioId: number;
}

export type StatusItem = 'Disponivel' | 'Emprestado';
export type StatusEmprestimo = 'Ativo' | 'Devolvido' | 'Atrasado';
export type Periodicidade = 'Semanal' | 'Mensal' | 'Bimestral' | 'Trimestral';

export const PERIODICIDADE_LABELS: Record<Periodicidade, string> = {
  Semanal: 'Semanal',
  Mensal: 'Mensal',
  Bimestral: 'Bimestral',
  Trimestral: 'Trimestral',
};
