import { useEffect, useState } from 'react';

import type { PackageDataLoaderData } from '~/server-services/package-data';
import { combinePackageData } from '~/server-services/package-data/combine-package-data';

export function usePackageData(name: string) {
  const [data, setData] = useState<PackageDataLoaderData>({ name });

  useEffect(() => {
    const eventSource = new EventSource(`/sse/package?name=${name}`);
    eventSource.addEventListener('packageData', handler);

    setData({ name });

    const append = combinePackageData(name);

    function handler(event: MessageEvent) {
      const newData = append(event.data || null);
      setData(newData || { name });
    }

    return () => {
      eventSource.removeEventListener('packageData', handler);
      eventSource.close();
    };
  }, [name]);

  return data;
}
