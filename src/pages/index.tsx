import React from 'react';
import { parse } from 'query-string';

import Layout from '@/components/Layout';
import { CleanLink } from '@/components/Framework';
import * as Styled from './index.styles';
import TypeFinder from '@/components/TypeFinder';

function Index() {
  const [initialQuery, setInitialQuery] = React.useState<string>();

  React.useEffect(() => {
    const { q } = parse(window.location.search);
    const packageName = Array.isArray(q) ? q[0] : q;

    if (!packageName) {
      return;
    }

    setInitialQuery(packageName);
  }, []);

  return (
    <Layout>
      <Styled.PageTitle>
        <CleanLink to="/">Find Types</CleanLink>
      </Styled.PageTitle>
      <TypeFinder initialQuery={initialQuery} />
    </Layout>
  );
}

export default Index;
