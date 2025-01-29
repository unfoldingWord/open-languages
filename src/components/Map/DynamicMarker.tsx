import { useEffect, useRef } from "react";

import { Icon } from "leaflet";
import { type Marker as MarkerType } from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { Point } from "@utils/types/points";

import { PopUp } from "./Popup";

export const DynamicMarker = ({
  index,
  focusIndex,
  point,
  selectedMinorLanguagesPoints,
  LIcon,
  BIcon,
}: {
  index: number;
  focusIndex: number | undefined;
  point: Point;
  selectedMinorLanguagesPoints: Point[];
  LIcon: Icon;
  BIcon: Icon;
}) => {
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (index === focusIndex) {
      const marker = markerRef.current;
      if (marker) {
        marker.openPopup();
      }
    }
  }, [focusIndex]);

  return (
    <Marker
      ref={markerRef}
      position={[point.latitude, point.longitude]}
      icon={
        selectedMinorLanguagesPoints.some(
          (selectedPoint) =>
            selectedPoint.latitude === point.latitude &&
            selectedPoint.longitude === point.longitude
        )
          ? BIcon // Use BIcon for selected minor languages
          : LIcon // Use LIcon for others
      }
    >
      <PopUp point={point} />
    </Marker>
  );
};
