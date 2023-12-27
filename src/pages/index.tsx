import { Page } from 'src/components/page';
import { Button, Container, Grid, Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import { coffeePoints } from 'src/assets/data/kopi';
import Iconify from 'src/components/iconify';
import ResponsiveAppBar from 'src/components/Appbar';
import { useRouter } from 'next/router';
import Footer from 'src/components/Footer';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Page title="Beranda">
      <ResponsiveAppBar />
      <Container maxWidth={'xl'} sx={{ pb: 8 }}>
        <Stack alignItems="center" mt="64px">
          <Paper elevation={2} sx={{ bgcolor: theme.palette.grey[200], p: 4 }}>
            <Box
              width="140px"
              height="140px"
              component="img"
              src="/assets/images/hero.png"
              sx={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          </Paper>
          <Typography
            component="h1"
            mt="16px"
            noWrap
            fontSize="56px"
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
          <Typography
            textAlign="center"
            color={theme.palette.text.secondary}
            maxWidth="480px"
            mx="auto"
          >
            Selamat datang di SetiaKopi, panduan eksklusif untuk para pencinta kopi yang ingin
            mengeksplorasi dan menikmati kopi terbaik di kawasan Setiabudi, Jakarta Selatan.
            SetiaKopi hadir sebagai teman setia Anda dalam mencari pengalaman kopi yang tak
            terlupakan, menyajikan informasi lengkap tentang 15 toko kopi terhits di daerah ini.
          </Typography>
          <Button
            size="large"
            color="secondary"
            variant="contained"
            sx={{ mt: '32px' }}
            endIcon={<Iconify icon="ic:baseline-arrow-forward" />}
            onClick={() => router.push('/map')}
          >
            Jelajahi Sekarang
          </Button>

          <Typography color={theme.palette.text.secondary} fontWeight="bold" mt="120px">
            15 Toko Kopi Paling
          </Typography>
          <Typography fontSize="64px" fontWeight="bold" mt="-12px">
            Hits
          </Typography>
          <Typography textAlign="center" maxWidth="600px" color={theme.palette.text.secondary}>
            Di sini, kopi bukan hanya minuman, tapi petualangan rasa yang fantastis. Desain yang oke
            banget, kopi yang bikin dag dig dug, dan atmosfer yang bikin betah, semua ada di sini.
            Jadi, siap-siap merasakan kopinya yang luar biasa dan vibes yang super kece! ☕🌟
            #BukanSembarangKopi
          </Typography>
          <Grid container spacing={3} justifyContent="center" maxWidth="1000px" mt="24px">
            {coffeePoints.features.map((coffee) => (
              <Grid item xs={12} md={6} lg={4} key={coffee.properties.No}>
                <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                  <Box p={3} bgcolor="#fdf2f8">
                    <Box
                      boxShadow={theme.shadows[1]}
                      borderRadius="6px"
                      width="100%"
                      height="120px"
                      component="img"
                      src={coffee.properties.Gambar?.[0]}
                      sx={{
                        objectFit: 'cover',
                        transition: 'all 200ms',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                  </Box>
                  <Box p={2}>
                    <Typography textAlign="center" fontWeight="bold">
                      ☕ {coffee.properties.Nama}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
