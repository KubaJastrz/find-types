import styled from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

export const CleanLink = styled(GatsbyLink)`
  color: inherit;
  text-decoration: none;
`;

export const Link = styled(CleanLink)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export const Button = styled.button`
  padding: 0;
  border: 0;
  background-color: transparent;
`;
