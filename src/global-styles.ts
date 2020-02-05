import { createGlobalStyle } from 'styled-components';

import { Theme } from '@/components/Theme';
import { outline } from '@/components/Framework';

export default createGlobalStyle<{ theme: Theme }>`
  html {
    height: 100%;
  }

  body {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
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

  .js-focus-visible .focus-visible {
    ${outline};
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
    color: ${({ theme }) => theme.headingColor};
    font-weight: normal;
  }

  p {
    margin: 0;
  }

  button:not(:disabled),
  [role='button'] {
    cursor: pointer;
  }
`;
