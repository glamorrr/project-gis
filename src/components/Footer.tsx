import { Box, Stack, Typography, useTheme, Link as MUILink } from '@mui/material';
import NextLink from 'next/link';

const pages = [
  { title: 'Home', href: '/' },
  { title: 'Map', href: '/map' },
  { title: 'Resep Kopi', href: '/resep' },
  { title: 'About', href: '/kelompok' },
];

function Footer() {
  const theme = useTheme();
  return (
    <Box
      py={4}
      mt={6}
      px="16px"
      border="1px solid"
      borderColor={theme.palette.grey[300]}
      bgcolor={theme.palette.grey[200]}
    >
      <Typography
        component="h1"
        mt="16px"
        textAlign="center"
        pt={1}
        pb={3}
        noWrap
        fontSize={{ xs: '40px', lg: '64px' }}
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        SetiaKopi
      </Typography>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: '16px', lg: '48px' }}
        mb={8}
      >
        {pages.map((page) => (
          <NextLink passHref href={page.href} key={page.title}>
            <MUILink color={theme.palette.text.secondary}>{page.title}</MUILink>
          </NextLink>
        ))}
      </Stack>
      <Typography
        textAlign="center"
        fontSize="14px"
        lineHeight="24px"
        color={theme.palette.text.secondary}
      >
        SetiaKopi © 2024. Dibuat untuk memenuhi tugas akhir.
        <br /> Made with ❤ by Dwi, Nawroh, and Toni.
      </Typography>
    </Box>
  );
}
export default Footer;
