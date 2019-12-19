import styled from 'styled-components';
import { MEDIA } from '@/styles/helpers';

export const PageTitle = styled.h1`
  font-size: 1.67em;
  margin-top: 1.33em;
  margin-bottom: 1em;

  ${MEDIA.xs} {
    font-size: 2.33em;
  }
`;
