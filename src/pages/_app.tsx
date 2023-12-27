// scroll bar
import 'simplebar/src/simplebar.css';

import 'leaflet/dist/leaflet.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// utils
// theme
import ThemeProvider from '../theme';
// locales
// components

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

// redux

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {getLayout(<Component {...pageProps} />)}
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
