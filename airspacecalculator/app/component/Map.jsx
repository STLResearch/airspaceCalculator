"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";

const Map = ({ coordinates, apidata, loading }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <ReactMapGL
      initialViewState={{
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      longitude={coordinates.length > 0 ? coordinates[0].longitude : -100}
      latitude={coordinates.length > 0 ? coordinates[0].latitude : 40}
      zoom={coordinates.length > 0 ? 11 : 4}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      width="100%"
      heigth="100%"
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
    >
      {coordinates.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin size={30} />
        </Marker>
      ))}

      {coordinates.length > 0 && popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>{popupInfo.placeName}</div>
          <br />

          <div>
            The Air Rights price is estimated to be{" "}
            <span className="font-bold">${apidata.estPrice}</span>. You can
            expect to make{" "}
            <span className="font-bold">${apidata.estPriceAnnual}</span> in
            passive income annually.
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
