import * as React from "react";
import Map, { Marker } from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoibm9vZGxlcGVvcGxlIiwiYSI6ImNsYjVnMGdxNjA0dnAzb3BnZ3FkY2Vzc28ifQ.7czpNqgMmo3nEf4svBfp3A";

export default function MapWithPOI() {
  return (
    <Map
      initialViewState={{
        latitude: 53.5488,
        longitude: 9.9872,
        zoom: 10,
      }}
      style={{ width: "550px", height: "380px" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      <Marker longitude={9.9872} latitude={53.5488} color="red" />
    </Map>
  );
}
