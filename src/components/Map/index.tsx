/* eslint-disable max-lines */
"use client";
import { useState } from "react";

import { useLeafletContext } from "@react-leaflet/core";
import { Icon, LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  GeoJSON,
  Marker,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import "leaflet/dist/leaflet.css";
import { useAppContext } from "@context/AppContext";
import { useQueryContext } from "@context/QueryContext";
import useMapData from "@hooks/useMapData";
import { useResetRightInfoBox } from "@hooks/useResetRightInfoBox";
import { IPolygon } from "@utils/types/mapData";

import { DynamicMarker } from "./DynamicMarker";
import styles from "./label.module.css";
import { MinimapControl } from "./MiniMap";
import { PopUp } from "./Popup";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MapSection() {
  const {
    mapData,
    polygonRef,
    baseMapPolygonRef,
    disabledMapRef,
    countryBorderRef,
    regionBorderRef,
    countryBorderData,
    regionBorderData,
    regionCountryBorderRef,
    regionCountryBorderData,
  } = useMapData();
  const {
    languagePoints,
    showPoints,
    showBaseMap,
    baseMapData,
    setSelectedFeature,
    selectedDisabledFeature,
    setSelectedDisabledFeature,
    selectedFeature,
    disabledMapData,
    mapRef,
    toggleClicked,
    toggleUndo,
    setToggleUndo,
    setToggleClicked,
    showCountryBorders,
    showRegionBorders,
    showClusteredPoints,
    searchedPointIndex,
    showSearchedPoint,
  } = useAppContext();

  const { resetRightInfoBox } = useResetRightInfoBox();

  const [mapDataKey, setMapDataKey] = useState(
    mapData?.map((item: IPolygon) => item?.name)
  );

  const handleFeatureClick = (event: any) => {
    const feature = event.layer.feature;
    // setSelectedFeature(selectedFeature === feature ? null : feature);
    setSelectedFeature(feature);
    setMapDataKey(feature);
    setToggleClicked(!toggleClicked);
    resetRightInfoBox();
  };
  const handleDisabledFeatureClick = (event: any) => {
    const feature = event.layer.feature;
    setSelectedDisabledFeature(feature);
    setMapDataKey(selectedDisabledFeature);
    setToggleUndo(!toggleUndo);
  };

  const LIcon = new Icon({
    iconUrl: "./iconCircle.png",
    iconSize: [10, 10],
  });

  const BIcon = new Icon({
    iconUrl: "./blueIconCircle.png",
    iconSize: [10, 10],
  });

  const { pointsInMajorLanguages } = useQueryContext();

  const selectedMinorLanguagesPoints = languagePoints?.filter((point) =>
    pointsInMajorLanguages?.includes(point.language_name)
  );

  const center = new LatLng(51.505, -0.09);
  return (
    <div className="relative z-0 h-screen w-full">
      <MapContainer
        ref={mapRef}
        dragging={true}
        attributionControl={false}
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        zoomControl={false}
        minZoom={2}
        className="relative h-full w-screen"
        maxBounds={[
          [-90, -180],
          [90, 180],
        ]}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <MinimapControl zoom={1} />
        <GeoJSON
          ref={regionBorderRef}
          data={regionBorderData as any}
          style={() =>
            showRegionBorders
              ? {
                  fillColor: "#4CC9F0",
                  fillOpacity: 0,
                  weight: 2.5,
                  // zIndex: -50,
                  color: "#4CC9F0",
                }
              : {
                  fillColor: "#777",
                  fillOpacity: 0,
                  weight: 0,
                  // zIndex: -50,
                }
          }
        />
        <GeoJSON
          ref={countryBorderRef}
          data={countryBorderData as any}
          style={() =>
            showCountryBorders
              ? {
                  fillColor: "#222222",
                  fillOpacity: 0,
                  weight: 2.5,
                  zIndex: -50,
                  color: "#222222",
                }
              : {
                  fillColor: "#777",
                  fillOpacity: 0,
                  weight: 0,
                  zIndex: -50,
                }
          }
        />
        {/* </Pane>
        <Pane name="regionCountryOuline" style={{ zIndex: 400 }}> */}
        <GeoJSON
          ref={regionCountryBorderRef}
          data={regionCountryBorderData as any}
          style={() =>
            showRegionBorders
              ? {
                  fillColor: "#222222",
                  fillOpacity: 0,
                  weight: 2,
                  zIndex: -50,
                  color: "#222222",
                }
              : {
                  fillColor: "#777",
                  fillOpacity: 0,
                  weight: 0,
                  zIndex: -50,
                }
          }
        />
        {/* </Pane>
        <Pane name="mapLayer" style={{ zIndex: 300 }}> */}
        <GeoJSON
          key={mapDataKey}
          eventHandlers={{ click: handleFeatureClick }}
          ref={polygonRef}
          data={mapData as any}
          style={(feature) => ({
            fillColor: classNames(
              feature?.properties.resource_level === "4"
                ? "url(#Level4-grad)"
                : "",
              feature?.properties.resource_level === "2"
                ? "url(#Level2-grad)"
                : "",
              feature?.properties.resource_level === "3"
                ? "url(#Level3-grad)"
                : "",
              feature?.properties.resource_level === "1"
                ? "url(#Level1-grad)"
                : "",
              feature?.properties.resource_level === "0"
                ? "url(#Level0-grad)"
                : ""
            ),
            fillOpacity: selectedFeature === feature ? 0.5 : 1,
            weight: 0,
            zIndex: 10,
          })}
        >
          <svg>
            <defs>
              <radialGradient
                id="Level2-grad"
                r="50%"
                fx="50%"
                fy="50%"
                gradientTransform="translate(0, 0)"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(76, 201, 240, 0.2)"
                  stopOpacity="0.50"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(76, 201, 240, 0.75)"
                  stopOpacity="0.90"
                />
              </radialGradient>
              <radialGradient
                id="Level4-grad"
                r="50%"
                fx="50%"
                fy="50%"
                gradientTransform="translate(0, 0)"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(106, 0, 255, 0.2)"
                  stopOpacity="0.50"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(106, 0, 255, 0.75)"
                  stopOpacity="0.90"
                />
              </radialGradient>
              <radialGradient
                id="Level3-grad"
                r="50%"
                fx="50%"
                fy="50%"
                gradientTransform="translate(0, 0)"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(7, 244, 158, 0.2)"
                  stopOpacity="0.50"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(7, 244, 158, 0.75)"
                  stopOpacity="0.90"
                />
              </radialGradient>
              <radialGradient
                id="Level1-grad"
                r="50%"
                fx="50%"
                fy="50%"
                gradientTransform="translate(0, 0)"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(247, 37, 133, 0.2)"
                  stopOpacity="0.50"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(247, 37, 133, 0.75)"
                  stopOpacity="0.90"
                />
              </radialGradient>
              <radialGradient
                id="Level0-grad"
                r="50%"
                fx="50%"
                fy="50%"
                gradientTransform="translate(0, 0)"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255, 102, 36, 0.2)"
                  stopOpacity="0.50"
                />
                <stop
                  offset="100%"
                  stopColor="rgba(255, 102, 36, 0.75)"
                  stopOpacity="0.90"
                />
              </radialGradient>
            </defs>
          </svg>
        </GeoJSON>
        <GeoJSON
          ref={baseMapPolygonRef}
          data={baseMapData as any}
          style={() =>
            showBaseMap
              ? {
                  fillColor: "#777",
                  fillOpacity: 0.7,
                  weight: 1.5,
                  zIndex: -10,
                  color: "#a6a6a6",
                }
              : {
                  fillColor: "#777",
                  fillOpacity: 0,
                  weight: 0,
                  zIndex: -10,
                }
          }
        />
        {disabledMapData.length != 0 && (
          <GeoJSON
            eventHandlers={{ click: handleDisabledFeatureClick }}
            ref={disabledMapRef}
            data={disabledMapData as any}
            onEachFeature={(feature, layer) => {
              const language = feature.properties.language;

              layer.bindTooltip(language, {
                permanent: true,
                direction: "center",
                className: styles.clickedLabel,
              });
            }}
            style={() => ({
              fillColor: "#ffffff",
              fillOpacity: 0,
              weight: 1.5,
              zIndex: -10,
              color: "transparent",
            })}
          />
        )}

        {showSearchedPoint &&
          searchedPointIndex &&
          languagePoints?.map(
            (point, key) =>
              point.latitude &&
              point.longitude &&
              key === searchedPointIndex && (
                <DynamicMarker
                  index={key}
                  focusIndex={searchedPointIndex}
                  key={key}
                  point={point}
                  selectedMinorLanguagesPoints={selectedMinorLanguagesPoints}
                  LIcon={LIcon}
                  BIcon={BIcon}
                />
              )
          )}
        {showPoints && showClusteredPoints && (
          <MarkerClusterGroup>
            {languagePoints?.map(
              (point, key) =>
                point.latitude &&
                point.longitude && (
                  <Marker
                    key={key}
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
                )
            )}
          </MarkerClusterGroup>
        )}
        {showPoints &&
          !showClusteredPoints &&
          languagePoints?.map(
            (point, key) =>
              point.latitude &&
              point.longitude && (
                <Marker
                  key={key}
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
              )
          )}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}
