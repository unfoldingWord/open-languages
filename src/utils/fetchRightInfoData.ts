"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { getUniqueStatusAndPopulation } from "@utils/getUniqueStatusAndPopulation";
import { IAllAccessStatus, IQueryObject } from "@utils/types/queryTypes";

export const fetchRightInfoData = async ({
  pointsQueryObject: {
    languageList,
    regionList,
    countryList,
    countryLangMapList,
    regionLangMapList,
    queryType,
  },
  setPointsInMajorLanguages,
  setMinorLanguageCount,
  setPopulation,
  setAllAccessStatuses,
  setQueryIsLoading,
  setIsStaleData,
}: {
  pointsQueryObject: IQueryObject;
  setPointsInMajorLanguages: Dispatch<SetStateAction<string[]>>;
  setMinorLanguageCount: Dispatch<SetStateAction<number>>;
  setPopulation: Dispatch<SetStateAction<number>>;
  setAllAccessStatuses: Dispatch<SetStateAction<IAllAccessStatus[]>>;
  setQueryIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsStaleData: Dispatch<SetStateAction<boolean>>;
}) => {
  const fetchpointsWithinLanguages = async (languageList: string[]) => {
    try {
      setQueryIsLoading(true);
      const apiRes = await fetch(`/api/calculatepoints/pointswithinlanguages`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ languageList }), // body data type must match "Content-Type" header
      });
      const data = await apiRes.json();
      if (data) {
        const accessStatus = getUniqueStatusAndPopulation(
          data.all_access_status
        );
        setAllAccessStatuses(accessStatus);
        setPointsInMajorLanguages(data.minor_languages);
        setMinorLanguageCount(data.sum_minor_languages);
        setPopulation(data.population);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setQueryIsLoading(false);
      setIsStaleData(false);
    }
  };

  const fetchpointsWithinLanguagesAndCountries = async (
    // languageList: string[],
    // countryListArray: string[]
    countryLangMapList: { country: string; languages: string[] }[]
  ) => {
    let _population = 0,
      _minorLanguageCount = 0;
    let _pointsInMajorLanguages: string[] = [],
      _allAccessObject: Array<{
        all_access_status: string;
        first_language_pop: number;
      }> = [];

    (async () => {
      setQueryIsLoading(true);

      for (const country of countryLangMapList) {
        if (!country.languages.length) {
          console.log("no languages in country", country.country);
          continue;
        }
        try {
          console.log("calling countrues");
          const apiRes = await fetch(
            `/api/calculatepoints/pointswithincountries`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                languageList: country.languages,
                countryListArray: [country.country],
              }), // body data type must match "Content-Type" header
            }
          );
          const data = await apiRes.json();
          if (data && data.sum_minor_languages !== 0) {
            _population += data.population;
            _minorLanguageCount += data.sum_minor_languages;
            _pointsInMajorLanguages = [
              ..._pointsInMajorLanguages,
              ...data.minor_languages,
            ];
            _allAccessObject = [..._allAccessObject, ...data.all_access_status];
          }
          const accessStatus = getUniqueStatusAndPopulation(_allAccessObject);
          setAllAccessStatuses(accessStatus);
          setPointsInMajorLanguages(_pointsInMajorLanguages);
          setMinorLanguageCount(_minorLanguageCount);
          setPopulation(_population);
        } catch (err) {
          console.log(err);
        }
      }
      setQueryIsLoading(false);
      setIsStaleData(false);
    })();
  };

  const fetchpointsWithinLanguagesAndRegions = async (
    // languageList: string[],
    // regionListArray: string[],
    regionLangMapList: { region: string; languages: string[] }[]
  ) => {
    let _population = 0,
      _minorLanguageCount = 0;
    let _pointsInMajorLanguages: string[] = [],
      _allAccessObject: Array<{
        all_access_status: string;
        first_language_pop: number;
      }> = [];

    (async () => {
      setQueryIsLoading(true);

      for (const region of regionLangMapList) {
        if (!region.languages.length) {
          console.log("no languages in country", region.region);
          continue;
        }
        try {
          console.log("calling region");
          const apiRes = await fetch(
            `/api/calculatepoints/pointswithinregions`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                languageList: region.languages,
                regionListArray: [region.region],
              }),
            }
          );
          const data = await apiRes.json();

          if (data && data.sum_minor_languages !== 0) {
            _population += data.population;
            _minorLanguageCount += data.sum_minor_languages;
            _pointsInMajorLanguages = [
              ..._pointsInMajorLanguages,
              ...data.minor_languages,
            ];
            _allAccessObject = [..._allAccessObject, ...data.all_access_status];
          }
          const accessStatus = getUniqueStatusAndPopulation(_allAccessObject);
          setAllAccessStatuses(accessStatus);
          setPointsInMajorLanguages(_pointsInMajorLanguages);
          setMinorLanguageCount(_minorLanguageCount);
          setPopulation(_population);
        } catch (err) {
          console.log(err);
        }
      }
      setQueryIsLoading(false);
      setIsStaleData(false);
    })();
  };

  console.log({ languageList, regionList, countryList, queryType });
  if (queryType == "none") {
    setPointsInMajorLanguages([]);
    setMinorLanguageCount(0);
    setPopulation(0);
    setAllAccessStatuses([{ statusValue: "", count: 0, population: 0 }]);
  } else if (
    queryType == "fetchpointsWithinLanguages" &&
    languageList?.length
  ) {
    console.log("calling language points");
    fetchpointsWithinLanguages(languageList);
  } else if (
    queryType == "fetchpointsWithinLanguagesAndCountries" &&
    languageList &&
    countryList &&
    countryLangMapList
  ) {
    fetchpointsWithinLanguagesAndCountries(countryLangMapList);
  } else if (
    queryType == "fetchpointsWithinLanguagesAndRegions" &&
    languageList &&
    regionList &&
    regionLangMapList
  ) {
    fetchpointsWithinLanguagesAndRegions(regionLangMapList);
  }
};
