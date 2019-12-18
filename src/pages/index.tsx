import React, { useEffect, useState } from 'react';

import API from '@/api/Api';

function Index() {
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    async function getResponse() {
      const res = await API.getPackageDetails('react');
      setResponse(res);
    }
    getResponse();
  }, []);

  return <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>;
}

export default Index;
