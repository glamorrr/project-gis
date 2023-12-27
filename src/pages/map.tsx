import { Page } from 'src/components/page';
import {
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { coffeePoints } from 'src/assets/data/kopi';
import { useRef, useState } from 'react';
import Iconify from 'src/components/iconify';
import Masonry from '@mui/lab/Masonry';
import FuzzySearch from 'fuzzy-search';
import ResponsiveAppBar from 'src/components/Appbar';
import Footer from 'src/components/Footer';
const MyMap = dynamic(() => import('src/components/Map'), {
  loading: () => (
    <Stack height="100%" alignItems="center" justifyContent="Center">
      <CircularProgress color="secondary" />
    </Stack>
  ),
  ssr: false,
});

// ----------------------------------------------------------------------

export default function MapPage() {
  const theme = useTheme();
  const zoom = 13;
  const position = [-6.215105509, 106.8302911];
  const [, setMap] = useState<any>(null);
  const markerRefs = useRef([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [filterName, setFilterName] = useState('');
  const searcher = new FuzzySearch(coffeePoints.features, ['properties.Nama'], {
    caseSensitive: false,
  });
  const filtered = searcher.search(filterName);
  const coffee = selected
    ? coffeePoints.features.find((coffee) => coffee.properties.No === selected)
    : null;

  return (
    <Page title="Map">
      <ResponsiveAppBar />
      <Container maxWidth={'xl'} sx={{ pb: 4 }}>
        <Typography variant="h2" component="h1" mt="48px" mb="32px" id="pageTitle">
          Jelajahi Kafe di Setiabudi, Jakarta Selatan
        </Typography>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing="12px">
          <Box width={{ lg: '420px' }}>
            <Paper elevation={1}>
              <TextField
                fullWidth
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Search"
                size="small"
                sx={{ minWidth: '250px' }}
                InputProps={{
                  sx: {
                    bgcolor: 'white',
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify
                        icon={'eva:search-fill'}
                        sx={{ color: 'text.disabled', width: 16, height: 16 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
            <Paper
              elevation={2}
              sx={{
                mt: '12px',
                p: 0,
                border: '1px solid',
                borderColor: theme.palette.grey[300],
                overflowY: 'auto',
              }}
            >
              {filtered.map((coffee, i, arr) => {
                const onClick = () => {
                  (markerRefs.current[coffee.properties.No] as any).fire('click');
                  document.getElementById('pageTitle')?.scrollIntoView();
                };
                return (
                  <Stack
                    key={coffee.properties.No}
                    direction="row"
                    spacing="12px"
                    borderBottom={i < arr.length - 1 ? '1px solid' : 'none'}
                    p="16px"
                    borderColor={theme.palette.grey[300]}
                    bgcolor={selected === coffee.properties.No ? theme.palette.grey[300] : 'white'}
                    onClick={onClick}
                    sx={{
                      transition: 'all 200ms',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor:
                          selected === coffee.properties.No
                            ? theme.palette.grey[300]
                            : theme.palette.grey[200],
                      },
                    }}
                  >
                    <Box
                      width="80px"
                      height="80px"
                      component="img"
                      flexShrink={0}
                      src={coffee.properties.Gambar?.[0]}
                      borderRadius="8px"
                      border="1px solid"
                      borderColor={theme.palette.grey[300]}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Box py="8px">
                      <Typography fontWeight="bold">{coffee.properties.Nama}</Typography>
                      <Stack direction="row" spacing="4px" mt="4px">
                        <Typography color={theme.palette.text.secondary} fontSize="14px">
                          {coffee.properties.Rating.value}
                        </Typography>
                        <Box mt="4px">
                          <Rating
                            size="small"
                            name="read-only"
                            precision={0.5}
                            value={coffee.properties.Rating.value}
                            readOnly
                          />
                        </Box>
                        <Typography color={theme.palette.text.secondary} fontSize="14px">
                          ({coffee.properties.Rating.count})
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })}
            </Paper>
          </Box>
          <Box flex="1">
            <Paper
              sx={{
                height: '600px',
                overflow: 'hidden',
                p: 2,
                border: '1px solid',
                borderColor: theme.palette.grey[300],
              }}
              elevation={2}
            >
              <Box
                height="100%"
                borderRadius="4px"
                overflow="hidden"
                border="1px solid"
                borderColor={theme.palette.grey[300]}
              >
                <MyMap
                  markerRefs={markerRefs}
                  onClickMarker={(id: any) => {
                    setSelected(id);
                  }}
                  setMap={setMap}
                  position={position}
                  zoom={zoom}
                />
              </Box>
            </Paper>
            {coffee && (
              <Stack
                direction={{ xs: 'column', lg: 'row' }}
                spacing="12px"
                mt="12px"
                id="coffeeDetail"
              >
                <Paper
                  sx={{
                    overflow: 'hidden',
                    maxWidth: { lg: '400px' },
                    border: '1px solid',
                    height: 'max-content',
                    borderColor: theme.palette.grey[300],
                  }}
                  elevation={2}
                >
                  <Box bgcolor={theme.palette.grey[200]} py={3} px={4}>
                    <Typography variant="h4" component="h2">
                      {coffee.properties.Nama}
                    </Typography>
                    <Stack direction="row" spacing="4px" mt="6px">
                      <Typography color={theme.palette.text.secondary} fontSize="14px">
                        {coffee.properties.Rating.value}
                      </Typography>
                      <Box mt="4px">
                        <Rating
                          size="small"
                          name="read-only"
                          precision={0.5}
                          value={coffee.properties.Rating.value}
                          readOnly
                        />
                      </Box>
                      <Typography color={theme.palette.text.secondary} fontSize="14px">
                        ({coffee.properties.Rating.count})
                      </Typography>
                    </Stack>
                  </Box>
                  <Stack spacing="16px" p={4}>
                    <Stack direction="row" spacing="8px">
                      <Box>
                        <Iconify
                          icon="ic:baseline-location-on"
                          width="24px"
                          height="24px"
                          color={theme.palette.grey[500]}
                        />
                      </Box>
                      <Typography mt="8px">{coffee.properties.Alamat}</Typography>
                    </Stack>
                    <Stack direction="row" spacing="8px">
                      <Box>
                        <Iconify
                          icon="mdi:latitude"
                          width="24px"
                          height="24px"
                          color={theme.palette.grey[500]}
                        />
                      </Box>
                      <Typography mt="8px">{coffee.properties.Latitude} (Latitude)</Typography>
                    </Stack>
                    <Stack direction="row" spacing="8px">
                      <Box>
                        <Iconify
                          icon="mdi:longitude"
                          width="24px"
                          height="24px"
                          color={theme.palette.grey[500]}
                        />
                      </Box>
                      <Typography mt="8px">{coffee.properties.Longitude} (Longitude)</Typography>
                    </Stack>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    overflow: 'hidden',
                    border: '1px solid',
                    flex: '1',
                    borderColor: theme.palette.grey[300],
                  }}
                  elevation={2}
                >
                  <Box bgcolor={theme.palette.grey[200]} py={3} px={4}>
                    <Typography variant="h4" component="h2" textAlign="center">
                      Galeri
                    </Typography>
                  </Box>
                  <Stack p={4} alignItems="center">
                    <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={{ xs: 5, md: 3, lg: 1 }}>
                      {coffee.properties.Gambar.map((src) => (
                        <Paper elevation={2} key={src}>
                          <Box
                            component="img"
                            src={src}
                            borderRadius="8px"
                            border="1px solid"
                            borderColor={theme.palette.grey[300]}
                          />
                        </Paper>
                      ))}
                    </Masonry>
                  </Stack>
                </Paper>
              </Stack>
            )}
          </Box>
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
