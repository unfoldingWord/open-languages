import { useState, useEffect, useRef } from "react";

import { IPolygon } from "@utils/types/mapData";

import { useAppContext } from "./useLanguages";

const useMapData = () => {
  const {
    languageArrayToMap,
    languagesArray,
    baseMapData,
    languageState,
    selectedFeature,
    setLanguageArrayToMap,
    setDisabledMapData,
    disabledMapData,
    selectedDisabledFeature,
    selectedRegionArray,
    selectedCountryArray,
    toggleClicked,
    toggleUndo,
    countryBorders,
    regionBorders,
    showCountryBorders,
    showRegionBorders,
    regionCountryWiseBorderData,
    filteredCountries,
    languageData,
    mapRef,
  } = useAppContext();

  const [mapData, setMapData] = useState<any>();
  const polygonRef = useRef<any>();
  const baseMapPolygonRef = useRef<any>();
  const disabledMapRef = useRef<any>();
  const countryBorderRef = useRef<any>();
  const regionBorderRef = useRef<any>();
  const regionCountryBorderRef = useRef<any>();
  const [disabledMapArray, setDisabledMapArray] = useState<any[]>();
  const [countryBorderData, setCountryBorderData] = useState<any[]>();
  const [regionBorderData, setRegionBorderData] = useState<any[]>();
  const [regionCountryBorderData, setRegionCountryBorderData] = useState<any>();

  useEffect(() => {
    const mapArray: any = [];
    languageArrayToMap.forEach((language) => {
      const matchingLanguage = languagesArray.find(
        (langData) => langData.id === language.id
      );
      if (matchingLanguage) {
        if (!mapArray.some((item: any) => item === language.polygon)) {
          mapArray.push(matchingLanguage.polygon);
        }
        language.polygon = matchingLanguage.polygon;
      }
    });

    setMapData(mapArray);
  }, [languageArrayToMap]);

  useEffect(() => {
    const disabledMapArray: any = [];
    const clickedLanguage = selectedFeature?.properties.fid
      ? languageArrayToMap.filter((language) => {
          const matchingFeature = language.polygon.features?.find(
            (feature) =>
              feature.properties.fid === selectedFeature?.properties.fid
          );
          return matchingFeature !== undefined;
        })
      : [];
    if (clickedLanguage.length > 0) {
      const updatedLanguages = languageArrayToMap.filter(
        (language) => language.id !== clickedLanguage[0].id
      );
      setLanguageArrayToMap(updatedLanguages);

      clickedLanguage?.map((language: any) => {
        disabledMapArray.push(language.polygon);
      });
      setDisabledMapData([...disabledMapData, ...disabledMapArray]);
    } else {
      setLanguageArrayToMap(languageState);
    }
  }, [selectedFeature, toggleClicked]);

  useEffect(() => {
    const returningFeature = languageState.filter((language) => {
      const matchingFeature = language.polygon.features?.find(
        (feature) =>
          feature.properties.fid === selectedDisabledFeature?.properties.fid
      );
      return matchingFeature !== undefined;
    });
    if (returningFeature.length > 0) {
      const updatedLanguages = [...languageArrayToMap, returningFeature[0]];
      setLanguageArrayToMap(updatedLanguages);

      const updatedDisabledMapData = disabledMapData.filter(
        (language) => language !== returningFeature[0].polygon
      );
      setDisabledMapData(updatedDisabledMapData);
    }
  }, [selectedDisabledFeature, toggleUndo]);

  useEffect(() => {
    if (
      countryBorders.length != 0 &&
      showCountryBorders &&
      selectedCountryArray.length != 0
    ) {
      const tempArray = countryBorders
        .filter((border) => {
          return selectedCountryArray.some(
            (country) => border?.country === country.country
          );
        })
        .flatMap((border: any) => {
          return border.border_polygon;
        });
      const centroid = {} as any;
      countryBorders.forEach((latlong) => {
        if (
          latlong.country ==
          selectedCountryArray[selectedCountryArray.length - 1]?.country
        ) {
          centroid.latitude = latlong.latitude;
          centroid.longitude = latlong.longitude;
        }
      });
      setCountryBorderData(tempArray);
      if (countryBorderRef.current) {
        countryBorderRef.current.clearLayers();
        if (countryBorders || regionBorders) {
          countryBorderRef.current.addData(tempArray);
        }
        if (centroid.latitude && centroid.longitude)
          mapRef.current.setView([centroid?.latitude, centroid?.longitude], 4);
      }
    } else {
      setCountryBorderData([]);
      if (regionBorderRef.current) {
        regionBorderRef.current.clearLayers();
      }
    }
  }, [selectedCountryArray, showCountryBorders]);

  useEffect(() => {
    let regionBorderPolgyonArray = [];
    let regionOutlineBorder = [] as IPolygon[];
    if (
      regionCountryWiseBorderData.length != 0 &&
      filteredCountries.length != 0
    ) {
      regionBorderPolgyonArray = regionCountryWiseBorderData
        .filter((border) => {
          return filteredCountries.some(
            (country) => border?.country === country.country
          );
        })
        .flatMap((border: any) => {
          return border.border_polygon;
        });
      regionOutlineBorder = languageData
        ?.filter((region) => {
          return selectedRegionArray.some(
            (selectedRegion) => region?.region === selectedRegion.region
          );
        })
        .flatMap((border) => {
          return border.border_polygon;
        }) as IPolygon[];
    }
    if (regionOutlineBorder.length != 0 && showRegionBorders) {
      setRegionBorderData(regionOutlineBorder);
      if (regionBorderRef.current) {
        regionBorderRef.current.clearLayers();
        if (regionBorders) {
          regionBorderRef.current.addData(regionOutlineBorder);
        }
      }
    } else {
      setRegionBorderData([]);
    }

    if (regionBorderPolgyonArray.length != 0 && showRegionBorders) {
      setRegionCountryBorderData(regionBorderPolgyonArray);
      if (regionCountryBorderRef.current) {
        regionCountryBorderRef.current.clearLayers();
        if (regionBorders) {
          regionCountryBorderRef.current.addData(regionBorderPolgyonArray);
        }
      }
    } else {
      setRegionBorderData([]);
    }
  }, [selectedRegionArray, filteredCountries, showRegionBorders]);
  useEffect(() => {
    if (baseMapPolygonRef.current) {
      baseMapPolygonRef.current.clearLayers();
      if (baseMapData) {
        baseMapPolygonRef.current.addData(baseMapData);
      }
    }
  }, [baseMapData]);

  useEffect(() => {
    if (polygonRef.current) {
      polygonRef.current.clearLayers();
      if (mapData) {
        polygonRef.current.addData(mapData);
      }
    }
  }, [mapData]);

  useEffect(() => {
    if (disabledMapRef.current) {
      disabledMapRef.current.clearLayers();
      if (disabledMapData) {
        disabledMapRef.current.addData(disabledMapData);
      }
    }
  }, [disabledMapData]);

  return {
    mapData,
    setMapData,
    polygonRef,
    baseMapPolygonRef,
    disabledMapRef,
    countryBorderRef,
    regionBorderRef,
    countryBorderData,
    regionBorderData,
    regionCountryBorderRef,
    regionCountryBorderData,
  };
};

export default useMapData;
