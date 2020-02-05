import React from 'react';
import { ThemeProvider } from 'styled-components';

import { COLORS } from '@/styles/colors';

const theme = {
  backgroundColor: COLORS.grayBlue100,
  headingColor: COLORS.white,
  textColor: COLORS.grayBlue900,
  activeColor: COLORS.blueTypescript,
} as const;

export type Theme = typeof theme;

interface Props {
  children: React.ReactElement;
}

function Theme({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
