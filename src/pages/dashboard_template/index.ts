import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/dashboard_template') {
      router.push('/dashboard_template/one');
    }
  });

  return null;
}
