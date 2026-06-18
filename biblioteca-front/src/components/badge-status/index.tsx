import * as Styled from "./index.style.ts";

type BadgeVariant = 'disponivel' | 'emprestado' | 'atrasado' | 'devolvido' | 'ativo' | 'bibliotecario' | 'aluno';

interface Props {
  variant: BadgeVariant;
  label?: string;
}

const LABELS: Record<BadgeVariant, string> = {
  disponivel: 'Disponível',
  emprestado: 'Emprestado',
  atrasado: 'Atrasado',
  devolvido: 'Devolvido',
  ativo: 'Ativo',
  bibliotecario: 'Bibliotecário',
  aluno: 'Aluno',
};

const BadgeStatus = ({ variant, label }: Props) => {
  return <Styled.Badge $variant={variant}>{label ?? LABELS[variant]}</Styled.Badge>;
};

export default BadgeStatus;
