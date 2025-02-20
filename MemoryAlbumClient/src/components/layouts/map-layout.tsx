import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { BASEMAP } from "@deck.gl/carto";
import DeckGL, { IconLayer } from "deck.gl";
import { MapView } from "@deck.gl/core";

type BartStation = {
  name: string;
  entries: number;
  exits: number;
  coordinates: [longitude: number, latitude: number];
};

export default function MapLayout() {
  const layer = new IconLayer<BartStation>({
    id: "IconLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",
    getColor: (d: BartStation) => [Math.sqrt(d.exits), 140, 0],
    getIcon: () => "marker",
    getPosition: (d: BartStation) => d.coordinates,
    getSize: 40,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
    pickable: true,
  });

  return (
    <DeckGL
      // Add initial view state and controller here instead of in Map component for interactivity
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      controller={{ inertia: 500 }}
      layers={[layer]}
    >
      {/* See https://github.com/visgl/deck.gl/issues/7304#issuecomment-1277850750) */}
      {/* @ts-expect-error: cannot be used as JSX component */}
      <MapView>
        <Map mapStyle={BASEMAP.VOYAGER} />
      </MapView>
    </DeckGL>
  );
}
