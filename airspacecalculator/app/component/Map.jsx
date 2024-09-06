"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Pin from "./Pin";

const Map = ({ coordinates }) => {
  const [popupInfo, setPopupInfo] = useState(null);

  return (
    <ReactMapGL
      initialViewState={{
        zoom: 3.5,
        bearing: 0,
        pitch: 0,
      }}
      longitude={
        coordinates && coordinates.length > 0
          ? coordinates.find((c) => c.isMain).lon
          : -100
      }
      latitude={
        coordinates && coordinates.length > 0
          ? coordinates.find((c) => c.isMain).lat
          : 40
      }
      zoom={coordinates && coordinates.length > 0 ? 13 : 4}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      width="100%"
      heigth="100%"
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
    >
      {coordinates &&
        coordinates.length > 0 &&
        coordinates.map((c, index) => {
          return (
            <Marker
              key={`marker-${index}`}
              longitude={c.lon}
              latitude={c.lat}
              anchor="bottom"
              onClick={(e) => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(c);
              }}
            >
              <Pin size={c.isMain ? 50 : 30} />
            </Marker>
          );
        })}

      {coordinates && coordinates.length > 0 && popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.lon)}
          latitude={Number(popupInfo.lat)}
          onClose={() => setPopupInfo(null)}
        >
          <br />

          <div>
            The Air Rights price of this property is estimated to be{" "}
            <span className="font-bold">
              ${Number(popupInfo.estimate.value).toFixed(2)}
            </span>{" "}
            with an annual projection of{" "}
            <span className="font-bold">
              ${Number(popupInfo.estimate.annualProjection).toFixed(2)}
            </span>{" "}
            in passive income annually.
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default Map;
