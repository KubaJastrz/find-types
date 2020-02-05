import styled, { css, StyledComponent } from 'styled-components';
import { transparentize } from 'polished';

import { CleanButton } from '@/components/Framework';
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
  border: 1px solid ${COLORS.grayBlue800};
  background-color: ${COLORS.grayBlue200};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${({ theme }) => theme.activeColor};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.activeColor};
    `}
`;

export const TextInput = styled.input.attrs(() => ({
  type: 'text',
}))`
  border: 0;
  line-height: 2.2em;
  background: transparent;
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => transparentize(0.2, theme.textColor)};
  }

  /* override default outline */
  &&& {
    outline: 0;
  }
`;

interface ListProps {
  isOpen: boolean;
}

export const List = styled.ul<ListProps>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 8px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  background-color: ${COLORS.grayBlue200};
  overflow: hidden;
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

  ${({ isHighlighted }) => isHighlighted && `background: ${COLORS.grayBlue300}`};

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
