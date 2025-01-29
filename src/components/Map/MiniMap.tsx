import { useMemo, useCallback, useState } from "react";

import {
  LeafletContextInterface,
  useEventHandlers,
  useLeafletContext,
} from "@react-leaflet/core";
import { LatLng, Map } from "leaflet";
import {
  useMap,
  MapContainer,
  TileLayer,
  Rectangle,
  useMapEvent,
} from "react-leaflet";

function MinimapBounds({
  parentMap,
  zoom,
  context,
}: {
  parentMap: Map;
  zoom: number;
  context: LeafletContextInterface;
}) {
  const minimap = useMap();
  // Clicking a point on the minimap sets the parent's map center
  const onClick = useCallback(
    (e: { latlng: LatLng }) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  // Keep track of bounds in state to trigger renders
  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    // Update the minimap's view to match the parent map's center and zoom
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  // Listen to events on the parent map
  const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), []);
  useEventHandlers({ instance: parentMap, context }, handlers);

  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} />;
}

export function MinimapControl({ zoom }: { zoom?: number }) {
  const parentMap = useMap();
  const mapZoom = zoom || 0;
  const context = useLeafletContext();

  const minimap = useMemo(
    () => (
      <MapContainer
        style={{ height: 160, width: 160 }}
        center={parentMap.getCenter()}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} context={context} />
      </MapContainer>
    ),
    []
  );

  return (
    <div className="leaflet-bottom leaflet-left pb-10">
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
}
