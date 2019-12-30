import styled, { css } from 'styled-components';

interface SuggestionBarProps {
  isFocused?: boolean;
}

export const SuggestionBar = styled.div<SuggestionBarProps>`
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding-right: 0.4em;
  padding-left: 0.8em;
  border-radius: 4px;
  border: 1px solid #ccc;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #377acc;
      box-shadow: 0 0 0 1px #377acc;
    `}
`;

export const TextInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  border: 0;
  line-height: 2.2em;
  background: transparent;
  flex: 1;
  outline: 0;
  caret-color: #377acc;
`;
