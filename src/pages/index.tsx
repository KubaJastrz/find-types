import React, { useEffect, useState } from 'react';

import API from '@/api/Api';
import Layout from '@/components/Layout';
import { CleanLink } from '@/components/Framework';
import * as Styled from './index.styles';

function Index() {
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    async function getResponse() {
      const res = await API.getPackageDetails('react');
      setResponse(res);
    }
    getResponse();
  }, []);

  return (
    <Layout>
      <Styled.PageTitle>
        <CleanLink to="/">Find Types</CleanLink>
      </Styled.PageTitle>
      <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>
    </Layout>
  );
}

export default Index;
