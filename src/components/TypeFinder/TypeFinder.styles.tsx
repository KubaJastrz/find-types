import styled from 'styled-components';
import { MEDIA } from '@/styles/helpers';

export const SearchForm = styled.div`
  position: relative;
  width: 300px;

  ${MEDIA.sm} {
    width: 340px;
  }

  ${MEDIA.md} {
    width: 420px;
  }
`;

export const SearchResults = styled.div`
  margin-top: 50px;
  width: 100%;
  padding: 0 20px;

  ${MEDIA.sm} {
    width: 400px;
    padding: 0;
  }

  ${MEDIA.md} {
    width: 520px;
  }
`;

export const Center = styled.div`
  text-align: center;
`;
