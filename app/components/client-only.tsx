import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

export function ClientOnly({ children }: { children?: ReactNode }) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
