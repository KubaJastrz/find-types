import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input,
  button {
    color: inherit;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  button:not(:disabled),
  [role='button'] {
    cursor: pointer;
  }
`;
