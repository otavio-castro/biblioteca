import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useItensStore } from '../../stores/itens.store';
import type { Revista, Periodicidade } from '../../types/entities';
import { PERIODICIDADE_LABELS } from '../../types/entities';

const RevistasFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { addRevista, updateRevista } = useItensStore();

  const [form, setForm] = useState({ titulo: '', editora: '', edicao: '', anoPublicacao: '', periodicidade: 'Mensal', imagemUrl: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      api.get<Revista>(`/revistas/${id}`).then(({ data }) => {
        setForm({
          titulo: data.titulo,
          editora: data.editora,
          edicao: String(data.edicao),
          anoPublicacao: String(data.anoPublicacao),
          periodicidade: data.periodicidade,
          imagemUrl: data.imagemUrl || '',
        });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      const payload = {
        titulo: form.titulo.trim(),
        editora: form.editora.trim(),
        edicao: Number(form.edicao),
        anoPublicacao: Number(form.anoPublicacao),
        periodicidade: form.periodicidade as Periodicidade,
        imagemUrl: form.imagemUrl.trim() || undefined,
      };
      if (isEditing) {
        await api.put(`/revistas/${id}`, payload);
        updateRevista(Number(id), payload);
      } else {
        const { data } = await api.post<Revista>('/revistas', payload);
        addRevista(data);
      }
      navigate('/acervo');
    } catch {
      setErro('Erro ao salvar a revista.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Page>
      <Styled.Card>
        <Styled.Titulo>{isEditing ? 'Editar Revista' : 'Nova Revista'}</Styled.Titulo>
        <form onSubmit={handleSubmit}>
          <Styled.Field>
            <Styled.Label>Título *</Styled.Label>
            <Styled.Input name="titulo" value={form.titulo} onChange={handleChange} required />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>Editora *</Styled.Label>
            <Styled.Input name="editora" value={form.editora} onChange={handleChange} required />
          </Styled.Field>
          <Styled.Row>
            <Styled.Field>
              <Styled.Label>Edição *</Styled.Label>
              <Styled.Input name="edicao" type="number" value={form.edicao} onChange={handleChange} min={1} required />
            </Styled.Field>
            <Styled.Field>
              <Styled.Label>Ano *</Styled.Label>
              <Styled.Input name="anoPublicacao" type="number" value={form.anoPublicacao} onChange={handleChange} min={1} max={new Date().getFullYear()} required />
            </Styled.Field>
          </Styled.Row>
          <Styled.Field>
            <Styled.Label>Periodicidade *</Styled.Label>
            <Styled.Select name="periodicidade" value={form.periodicidade} onChange={handleChange}>
              {Object.entries(PERIODICIDADE_LABELS).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </Styled.Select>
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

export default RevistasFormPage;
