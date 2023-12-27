import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, Link, BoxProps } from '@mui/material';
import NextImage from 'next/image';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="div"
        position="relative"
        sx={{
          width: 40,
          height: 40,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <NextImage
          src="/assets/logo-kelartech.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <NextLink href="/" passHref>
        <Link sx={{ display: 'contents' }}>{logo}</Link>
      </NextLink>
    );
  }
);

export default Logo;
