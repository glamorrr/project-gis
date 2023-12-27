import { forwardRef, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
import Head from 'next/head';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  children: ReactNode;
  meta?: ReactNode;
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Jelajahi Kopi di Setiabudi `}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

export default Page;
