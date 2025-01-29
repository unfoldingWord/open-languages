import { Dispatch, SetStateAction } from "react";

import { Point } from "./points";

export interface IRegion {
  region: string;
  country?: ICountry[] | null;
  border_polygon?: IPolygon[];
}
export interface ICountry {
  country: string;
  major_languages: ILanguage[];
  border_polygon?: IPolygon[];
  latitude?: number;
  longitude?: number;
}
export interface ILanguage {
  country: { country: string };
  id: string;
  language: string;
  iso: string;
  resource_level: string;
  polygon: IPolygon;
}
export interface IPolygon {
  crs: ICrs;
  name: string;
  type: string;
  features: IFeatures[];
  region_name: string;
}
export interface ICrs {
  type: string;
  properties: IProperties;
}
export interface IProperties {
  name: string;
}
export interface IFeatures {
  type: string;
  geometry: IGeometry;
  properties: IFeatureProperties;
}
export interface IGeometry {
  type: string;
  coordinates?: (((number[] | null)[] | null)[] | null)[] | null;
}
export interface IFeatureProperties {
  fid: number;
  iso: string;
  language: string;
  "Resource Level": string;
}

export interface IRegionPoint {
  region: string;
  latitude: number;
  longitude: number;
}
[];

export interface ContextType {
  filteredCountries: ICountry[];
  setFilteredCountries: Dispatch<SetStateAction<ICountry[]>>;
  selectedRegion: IRegion;
  setSelectedRegion: Dispatch<SetStateAction<IRegion>>;
  selectedLanguage: ILanguage | undefined;
  setSelectedLanguage: Dispatch<SetStateAction<ILanguage | undefined>>;
  selectedLanguages: ILanguage[] | undefined;
  setSelectedLanguages: Dispatch<SetStateAction<ILanguage[] | undefined>>;
  selectedResourceLevel: any;
  setSelectedResourceLevel: Dispatch<SetStateAction<any>>;
  languages: ILanguage[];
  setLanguages: Dispatch<SetStateAction<ILanguage[]>>;
  languageData: IRegion[] | undefined;
  setLanguageData: Dispatch<SetStateAction<IRegion[] | undefined>>;
  filteredLanguages: ILanguage[];
  setFilteredLanguages: Dispatch<SetStateAction<ILanguage[]>>;
  languagesArray: ILanguage[];
  setLanguagesArray: Dispatch<SetStateAction<ILanguage[]>>;
  languagePoints: Point[];
  setlanguagePoints: Dispatch<SetStateAction<Point[]>>;
  showPoints: boolean;
  setShowPoints: Dispatch<SetStateAction<boolean>>;
  showBaseMap: boolean;
  setShowBaseMap: Dispatch<SetStateAction<boolean>>;
  baseMapData: IPolygon[];
  setBaseMapData: Dispatch<SetStateAction<IPolygon[]>>;
  minorLanguage: string;
  setMinorLanguage: Dispatch<SetStateAction<string>>;
  selectedFeature: any;
  setSelectedFeature: any;
  polygonObj: any;
  foundRegion: IRegionPoint | undefined;
  setFoundRegion: Dispatch<SetStateAction<IRegionPoint | undefined>>;
  languageArrayToMap: ILanguage[];
  setLanguageArrayToMap: Dispatch<SetStateAction<ILanguage[]>>;
  selectedRegionArray: IRegion[];
  setSelectedRegionArray: Dispatch<SetStateAction<IRegion[]>>;
  selectedCountryArray: ICountry[];
  setSelectedCountryArray: Dispatch<SetStateAction<ICountry[]>>;
  selectedLanguageArray: ILanguage[];
  setSelectedLanguageArray: Dispatch<SetStateAction<ILanguage[]>>;
  languagesFromRegion: ILanguage[];
  languagesFromCountry: ILanguage[];
  languagesFromLanguage: ILanguage[];
  setLanguagesFromRegion: Dispatch<SetStateAction<ILanguage[]>>;
  setLanguagesFromCountry: Dispatch<SetStateAction<ILanguage[]>>;
  setLanguagesFromLanguage: Dispatch<SetStateAction<ILanguage[]>>;
  languageState: ILanguage[];
  setLanguageState: Dispatch<SetStateAction<ILanguage[]>>;
  disabledMapData: IPolygon[];
  setDisabledMapData: Dispatch<SetStateAction<IPolygon[]>>;
  selectedDisabledFeature: any;
  setSelectedDisabledFeature: any;
  mapRef: any;
  pointFilterCountries: ICountry[];
  setPointLFilterCountries: Dispatch<SetStateAction<ICountry[]>>;
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  toggleClicked: boolean;
  setToggleClicked: Dispatch<SetStateAction<boolean>>;
  toggleUndo: boolean;
  setToggleUndo: Dispatch<SetStateAction<boolean>>;
  countryBorders: ICountry[];
  setCountryBorders: Dispatch<SetStateAction<ICountry[]>>;
  showCountryBorders: boolean;
  setShowCountryBorders: Dispatch<SetStateAction<boolean>>;
  countryDisabled: boolean;
  setCountryDisabled: Dispatch<SetStateAction<boolean>>;
  regionDisabled: boolean;
  setRegionDisabled: Dispatch<SetStateAction<boolean>>;
  languageDisabled: boolean;
  setLanguageDisabled: Dispatch<SetStateAction<boolean>>;
  regionBorders: IPolygon[];
  setRegionBorders: Dispatch<SetStateAction<IPolygon[]>>;
  showRegionBorders: boolean;
  setShowRegionBorders: Dispatch<SetStateAction<boolean>>;
  deselectedCountries: ICountry[];
  setDeselectedCountries: Dispatch<SetStateAction<ICountry[]>>;
  regionCountryWiseBorderData: any[];
  setRegionCountryWiseBorderData: Dispatch<SetStateAction<any[]>>;
  showClusteredPoints: boolean;
  setShowClusteredPoints: Dispatch<SetStateAction<boolean>>;
  clippingDisabled: boolean;
  setClippingDisabled: Dispatch<SetStateAction<boolean>>;
  singleRegionSelection: IRegion | undefined;
  setSingleRegionSelection: Dispatch<SetStateAction<IRegion | undefined>>;
  loadingBarProgress: number;
  setLoadingBarProgress: Dispatch<SetStateAction<number>>;
  initialLoading: boolean;
  setInitialLoading: Dispatch<SetStateAction<boolean>>;
  previousSelectedLanguages: ILanguage[];
  setPreviousSelectedLanguages: Dispatch<SetStateAction<ILanguage[]>>;
  searchedPointIndex: number | undefined;
  setSearchedPointIndex: Dispatch<SetStateAction<number | undefined>>;
  searchedPoint: Point | undefined;
  setSearchedPoint: Dispatch<SetStateAction<Point | undefined>>;
  showSearchedPoint: boolean;
  setShowSearchedPoint: Dispatch<SetStateAction<boolean>>;
}
