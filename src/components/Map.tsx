// src/components/Map.tsx
import { MapContainer, Marker, Polygon, Popup, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { coffeePoints } from 'src/assets/data/kopi';
import { setiabudiPolygons } from 'src/assets/data/setiabudi';

export default function MyMap(props: any) {
  const { position, zoom, setMap, markerRefs, onClickMarker } = props;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {coffeePoints.features.map((coffee) => {
        return (
          <CoffeeMarker
            onClickMarker={onClickMarker}
            markerRefs={markerRefs}
            key={coffee.properties.No}
            coffee={coffee}
          />
        );
      })}

      <GeoJSON data={setiabudiPolygons as any} />
    </MapContainer>
  );
}

const CoffeeMarker = ({ coffee, markerRefs, onClickMarker }: any) => {
  const map = useMap();

  return (
    <Marker
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
      <Popup>{coffee.properties.Nama}</Popup>
    </Marker>
  );
};
