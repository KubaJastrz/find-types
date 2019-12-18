import React, { useEffect, useState } from 'react';

import API from '@/api/Api';
import Layout from '@/components/Layout';

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
      <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>
    </Layout>
  );
}

export default Index;
