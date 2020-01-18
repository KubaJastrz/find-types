import React from 'react';
import styled from 'styled-components';

import { Link, CleanLink } from '@/components/Framework';
import { ReactComponent as GithubIcon } from '@/assets/icons/github.svg';
import { MEDIA } from '@/styles/helpers';
import { COLORS } from '@/styles/colors';

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  return (
    <StyledFooter className={className}>
      <Links>
        <CleanLink href="https://github.com/KubaJastrz/find-types" title="Source code">
          <GithubIcon />
        </CleanLink>
      </Links>
      <p>
        Powered by <Link href="https://www.npmjs.com/">npm</Link> and{' '}
        <Link href="https://unpkg.com/">unpkg</Link>
      </p>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.85em;
  color: ${COLORS.gray550};
  padding: 8px;
  transition: 100ms ease-in-out;

  ${MEDIA.sm} {
    font-size: 0.9em;
  }

  &:hover {
    color: ${COLORS.gray400};
  }
`;

const Links = styled.div`
  margin-bottom: 8px;
`;

export default Footer;
