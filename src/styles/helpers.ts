import React from 'react';
import styled from 'styled-components';
import { omit } from 'lodash';

export const MEDIA = {
  xs: '@media (min-width: 360px)',
  sm: '@media (min-width: 425px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
  minWidth: (px: number) => `@media (min-width: ${px}px)`,
} as const;

export const styledWithOmitProps = (Component: React.ComponentType, propsToOmit: string[] = []) =>
  styled((props) => React.createElement(Component, omit(props, propsToOmit)));
