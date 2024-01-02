// src/components/Map.tsx
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  GeoJSON,
  useMap,
  LayersControl,
  useMapEvent,
  Rectangle,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { coffeePoints } from 'src/assets/data/kopi';
import { setiabudiPolygons } from 'src/assets/data/setiabudi';
import { Box, useTheme, Link as MUILink } from '@mui/material';
import { jakselPolygons } from 'src/assets/data/jaksel';
import { jakselLines } from 'src/assets/data/jakseljalan';
import { useCallback, useMemo, useState } from 'react';
import { useEventHandlers } from '@react-leaflet/core';
import Iconify from './iconify';

export default function MyMap(props: any) {
  const { position, zoom, setMap, markerRefs, onClickMarker } = props;
  const theme = useTheme();

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <MinimapControl position="bottomright" />
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Open Street Map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="GoogleSateliteHybrid">
          <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Google Maps">
          <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri World Street Map">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            minZoom={0}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri World Imagery">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            minZoom={0}
            maxZoom={20}
          />
        </LayersControl.BaseLayer>
        set
        <LayersControl.Overlay checked name="Kecamatan Setiabudi">
          <GeoJSON
            style={(feature) => {
              // dapetin setiap kelurahan di kecamatan
              const id = feature?.properties.id;

              // menentukan warna setiap kelurahan
              if (id === 1) {
                return { color: '#1E90FF' };
              }
              if (id === 2) {
                return { color: 'blue' };
              }
              if (id === 3) {
                return { color: 'red' };
              }
              if (id === 4) {
                return { color: '#2F4F4F' };
              }
              if (id === 5) {
                return { color: 'black' };
              }
              if (id === 6) {
                return { color: '#CD5C5C' };
              }
              if (id === 7) {
                return { color: '#A52A2A' };
              }
              if (id === 8) {
                return { color: '#8B0000' };
              }
              if (id === 9) {
                return { color: '#9932CC' };
              }
              if (id === 10) {
                return { color: '#BDB76B' };
              }
              if (id === 11) {
                return { color: '#8B008B' };
              }
              if (id === 12) {
                return { color: '#556B2F' };
              }
              if (id === 13) {
                return { color: '#006400' };
              }
              if (id === 14) {
                return { color: '#B8860B' };
              }
              if (id === 15) {
                return { color: '#7FFF00' };
              }

              return { color: '#5F9EA0' };
            }}
            data={setiabudiPolygons as any}
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Jakarta Selatan">
          <GeoJSON style={{ color: theme.palette.warning.dark }} data={jakselPolygons as any} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Jalanan di Jakarta Selatan">
          <GeoJSON style={{ color: theme.palette.grey[600] }} data={jakselLines as any} />
        </LayersControl.Overlay>
      </LayersControl>

      {coffeePoints.features.map((coffee) => (
        <CoffeeMarker
          onClickMarker={onClickMarker}
          markerRefs={markerRefs}
          key={coffee.properties.No}
          coffee={coffee}
        />
      ))}
    </MapContainer>
  );
}

const CoffeeMarker = ({ coffee, markerRefs, onClickMarker }: any) => {
  const map = useMap();
  const theme = useTheme();

  const customMarker = new L.Icon({
    iconUrl: '/assets/images/icon-toko.svg',
    iconRetinaUrl: '/assets/images/icon-toko.svg',
    iconSize: new L.Point(20, 20),
    // shadowSize: [50, 64], // size of the shadow
    // iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62], // the same for the shadow
    // popupAnchor: [-3, -76],
  });

  return (
    <Marker
      icon={customMarker}
      ref={(ref) => {
        markerRefs.current[coffee.properties.No] = ref;
      }}
      eventHandlers={{
        click: () => {
          map.flyTo([coffee.geometry.coordinates[1], coffee.geometry.coordinates[0]], 18);
          onClickMarker(coffee.properties.No);
        },
      }}
      position={[coffee.geometry.coordinates[1], coffee.geometry.coordinates[0]]}
    >
      <Popup>
        <Box pt="4px" />
        <Box
          width="140px"
          height="100px"
          component="img"
          src={coffee.properties.Gambar?.[0]}
          borderRadius="8px"
          border="1px solid"
          borderColor={theme.palette.grey[300]}
          mx="auto"
          mt="8px"
          sx={{ objectFit: 'cover' }}
        />
        <MUILink
          fontSize="14px"
          lineHeight="1.4"
          color={`${theme.palette.secondary.main} !important`}
          textAlign="center"
          sx={{ width: '120px', mt: '10px !important' }}
          fontWeight="bold"
          href="#coffeeDetail"
          display="block"
        >
          {coffee.properties.Nama} <Iconify icon="ic:baseline-arrow-outward" width="12px" />
        </MUILink>
      </Popup>
    </Marker>
  );
};

// Classes used by Leaflet to position controls
const POSITION_CLASSES: any = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
};

const BOUNDS_STYLE = { weight: 1 };

function MinimapBounds({ parentMap, zoom }: any) {
  const minimap = useMap();

  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: any) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent('click', onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap } as any, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
}

function MinimapControl({ position, zoom }: any) {
  const parentMap = useMap();
  const mapZoom = zoom || 9;

  // Memoize the minimap so it's not affected by position changes
  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}
