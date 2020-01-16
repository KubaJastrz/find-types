import React from 'react';
import styled from 'styled-components';

import SEO from './SEO';
import GlobalStyles from '../global-styles';

import 'modern-normalize';
import 'focus-visible';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Root>
      <SEO />
      <GlobalStyles />
      {children}
      <AppFooter />
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;

const AppFooter = styled(Footer)`
  margin-top: auto;
  margin-bottom: 12px;
`;

export default Layout;
