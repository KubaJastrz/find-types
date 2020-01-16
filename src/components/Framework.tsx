import styled, { css } from 'styled-components';

export const CleanLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const Link = styled(CleanLink)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const CleanButton = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
`;

export const fontMono = css`
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
