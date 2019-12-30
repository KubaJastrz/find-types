import styled, { StyledComponent } from 'styled-components';

import { CleanButton } from '@/components/Framework';
import { styledWithOmitProps } from '@/styles/helpers';

interface ListProps {
  isVisible: boolean;
}

export const List = styled.ul<ListProps>`
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 8px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px;
  background: #fff;

  ${({ isVisible }) => isVisible && `display: block`};
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

  ${({ isHighlighted }) => isHighlighted && `background: #eee`};

  em {
    font-style: normal;
    font-weight: bold;
  }
` as StyledComponent<'button', any, ButtonProps, never>;
