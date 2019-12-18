import React from 'react';

import SEO from './SEO';
import GlobalStyles from '../global-styles';

import 'modern-normalize';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <SEO />
      <GlobalStyles />
      {children}
    </>
  );
};

export default Layout;
