import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useItensStore } from '../../stores/itens.store';
import type { Livro } from '../../types/entities';

const LivrosFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { addLivro, updateLivro } = useItensStore();

  const [form, setForm] = useState({ titulo: '', autor: '', anoPublicacao: '', imagemUrl: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      api.get<Livro>(`/livros/${id}`).then(({ data }) => {
        setForm({
          titulo: data.titulo,
          autor: data.autor,
          anoPublicacao: String(data.anoPublicacao),
          imagemUrl: data.imagemUrl || '',
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    if (!form.titulo.trim() || !form.autor.trim() || !form.anoPublicacao) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }
    const ano = Number(form.anoPublicacao);
    if (ano < 1 || ano > new Date().getFullYear()) {
      setErro('Ano de publicação inválido.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        titulo: form.titulo.trim(),
        autor: form.autor.trim(),
        anoPublicacao: ano,
        imagemUrl: form.imagemUrl.trim() || undefined,
      };
      if (isEditing) {
        await api.put(`/livros/${id}`, payload);
        updateLivro(Number(id), payload);
      } else {
        const { data } = await api.post<Livro>('/livros', payload);
        addLivro(data);
      }
      navigate('/acervo');
    } catch {
      setErro('Erro ao salvar o livro. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Page>
      <Styled.Card>
        <Styled.Titulo>{isEditing ? 'Editar Livro' : 'Novo Livro'}</Styled.Titulo>
        <form onSubmit={handleSubmit}>
          <Styled.Field>
            <Styled.Label>Título *</Styled.Label>
            <Styled.Input name="titulo" value={form.titulo} onChange={handleChange} maxLength={200} required />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>Autor *</Styled.Label>
            <Styled.Input name="autor" value={form.autor} onChange={handleChange} maxLength={150} required />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>Ano de Publicação *</Styled.Label>
            <Styled.Input name="anoPublicacao" type="number" value={form.anoPublicacao} onChange={handleChange} min={1} max={new Date().getFullYear()} required />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>URL da Capa (opcional)</Styled.Label>
            <Styled.Input name="imagemUrl" value={form.imagemUrl} onChange={handleChange} placeholder="https://..." />
          </Styled.Field>
          {erro && <Styled.Erro>{erro}</Styled.Erro>}
          <Styled.Actions>
            <Styled.BtnCancel type="button" onClick={() => navigate('/acervo')}>Cancelar</Styled.BtnCancel>
            <Styled.BtnSubmit type="submit" disabled={loading}>
              {loading ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
            </Styled.BtnSubmit>
          </Styled.Actions>
        </form>
      </Styled.Card>
    </Styled.Page>
  );
};

export default LivrosFormPage;
