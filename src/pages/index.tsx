import React, { useEffect, useState } from 'react';
import '../styles/index.css';

import API from '../api/Api';

function Index() {
  const [response, setResponse] = useState<any>();

  useEffect(() => {
    async function getResponse() {
      const res = await API.getPackageDetails('react');
      setResponse(res);
    }
    getResponse();
  }, []);

  return <main>{response ? JSON.stringify(response.body.name, null, 2) : 'Loading...'}</main>;
}

export default Index;
