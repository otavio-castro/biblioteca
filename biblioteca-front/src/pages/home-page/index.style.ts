import styled from 'styled-components';

export const Page = styled.div``;

export const Loading = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.textMuted};
  padding: 3rem;
`;

export const Saudacao = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

export const Subtitulo = styled.p`
  color: ${({ theme }) => theme.textMuted};
  margin-bottom: 2rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
`;

type ColorKey = 'primary' | 'secondary' | 'success' | 'warning';

export const StatCard = styled.div<{ $color: ColorKey }>`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 4px solid ${({ theme, $color }) => theme[$color]};
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  box-shadow: ${({ theme }) => theme.shadowSm};
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const StatIcon = styled.span`
  font-size: 1.6rem;
`;

export const StatNum = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.heading};
  font-family: 'Georgia', serif;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export const StatLabel = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
`;

export const Section = styled.section`
  margin-top: 1rem;
`;

export const SectionTitle = styled.h2`
  font-family: 'Georgia', serif;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.heading};
  margin-bottom: 1rem;
`;

export const DestCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  gap: 1.25rem;
  align-items: center;
  max-width: 480px;
  box-shadow: ${({ theme }) => theme.shadowSm};

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

export const DestCover = styled.img`
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
`;

export const DestInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const DestTitulo = styled.h3`
  font-family: 'Georgia', serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.heading};
`;

export const DestMeta = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textMuted};
  margin: 0;
`;

export const DestCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.secondary};
  font-style: italic;
`;
