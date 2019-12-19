import React from 'react';

import { PackageResponseData } from '@/types/api';

interface Props {
  response?: any; // PackageResponseData;
}

function Results({ response }: Props) {
  return <pre>{response ? JSON.stringify(response, null, 2) : 'Loading...'}</pre>;
}

export default Results;
