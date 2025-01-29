"use client";

import { createContext, useContext, useRef, useState } from "react";

import { polygonData } from "@utils/data/polygonData";
import {
  ICountry,
  ILanguage,
  IRegion,
  ContextType,
  IPolygon,
  IRegionPoint,
} from "@utils/types/mapData";
import { Point } from "@utils/types/points";

export const AppContext = createContext<ContextType>({} as ContextType);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>();
  const [selectedLanguages, setSelectedLanguages] = useState<ILanguage[]>();
  const [filteredLanguages, setFilteredLanguages] = useState<ILanguage[]>([]);
  const [selectedResourceLevel, setSelectedResourceLevel] = useState<
    {
      resourceLevel: number;
      resourceName: string;
    }[]
  >([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion>({
    region: "all",
  });
  const [selectedRegionArray, setSelectedRegionArray] = useState<IRegion[]>([]);
  const [selectedCountryArray, setSelectedCountryArray] = useState<ICountry[]>(
    []
  );
  const [selectedLanguageArray, setSelectedLanguageArray] = useState<
    ILanguage[]
  >([]);
  const [languageData, setLanguageData] = useState<IRegion[]>();
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);
  const [languagesArray, setLanguagesArray] = useState<ILanguage[]>([]);
  const [languagePoints, setlanguagePoints] = useState<Point[]>([]);
  const [showPoints, setShowPoints] = useState<boolean>(false);
  const [showClusteredPoints, setShowClusteredPoints] = useState<boolean>(true);
  const [showBaseMap, setShowBaseMap] = useState<boolean>(false);
  const [baseMapData, setBaseMapData] = useState<IPolygon[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [languageArrayToMap, setLanguageArrayToMap] = useState<ILanguage[]>([]);
  const [languageState, setLanguageState] = useState<ILanguage[]>([]);
  const [disabledMapData, setDisabledMapData] = useState<IPolygon[]>([]);
  const [minorLanguage, setMinorLanguage] = useState<string>("");

  const polygonObj = polygonData.filter(
    (polygon) => polygon.iso === selectedFeature?.properties.iso
  )[0];

  const [foundRegion, setFoundRegion] = useState<IRegionPoint | undefined>();

  const [languagesFromRegion, setLanguagesFromRegion] = useState<ILanguage[]>(
    []
  );
  const [languagesFromCountry, setLanguagesFromCountry] = useState<ILanguage[]>(
    []
  );
  const [languagesFromLanguage, setLanguagesFromLanguage] = useState<
    ILanguage[]
  >([]);
  const [selectedDisabledFeature, setSelectedDisabledFeature] =
    useState<any>(null);
  const [pointFilterCountries, setPointLFilterCountries] = useState<ICountry[]>(
    []
  );
  const [countryBorders, setCountryBorders] = useState<ICountry[]>([]);
  const [showCountryBorders, setShowCountryBorders] = useState<boolean>(false);

  const [regionBorders, setRegionBorders] = useState<IPolygon[]>([]);
  const [showRegionBorders, setShowRegionBorders] = useState<boolean>(false);

  const mapRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [toggleClicked, setToggleClicked] = useState<boolean>(false);
  const [toggleUndo, setToggleUndo] = useState<boolean>(false);
  const [countryDisabled, setCountryDisabled] = useState<boolean>(false);
  const [regionDisabled, setRegionDisabled] = useState<boolean>(false);
  const [languageDisabled, setLanguageDisabled] = useState<boolean>(false);
  const [deselectedCountries, setDeselectedCountries] = useState<ICountry[]>(
    []
  );
  const [regionCountryWiseBorderData, setRegionCountryWiseBorderData] =
    useState<any>([]);
  const [clippingDisabled, setClippingDisabled] = useState<boolean>(false);
  const [singleRegionSelection, setSingleRegionSelection] = useState<
    IRegion | undefined
  >();
  const [loadingBarProgress, setLoadingBarProgress] = useState<number>(0);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [previousSelectedLanguages, setPreviousSelectedLanguages] = useState<
    ILanguage[]
  >([]);
  const [searchedPoint, setSearchedPoint] = useState<Point>();
  const [searchedPointIndex, setSearchedPointIndex] = useState<
    number | undefined
  >(undefined);
  const [showSearchedPoint, setShowSearchedPoint] = useState<boolean>(false);

  const contextValues = {
    languagePoints,
    languageData,
    languages,
    selectedLanguage,
    selectedResourceLevel,
    selectedRegion,
    filteredLanguages,
    filteredCountries,
    languagesArray,
    showPoints,
    showBaseMap,
    baseMapData,
    selectedLanguages,
    setSelectedLanguages,
    selectedFeature,
    languageArrayToMap,
    selectedRegionArray,
    selectedCountryArray,
    selectedLanguageArray,
    minorLanguage,
    setMinorLanguage,
    setSelectedLanguageArray,
    setSelectedCountryArray,
    setSelectedRegionArray,
    setLanguageArrayToMap,
    setShowPoints,
    setlanguagePoints,
    setLanguagesArray,
    setFilteredCountries,
    setFilteredLanguages,
    setLanguageData,
    setLanguages,
    setFoundRegion,
    setSelectedLanguage,
    setSelectedResourceLevel,
    setSelectedRegion,
    setShowBaseMap,
    setBaseMapData,
    setSelectedFeature,
    polygonObj,
    languagesFromRegion,
    languagesFromCountry,
    languagesFromLanguage,
    setLanguagesFromRegion,
    setLanguagesFromCountry,
    setLanguagesFromLanguage,
    languageState,
    setLanguageState,
    disabledMapData,
    setDisabledMapData,
    selectedDisabledFeature,
    setSelectedDisabledFeature,
    mapRef,
    foundRegion,
    pointFilterCountries,
    setPointLFilterCountries,
    clicked,
    setClicked,
    toggleClicked,
    setToggleClicked,
    toggleUndo,
    setToggleUndo,
    countryBorders,
    setCountryBorders,
    showCountryBorders,
    setShowCountryBorders,
    countryDisabled,
    setCountryDisabled,
    regionDisabled,
    setRegionDisabled,
    languageDisabled,
    setLanguageDisabled,
    regionBorders,
    setRegionBorders,
    showRegionBorders,
    setShowRegionBorders,
    deselectedCountries,
    setDeselectedCountries,
    //
    regionCountryWiseBorderData,
    setRegionCountryWiseBorderData,
    showClusteredPoints,
    setShowClusteredPoints,
    clippingDisabled,
    setClippingDisabled,
    singleRegionSelection,
    setSingleRegionSelection,
    loadingBarProgress,
    setLoadingBarProgress,
    initialLoading,
    setInitialLoading,
    previousSelectedLanguages,
    setPreviousSelectedLanguages,
    searchedPoint,
    setSearchedPoint,
    searchedPointIndex,
    setSearchedPointIndex,
    showSearchedPoint,
    setShowSearchedPoint,
  };
  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
}
