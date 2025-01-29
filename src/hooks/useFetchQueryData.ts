"use client";
import { useEffect } from "react";

import { useAppContext } from "@context/AppContext";
import { useQueryContext } from "@context/QueryContext";
import { ICountry, ILanguage, IRegion } from "@utils/types/mapData";

function convertToCommaSeparatedString(array: string[]) {
  if (array.length > 2) {
    array = array.slice(0, 1);
    array.push("...");
  }
  return array.join(", ");
}

export const useFetchQueryData = () => {
  const {
    languageArrayToMap,
    showCountryBorders,
    selectedCountryArray,
    selectedRegionArray,
    showRegionBorders,
    selectedResourceLevel,
    deselectedCountries,
  } = useAppContext();
  const { pointsQueryObject, setPointsQueryObject } = useQueryContext();

  const countryListArray: any = [];
  const majorLanguageListArray: any = [];

  languageArrayToMap.map((language) => {
    countryListArray.push(language.country.country);
    majorLanguageListArray.push(language.language);
  });
  const countryList = convertToCommaSeparatedString(countryListArray);
  const majorLanguageList = convertToCommaSeparatedString(
    majorLanguageListArray
  );

  const countryLangMapList = selectedCountryArray.map((country) => {
    const _languages = (
      country.major_languages
        ? country.major_languages.map((lang) => lang.language)
        : []
    ).filter((language) =>
      languageArrayToMap.some((lang) => lang.language === language)
    );
    const output: { country: string; languages: string[] } = {
      country: country.country,
      languages: _languages,
    };
    return output;
  });

  const regionLangMapList = selectedRegionArray.map((region) => {
    // Extract the languages from all countries within the region and flatten them
    const allLanguages =
      region.country?.flatMap((country) => country.major_languages || []) || [];

    // Use a Set to eliminate duplicate languages

    const uniqueLanguages = Array.from(
      new Set(allLanguages.flatMap((lang) => lang.language))
    );
    const languageList = uniqueLanguages.filter((language) =>
      languageArrayToMap.some((lang) => lang.language === language)
    );

    return { region: region.region, languages: languageList };
  });

  const regionCountryLangMapList = selectedRegionArray
    .map((region: IRegion) => {
      if (region.country) {
        const regionOutput = region.country.map((country: ICountry) => {
          const _languages = (
            country.major_languages
              ? country.major_languages.map((lang: ILanguage) => lang.language)
              : []
          ).filter((language) =>
            // eslint-disable-next-line max-nested-callbacks
            languageArrayToMap.some((lang) => lang.language === language)
          );
          const output: { country: string; languages: string[] } = {
            country: country.country,
            languages: _languages,
          };
          return output;
        });
        return regionOutput;
      }
    })
    .flat() as { country: string; languages: string[] }[];

  useEffect(() => {
    const languageList = languageArrayToMap.flatMap(
      (language) => language.language
    );
    const countryListArray = selectedCountryArray?.flatMap(
      (country) => country.country
    );
    // Used for region wise query.
    const regionListArray = selectedRegionArray.flatMap(
      (region) => region.region
    );
    const countryFromRegion = selectedRegionArray
      .map((region) => region.country)
      .flat();

    // the list of countries from regions that are not deselected
    const regionCountryToQuery = countryFromRegion
      .filter((country) => {
        return country && !deselectedCountries.includes(country);
      })
      .flatMap((country) => country && country.country);
    const regionCountryLangMapListToQuery = regionCountryLangMapList.filter(
      (countryLangMap) =>
        countryLangMap.country &&
        !deselectedCountries.some(
          (deselected) => countryLangMap.country === deselected.country
        )
    );
    if (languageList.length != 0) {
      showCountryBorders && selectedCountryArray.length != 0
        ? setPointsQueryObject({
            languageList,
            countryList: countryListArray,
            countryLangMapList,
            queryType: "fetchpointsWithinLanguagesAndCountries",
          })
        : showRegionBorders && selectedRegionArray.length != 0
        ? setPointsQueryObject({
            languageList,
            // regionList: regionListArray, //region wise query is replaced with country wise query
            // regionLangMapList,
            // queryType: "fetchpointsWithinLanguagesAndRegions",
            countryList: regionCountryToQuery as string[],
            countryLangMapList: regionCountryLangMapListToQuery,
            queryType: "fetchpointsWithinLanguagesAndCountries",
          })
        : languageArrayToMap.length != 0 || selectedResourceLevel.length != 0
        ? setPointsQueryObject({
            languageList,
            queryType: "fetchpointsWithinLanguages",
          })
        : {};
    } else if (languageList.length == 0) {
      setPointsQueryObject({ queryType: "none" });
    }
  }, [
    languageArrayToMap,
    showCountryBorders,
    selectedCountryArray,
    selectedRegionArray,
    showRegionBorders,
    deselectedCountries,
  ]);
  return {
    pointsQueryObject,
    countryList,
    majorLanguageList,
    languageArrayToMap,
    majorLanguageListArray,
  };
};
