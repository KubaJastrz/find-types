import React from 'react';
import { Helmet } from 'react-helmet';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <h1>404 Not Found</h1>
    </>
  );
}

export default NotFound;
