import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { BASEMAP } from "@deck.gl/carto";
import DeckGL from "deck.gl";
import { MapView } from "@deck.gl/core";

export default function DeckGLTest() {
  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      controller={{ inertia: 500 }}
    >
      {/* See https://github.com/visgl/deck.gl/issues/7304#issuecomment-1277850750) */}
      {/* @ts-expect-error: cannot be used as JSX component */}
      <MapView>
        <Map mapStyle={BASEMAP.VOYAGER} />
      </MapView>
    </DeckGL>
  );
}
