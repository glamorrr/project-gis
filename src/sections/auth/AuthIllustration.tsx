import { Box, useTheme } from '@mui/material';
import NextImage from 'next/image';

// ----------------------------------------------------------------------

export default function AuthIllustration() {
  const theme = useTheme();

  return (
    <Box
      minHeight="100vh"
      flex="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.grey[200]}
    >
      <Box width="200px" height="200px" overflow="hidden" position="relative">
        <NextImage
          src="/assets/logo-kelartech.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
          priority
        />
      </Box>
    </Box>
  );
}
