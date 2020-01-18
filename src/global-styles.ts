import { createGlobalStyle } from 'styled-components';
import { COLORS } from './styles/colors';

export default createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: ${COLORS.gray400};
    background-color: ${COLORS.white}
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #___gatsby,
  #gatsby-focus-wrapper {
    display: flex;
    flex-grow: 1;
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
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
