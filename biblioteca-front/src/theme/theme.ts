export interface AppTheme {
  background: string;
  card: string;
  surface: string;
  text: string;
  textMuted: string;
  heading: string;
  border: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  shadowSm: string;
  shadowMd: string;
}

export const lightTheme: AppTheme = {
  background: '#FFF8E7',
  card: '#FFFDF5',
  surface: '#F5E6D3',
  text: '#2C1A0E',
  textMuted: '#6B4226',
  heading: '#1A0F06',
  border: '#D4A96A',
  primary: '#4A7C59',
  primaryDark: '#2C5F2E',
  primaryLight: '#6B9E7A',
  secondary: '#8B4513',
  accent: '#722F37',
  success: '#2E7D32',
  warning: '#E65100',
  error: '#C62828',
  shadowSm: '0 1px 3px rgba(44,26,14,0.12)',
  shadowMd: '0 4px 12px rgba(44,26,14,0.16)',
};

export const darkTheme: AppTheme = {
  background: '#111110',   // quase preto neutro — sem marrom visível
  card: '#1C1A17',         // card com tinte mínimo, distinguível
  surface: '#242018',      // header/nav — levemente mais quente
  text: '#E8D5A3',         // pergaminho — a quentura vive no texto
  textMuted: '#A08860',    // couro muted
  heading: '#F5EAD0',      // creme suave
  border: '#38342C',       // borda sutil
  primary: '#6FAF72',      // verde abajur de leitura
  primaryDark: '#4A8A4D',
  primaryLight: '#92C795',
  secondary: '#C9973F',    // latão/ouro
  accent: '#9B3045',       // vinho/bordô
  success: '#5A9E5D',
  warning: '#D4902A',
  error: '#C94040',
  shadowSm: '0 1px 4px rgba(0,0,0,0.6)',
  shadowMd: '0 6px 24px rgba(0,0,0,0.75)',
};
