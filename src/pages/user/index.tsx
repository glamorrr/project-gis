import { useEffect } from 'react';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

export default function UserIndex() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == '/user') {
      router.push('/user/list');
    }
  });

  return null;
}
