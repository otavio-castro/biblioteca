import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useEmprestimosStore } from '../../stores/emprestimos.store';
import { useAuthStore } from '../../stores/auth.store';
import type { Livro, Usuario, Emprestimo } from '../../types/entities';

const EmprestimosFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addEmprestimo } = useEmprestimosStore();
  const { isBibliotecario, usuarioId } = useAuthStore();
  const isBib = isBibliotecario();

  const preselectedLivro = (location.state as { livroId?: number } | null)?.livroId;

  const [livros, setLivros] = useState<Livro[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [form, setForm] = useState({
    itemId: preselectedLivro ? String(preselectedLivro) : '',
    usuarioId: isBib ? '' : String(usuarioId ?? ''),
    dataDevolucaoPrevista: '',
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetches: Promise<void>[] = [
      api.get<Livro[]>('/livros?status=Disponivel').then(({ data }) => setLivros(data)),
    ];
    // Bibliotecário precisa do select de usuários; Aluno não
    if (isBib) {
      fetches.push(
        api.get<Usuario[]>('/usuarios').then(({ data }) => setUsuarios(data))
      );
    }
    Promise.all(fetches);
  }, [isBib]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const payload = {
        itemId: Number(form.itemId),
        // Aluno: backend sobrescreve com o claim do token — envia 0 como placeholder
        usuarioId: isBib ? Number(form.usuarioId) : (usuarioId ?? 0),
        dataDevolucaoPrevista: new Date(form.dataDevolucaoPrevista).toISOString(),
      };
      const { data } = await api.post<Emprestimo>('/emprestimos', payload);
      addEmprestimo(data);
      navigate('/emprestimos');
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) setErro('Este livro já está emprestado ou é uma revista.');
      else setErro('Erro ao registrar o empréstimo.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <Styled.Page>
      <Styled.Card>
        <Styled.Titulo>Novo Empréstimo</Styled.Titulo>
        <form onSubmit={handleSubmit}>
          <Styled.Field>
            <Styled.Label>Livro disponível *</Styled.Label>
            <Styled.Select name="itemId" value={form.itemId} onChange={handleChange} required>
              <option value="">Selecione um livro...</option>
              {livros.map((l) => (
                <option key={l.itemId} value={l.itemId}>{l.titulo} — {l.autor}</option>
              ))}
            </Styled.Select>
          </Styled.Field>

          {isBib && (
            <Styled.Field>
              <Styled.Label>Usuário *</Styled.Label>
              <Styled.Select name="usuarioId" value={form.usuarioId} onChange={handleChange} required>
                <option value="">Selecione um usuário...</option>
                {usuarios.map((u) => (
                  <option key={u.usuarioId} value={u.usuarioId}>{u.nome} ({u.email})</option>
                ))}
              </Styled.Select>
            </Styled.Field>
          )}

          <Styled.Field>
            <Styled.Label>Data de devolução prevista *</Styled.Label>
            <Styled.Input
              type="date"
              name="dataDevolucaoPrevista"
              value={form.dataDevolucaoPrevista}
              onChange={handleChange}
              min={minDateStr}
              required
            />
          </Styled.Field>
          {erro && <Styled.Erro>{erro}</Styled.Erro>}
          <Styled.Actions>
            <Styled.BtnCancel type="button" onClick={() => navigate('/emprestimos')}>Cancelar</Styled.BtnCancel>
            <Styled.BtnSubmit type="submit" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrar'}
            </Styled.BtnSubmit>
          </Styled.Actions>
        </form>
      </Styled.Card>
    </Styled.Page>
  );
};

export default EmprestimosFormPage;
