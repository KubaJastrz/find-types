import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import { Center } from './Framework';

function Loading() {
  return <StyledLoading>Loading...</StyledLoading>;
}

const StyledLoading = styled(Center)`
  padding: 1.2em;
  font-size: 0.9em;
  color: ${({ theme }) => transparentize(0.2, theme.textColor)};
  letter-spacing: 0.1px;
`;

export default Loading;
