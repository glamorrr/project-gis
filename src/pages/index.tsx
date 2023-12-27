import { Page } from 'src/components/page';
import { Button, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { coffeePoints } from 'src/assets/data/kopi';
import { useRef, useState } from 'react';
const MyMap = dynamic(() => import('src/components/Map'), { ssr: false });

// ----------------------------------------------------------------------

export default function Index() {
  const theme = useTheme();
  const zoom = 13;
  const position = [-6.215105509, 106.8302911];
  const [, setMap] = useState<any>(null);
  const markerRefs = useRef([]);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Page title="Home">
      <Container maxWidth={'xl'} sx={{ pb: '24px' }}>
        <Typography variant="h3" component="h1" my="24px">
          Setiabudi Kopi
        </Typography>
        <Stack direction="row" spacing="24px">
          <Paper
            elevation={2}
            sx={{ p: 4, border: '1px solid', borderColor: theme.palette.grey[300] }}
          >
            <Stack spacing="12px">
              {coffeePoints.features.map((coffee) => {
                const onClick = () => {
                  if (selected === coffee.properties.No) return;
                  (markerRefs.current[coffee.properties.No] as any).fire('click');
                };

                return (
                  <Button
                    key={coffee.properties.No}
                    color="info"
                    variant={selected === coffee.properties.No ? 'contained' : 'outlined'}
                    onClick={onClick}
                  >
                    {coffee.properties.Nama}
                  </Button>
                );
              })}
            </Stack>
          </Paper>
          <Paper
            sx={{
              flex: '1',
              height: '600px',
              overflow: 'hidden',
              p: 4,
              border: '1px solid',
              borderColor: theme.palette.grey[300],
            }}
            elevation={2}
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
          </Paper>
        </Stack>
      </Container>
    </Page>
  );
}
