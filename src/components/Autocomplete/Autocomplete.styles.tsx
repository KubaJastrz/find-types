import styled, { css, StyledComponent } from 'styled-components';

import { CleanButton, Center } from '@/components/Framework';
import { styledWithOmitProps } from '@/styles/helpers';
import { COLORS } from '@/styles/colors';

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
  border: 1px solid ${COLORS.gray800};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${COLORS.blueTypescript};
      box-shadow: 0 0 0 1px ${COLORS.blueTypescript};
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
  caret-color: ${COLORS.blueTypescript};
`;

interface ListProps {
  isOpen: boolean;
}

export const List = styled.ul<ListProps>`
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 8px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  background: ${COLORS.white};

  ${({ isOpen }) => isOpen && `display: block`};
`;

export const Item = styled.li`
  display: flex;
`;

interface ButtonProps {
  isHighlighted: boolean;
}

export const Button = styledWithOmitProps(CleanButton, ['isHighlighted'])`
  flex: 1;
  padding: 0.4em 0.8em;

  ${({ isHighlighted }) => isHighlighted && `background: ${COLORS.gray900}`};

  em {
    font-style: normal;
    font-weight: bold;
  }
` as StyledComponent<'button', any, ButtonProps, never>;

export const SearchButton = styled(CleanButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

export const Loading = styled(Center)`
  padding: 1.2em;
  font-size: 0.9em;
  color: ${COLORS.gray450};
  letter-spacing: 0.1px;
`;
