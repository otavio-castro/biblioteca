import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Georgia', 'Times New Roman', serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s, color 0.3s;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.heading};
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;
