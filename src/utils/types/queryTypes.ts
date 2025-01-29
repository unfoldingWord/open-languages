import { Dispatch, SetStateAction } from "react";

export interface IQueryObject {
  languageList?: string[];
  regionList?: string[];
  countryList?: string[];
  queryType: string;
  countryLangMapList?: { country: string; languages: string[] }[];
  regionLangMapList?: { region: string; languages: string[] }[];
}
export interface IAllAccessStatus {
  statusValue: string;
  count: number;
  population: number;
}

export interface QueryContextType {
  pointsQueryObject: IQueryObject;
  setPointsQueryObject: Dispatch<SetStateAction<IQueryObject>>;
  minorLanguageCount: number;
  setMinorLanguageCount: Dispatch<SetStateAction<number>>;
  population: number;
  setPopulation: Dispatch<SetStateAction<number>>;
  pointsInMajorLanguages: string[];
  setPointsInMajorLanguages: Dispatch<SetStateAction<string[]>>;
  allAccessStatuses: IAllAccessStatus[];
  setAllAccessStatuses: Dispatch<SetStateAction<IAllAccessStatus[]>>;
  queryIsLoading: boolean;
  setQueryIsLoading: Dispatch<SetStateAction<boolean>>;
  isStaleData: boolean;
  setIsStaleData: Dispatch<SetStateAction<boolean>>;
}
