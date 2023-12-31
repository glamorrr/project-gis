import { Page } from 'src/components/page';
import { Container, Grid, Paper, Stack, Typography, useTheme, Box } from '@mui/material';
import ResponsiveAppBar from 'src/components/Appbar';
import NextLink from 'next/link';
import Footer from 'src/components/Footer';

// ----------------------------------------------------------------------

const recipes = [
  {
    name: '9 Resep Es Kopi Kekinian yang Mudah Dibuat di Rumah',
    href: 'https://katadata.co.id/agung/lifestyle/6459d47cc13b2/9-resep-es-kopi-kekinian-yang-mudah-dibuat-di-rumah',
    img: '/assets/recipes/1.jpg',
    from: 'katadata.co.id',
  },
  {
    name: '12 Resep Minuman Kopi Kekinian yang Bisa Dicoba di Rumah',
    href: 'https://www.merdeka.com/gaya/resep-kopi-kekinian-kln.html',
    img: '/assets/recipes/2.jpg',
    from: 'merdeka.com',
  },
  {
    name: '10 Resep Kopi Kekinian yang Enak & Simple, Bisa Coba di Rumah',
    href: 'https://www.sehataqua.co.id/resep-kopi-kekinian/',
    img: '/assets/recipes/3.png',
    from: 'sehataqua.co.id',
  },
  {
    name: '11 Resep Minuman Kopi Ala Kafe, Enak, dan Mudah Dibuat',
    href: 'https://www.briliofood.net/resep/11-resep-minuman-kopi-ala-kafe-enak-mudah-dibuat-2004104.html',
    img: '/assets/recipes/4.png',
    from: 'briliofood.net',
  },
  {
    name: '5 Resep Es Kopi yang Enak dan Segar Cocok Jadi Teman Kerja',
    href: 'https://www.fimela.com/food/read/5007704/5-resep-es-kopi-yang-enak-dan-segar-cocok-jadi-teman-kerja',
    img: '/assets/recipes/5.png',
    from: 'fimela.com',
  },
  {
    name: 'Cara Membuat Kopi Susu Seenak Buatan Café',
    href: 'https://www.nescafe.com/id/artikel/cara-membuat-kopi-susu',
    img: '/assets/recipes/6.jpg',
    from: 'nescafe.com',
  },
  {
    name: 'Resep Kopi: Es Kopi Susu Aren',
    href: 'https://ottencoffee.co.id/majalah/resep-kopi-es-kopi-susu-aren',
    img: '/assets/recipes/7.jpg',
    from: 'ottencoffe.co.id',
  },
  {
    name: '9 Resep Kopi Susu Kekinian yang Praktis dan Nikmat',
    href: 'https://www.frisianflag.com/milkpedia/manfaat-minum-susu/cara-bikin-kopi-susu-ala-kafe-dengan-frisian-flag',
    img: '/assets/recipes/8.jpg',
    from: 'frisianflag.com',
  },
  {
    name: 'Resep Kopi Susu Hangat Ala Rumahan yang Nikmat',
    href: 'https://www.fimela.com/food/read/5151238/resep-kopi-susu-hangat-ala-rumahan-yang-nikmat',
    img: '/assets/recipes/9.png',
    from: 'fimela.com',
  },
  {
    name: '5 Resep Es Kopi Susu Kekinian, Bikinnya Gampang dan Lebih Murah',
    href: 'https://www.idntimes.com/food/recipe/andry-trisandy/resep-mudah-es-kopi-susu-kekinian',
    img: '/assets/recipes/10.jpg',
    from: 'idntimes.com',
  },
];

// ----------------------------------------------------------------------

export default function Recipe() {
  const theme = useTheme();

  return (
    <Page title="Resep Kopi">
      <ResponsiveAppBar />
      <Container maxWidth={'xl'} sx={{ pb: 8 }}>
        <Stack alignItems="center" mt="64px">
          <Typography color={theme.palette.text.secondary} fontWeight="bold">
            Ingin mencoba meracik sendiri?
          </Typography>
          <Typography
            fontSize="64px"
            fontWeight="bold"
            textAlign="center"
            mt={{ md: '-16px' }}
            mb={{ xs: '16px', md: '0' }}
            lineHeight={{ xs: '75px', md: '120px' }}
          >
            Resep Kopi
          </Typography>
          <Typography textAlign="center" maxWidth="600px" color={theme.palette.text.secondary}>
            Sajikan dirimu dengan lebih dari sekadar minuman. Rasakan kekayaan cita rasa dan
            kesejahteraan yang menyertai setiap tegukan. Inilah kopi yang bukan hanya minuman,
            tetapi juga cerita. 🌟 #BukanSembarangKopi
          </Typography>
          <Grid container spacing={3} justifyContent="center" maxWidth="1000px" mt="24px">
            {recipes.map((recipe) => (
              <Grid item xs={12} md={6} key={recipe.name}>
                <NextLink href={recipe.href} passHref>
                  <Paper
                    component="a"
                    target="_blank"
                    elevation={2}
                    sx={{
                      overflow: 'hidden',
                      p: 2,
                      border: '1px solid',
                      display: 'block',
                      textDecoration: 'none',
                      borderColor: theme.palette.grey[300],
                      transition: 'all 200ms',
                      '&:hover img': {
                        transform: 'scale(1.1)',
                      },
                      '&:hover': {
                        bgcolor: theme.palette.grey[100],
                        borderColor: theme.palette.grey[400],
                      },
                    }}
                  >
                    <Stack direction={{ xs: 'column', lg: 'row' }} alignItems={{ md: 'center' }}>
                      <Box p={2} bgcolor="rgb(255, 247, 237)" borderRadius="8px" flexShrink={0}>
                        <Box
                          boxShadow={theme.shadows[1]}
                          borderRadius="6px"
                          width={{ xs: '100%', lg: '100px' }}
                          height={{ xs: '100%', lg: '100px' }}
                          component="img"
                          src={recipe.img}
                          sx={{
                            objectFit: 'cover',
                            transition: 'all 200ms',
                          }}
                        />
                      </Box>
                      <Box px={3} py={2}>
                        <Typography fontWeight="bold">{recipe.name}</Typography>
                        <Typography mt="8px" color={theme.palette.text.secondary}>
                          {recipe.from}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </NextLink>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
