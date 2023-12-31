import { Page } from 'src/components/page';
import { Container, Grid, Paper, Stack, Typography, useTheme, Box, Divider } from '@mui/material';
import ResponsiveAppBar from 'src/components/Appbar';
import Footer from 'src/components/Footer';

// ----------------------------------------------------------------------

const people = [
  {
    name: 'Dwi Oktaviyani Arifin',
    nim: '11200930000036',
    img: '/assets/images/dwi.jpg',
  },
  {
    name: 'Nawroh Diyaanah M.',
    nim: '11200930000054',
    img: '/assets/images/nawroh.jpg',
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
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography textAlign="center" fontWeight="bold">
                    Mata Kuliah
                  </Typography>
                  <Typography textAlign="center" color={theme.palette.text.secondary}>
                    Aplikasi SIG
                  </Typography>
                  <Typography textAlign="center" fontWeight="bold" mt="12px">
                    Dosen
                  </Typography>
                  <Typography textAlign="center" color={theme.palette.text.secondary}>
                    Eva Khudzaeva, M.Si
                  </Typography>
                </Box>
                <Divider />
                <Box p={2}>
                  <Typography textAlign="center" fontWeight="bold">
                    Kelas
                  </Typography>
                  <Typography textAlign="center" color={theme.palette.text.secondary}>
                    7B Sistem Informasi
                  </Typography>
                  <Typography textAlign="center" fontWeight="bold" mt="12px">
                    Kelompok
                  </Typography>
                  <Typography textAlign="center" color={theme.palette.text.secondary}>
                    7
                  </Typography>
                </Box>
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
