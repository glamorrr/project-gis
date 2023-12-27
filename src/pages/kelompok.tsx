import { Page } from 'src/components/page';
import { Container, Grid, Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import ResponsiveAppBar from 'src/components/Appbar';
import Footer from 'src/components/Footer';

// ----------------------------------------------------------------------

const people = [
  {
    name: 'Dwi Oktaviyani Arifin',
    nim: '11200930000036',
    img: '/assets/images/hero.png',
  },
  {
    name: 'Nawroh Diyaanah M.',
    nim: '11200930000054',
    img: '/assets/images/hero.png',
  },
  {
    name: 'Toni Anugrah',
    nim: '11200930000059',
    img: '/assets/images/toni.jpeg',
  },
];

export default function Kelompok() {
  const theme = useTheme();

  return (
    <Page title="Kelompok">
      <ResponsiveAppBar />
      <Container maxWidth={'xl'} sx={{ pb: 8 }}>
        <Stack alignItems="center" mt="64px">
          <Typography color={theme.palette.text.secondary} fontWeight="bold">
            Situs web ini diracik oleh
          </Typography>
          <Typography fontSize="64px" fontWeight="bold" mt="-12px">
            Anggota
          </Typography>
          <Grid container spacing={4} justifyContent="center" maxWidth="1000px" mt="4px">
            <Grid item xs={12} lg={4} />
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography textAlign="center" fontSize="18px" fontWeight="bold">
                  Kelas
                </Typography>
                <Typography textAlign="center" fontSize="20px" color={theme.palette.text.secondary}>
                  7B Sistem Informasi
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4} />
            {people.map(({ name, nim, img }) => (
              <Grid item xs={12} lg={4} key={nim}>
                <Paper elevation={2} sx={{ overflow: 'hidden' }}>
                  <Box p={3} bgcolor="#ecfdf5">
                    <Box
                      boxShadow={theme.shadows[1]}
                      borderRadius="6px"
                      width="100%"
                      height="250px"
                      mx="auto"
                      component="img"
                      src={img}
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
                    <Typography textAlign="center" fontSize="18px" fontWeight="bold">
                      {name}
                    </Typography>
                    <Typography textAlign="center" color={theme.palette.text.secondary} mt="4px">
                      {nim}
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
