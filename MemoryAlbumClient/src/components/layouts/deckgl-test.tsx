import { DeckGL } from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { BASEMAP } from "@deck.gl/carto";
import "maplibre-gl/dist/maplibre-gl.css";

export default function DeckGLTest() {
  return (
    <DeckGL
    // initialViewState={INITIAL_VIEW_STATE}
    // controller={true}
    // layers={layers}
    >
      <StaticMap reuseMaps mapStyle={BASEMAP.POSITRON} />
    </DeckGL>
  );
}
