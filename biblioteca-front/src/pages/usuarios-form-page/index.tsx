import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Styled from "./index.style.ts";
import api from '../../config/api';
import { useUsuariosStore } from '../../stores/usuarios.store';
import type { Usuario } from '../../types/entities';

const UsuariosFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { addUsuario, updateUsuario } = useUsuariosStore();

  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '', perfil: 'Aluno' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      api.get<Usuario>(`/usuarios/${id}`).then(({ data }) => {
        setForm({ nome: data.nome, email: data.email, telefone: data.telefone || '', senha: '', perfil: data.perfil || 'Aluno' });
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      if (isEditing) {
        const payload = { nome: form.nome.trim(), email: form.email.trim(), telefone: form.telefone.trim() || undefined };
        await api.put(`/usuarios/${id}`, payload);
        updateUsuario(Number(id), payload);
      } else {
        const payload = {
          nome: form.nome.trim(),
          email: form.email.trim(),
          telefone: form.telefone.trim() || undefined,
          senha: form.senha,
          perfil: form.perfil,
        };
        const { data } = await api.post<Usuario>('/usuarios', payload);
        addUsuario(data);
      }
      navigate('/usuarios');
    } catch (err: unknown) {
      const msg = (err as { response?: { status?: number } })?.response?.status === 409
        ? 'Este e-mail já está cadastrado.'
        : 'Erro ao salvar o usuário.';
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Styled.Page>
      <Styled.Card>
        <Styled.Titulo>{isEditing ? 'Editar Usuário' : 'Novo Usuário'}</Styled.Titulo>
        <form onSubmit={handleSubmit}>
          <Styled.Field>
            <Styled.Label>Nome *</Styled.Label>
            <Styled.Input name="nome" value={form.nome} onChange={handleChange} required maxLength={150} />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>E-mail *</Styled.Label>
            <Styled.Input name="email" type="email" value={form.email} onChange={handleChange} required />
          </Styled.Field>
          <Styled.Field>
            <Styled.Label>Telefone</Styled.Label>
            <Styled.Input name="telefone" value={form.telefone} onChange={handleChange} maxLength={20} placeholder="(11) 99999-9999" />
          </Styled.Field>
          {!isEditing && (
            <>
              <Styled.Field>
                <Styled.Label>Senha *</Styled.Label>
                <Styled.Input name="senha" type="password" value={form.senha} onChange={handleChange} required minLength={6} placeholder="Mínimo 6 caracteres" />
              </Styled.Field>
              <Styled.Field>
                <Styled.Label>Perfil *</Styled.Label>
                <Styled.Select name="perfil" value={form.perfil} onChange={(e) => setForm((prev) => ({ ...prev, perfil: e.target.value }))}>
                  <option value="Aluno">Aluno</option>
                  <option value="Bibliotecario">Bibliotecário</option>
                </Styled.Select>
              </Styled.Field>
            </>
          )}
          {erro && <Styled.Erro>{erro}</Styled.Erro>}
          <Styled.Actions>
            <Styled.BtnCancel type="button" onClick={() => navigate('/usuarios')}>Cancelar</Styled.BtnCancel>
            <Styled.BtnSubmit type="submit" disabled={loading}>
              {loading ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar'}
            </Styled.BtnSubmit>
          </Styled.Actions>
        </form>
      </Styled.Card>
    </Styled.Page>
  );
};

export default UsuariosFormPage;
