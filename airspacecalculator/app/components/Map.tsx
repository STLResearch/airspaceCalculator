import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useAirRights } from './AirRightsProvider';
import Card from './Card';
import LocationPin from './LocationPin';
import MapMarkerPopup from './MapMarkerPopup';

function Map() {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 6,
    pitch: 40,
  });

  const mapRef = useRef<any>(null);

  const { data: airRightsData } = useAirRights();

  const locationPins = useMemo(() => {
    if (airRightsData) {
      return [airRightsData.main, ...airRightsData.nearby].map(
        (d: any, i: number) => (
          <Marker
            key={`marker-${i}`}
            longitude={d.lon}
            latitude={d.lat}
            anchor="bottom"
          >
            <div className="relative">
              <LocationPin
                variant={d.isMain ? 'primary' : 'secondary'}
                customSize="w-10 h-10"
              />

              <Card
                paddingStyle="none"
                classNames="absolute top-0.5 left-9 rounded p-1"
              >
                <MapMarkerPopup
                  estimatedValue={d.estimate ? d.estimate.value : '0'}
                  estimatedAnnualProjection={
                    d.estimate ? d.estimate.annualProjection : '0'
                  }
                  isAverageEstimate={d.isAverage}
                />
              </Card>
            </div>
          </Marker>
        )
      );
    }
  }, [airRightsData]);

  useEffect(() => {
    if (airRightsData && mapRef.current) {
      mapRef.current.flyTo({
        center: [airRightsData.main.lon, airRightsData.main.lat],
        zoom: 14.5,
      });
    }
  }, [airRightsData]);

  return (
    <ReactMapGL
      {...viewState}
      ref={mapRef}
      onMove={(evt) => setViewState(evt.viewState)}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={'mapbox://styles/mapbox/streets-v12'}
    >
      {locationPins}
    </ReactMapGL>
  );
}

export default Map;
