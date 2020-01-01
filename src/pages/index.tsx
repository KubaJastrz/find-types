import React from 'react';
import styled from 'styled-components';
import { parse } from 'query-string';
import { PageRendererProps } from 'gatsby';

import Layout from '@/components/Layout';
import { CleanLink } from '@/components/Framework';
import TypeFinder from '@/components/TypeFinder';
import { MEDIA } from '@/styles/helpers';

function Index({ location }: PageRendererProps) {
  const [initialQuery, setInitialQuery] = React.useState<string>();
  // skip first render of the application to simplify logic responsible for handling initial query
  const [wasInitialQueryChecked, checkInitialQuery] = React.useState(false);

  React.useEffect(() => {
    checkInitialQuery(true);

    const { q } = parse(location.search);
    const packageName = Array.isArray(q) ? q[0] : q;

    if (!packageName) {
      return;
    }

    setInitialQuery(packageName);
  }, [location.search]);

  return (
    <Layout>
      <PageTitle>
        <CleanLink to="/">Find Types</CleanLink>
      </PageTitle>
      {wasInitialQueryChecked && <TypeFinder initialQuery={initialQuery} />}
    </Layout>
  );
}

export const PageTitle = styled.h1`
  font-size: 1.67em;
  margin-top: 1.33em;
  margin-bottom: 1em;

  ${MEDIA.xs} {
    font-size: 2.33em;
  }
`;

export default Index;
