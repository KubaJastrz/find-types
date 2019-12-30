import styled from 'styled-components';
import { MEDIA } from '@/styles/helpers';

export const SearchForm = styled.form`
  position: relative;
  width: 300px;

  ${MEDIA.minWidth(425)} {
    width: 340px;
  }

  ${MEDIA.md} {
    width: 420px;
  }
`;
