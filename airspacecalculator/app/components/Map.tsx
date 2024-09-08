'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useMemo, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useAirRights } from './AirRightsProvider';
import LocationPin from './LocationPin';

function Map() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 6,
    pitch: 40,
  });

  const { data: airRightsData } = useAirRights();

  const locationPins = useMemo(() => {
    if (airRightsData) {
      return airRightsData.nearby.map((d: any, i: number) => (
        <Marker
          key={`marker-${i}`}
          longitude={d.lon}
          latitude={d.lat}
          anchor="bottom"
        >
          <LocationPin variant="secondary" />
        </Marker>
      ));
    }
  }, [airRightsData]);

  return (
    <ReactMapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={'mapbox://styles/mapbox/streets-v12'}
    >
      {locationPins}
    </ReactMapGL>
  );
}

export default Map;
