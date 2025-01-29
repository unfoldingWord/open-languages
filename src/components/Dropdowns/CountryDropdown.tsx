/*eslint max-nested-callbacks: ["error", 5]*/
"use client";

import { Fragment, useEffect, useMemo, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";

import { useAppContext } from "@context/AppContext";
import { useResetRightInfoBox } from "@hooks/useResetRightInfoBox";
import { cn } from "@lib/utils";
import { ICountry, ILanguage } from "@utils/types/mapData";

function CountryDropdown() {
  const [countries, setCountries] = useState<ICountry[] | undefined>([]);
  const [previousSelectedCountries, setPreviousSelectedCountries] = useState<
    ICountry[]
  >([]);
  const [query, setQuery] = useState("");
  const [selectedCountryLocal, setSelectedCountryLocal] = useState<ICountry[]>(
    []
  );
  const [selectedOptions, setSelectedOptions] = useState<ICountry[]>([]);
  const {
    languageData,
    selectedRegionArray,
    filteredCountries,
    selectedCountryArray,
    selectedLanguageArray,
    setSelectedCountryArray,
    setLanguageArrayToMap,
    setLanguageState,
    setLanguagesFromCountry,
    setFilteredLanguages,
    setPointLFilterCountries,
    setRegionDisabled,
    countryDisabled,
    deselectedCountries,
    setDeselectedCountries,
    setShowCountryBorders,
    regionDisabled,
    setClippingDisabled,
  } = useAppContext();
  const { resetRightInfoBox } = useResetRightInfoBox();

  const allCountriesInAllRegions = languageData?.flatMap(
    (region) => region.country
  );
  useEffect(() => {
    setSelectedCountryLocal(filteredCountries);
    setSelectedOptions([...filteredCountries, ...selectedCountryArray]);
  }, [filteredCountries]);

  useEffect(() => {
    if (selectedCountryArray.length > 0) {
      const selected: ILanguage[] = [];

      selectedCountryArray.forEach((country) => {
        country.major_languages?.forEach((language) => {
          if (
            !selected.some(
              (selectedLanguage) => selectedLanguage.id === language.id
            )
          ) {
            selected.push(language);
          }
        });
      });
      const selectedWRegionNLanguage = selected;

      selectedCountryLocal.map((country) => {
        country.major_languages?.map((language) => {
          if (
            !selectedWRegionNLanguage.some(
              (selectedLanguage) => selectedLanguage.id === language.id
            )
          ) {
            selected.push(language);
          }
        });
      });

      selectedLanguageArray.map((language) => {
        if (
          !selectedWRegionNLanguage.some(
            (selectedLanguage) => selectedLanguage.id === language.id
          )
        ) {
          selected.push(language);
        }
      });

      setLanguageArrayToMap(selectedWRegionNLanguage as ILanguage[]);
      setLanguageState(selectedWRegionNLanguage as ILanguage[]);
      setLanguagesFromCountry(selected as ILanguage[]);
      setPreviousSelectedCountries(countries as ICountry[]);

      const filterArray = [] as ILanguage[];
      selectedRegionArray.forEach((region) => {
        region.country?.forEach((country) => {
          country.major_languages?.forEach((language) => {
            if (!filterArray.some((existing) => existing.id === language.id)) {
              filterArray.push(language);
            }
          });
        });
      });
      selectedCountryArray.forEach((country) => {
        country.major_languages?.forEach((language) => {
          if (!filterArray.some((existing) => existing.id === language.id)) {
            filterArray.push(language);
          }
        });
      });
      setFilteredLanguages(filterArray);
      if (selectedRegionArray.length == 0) {
        setRegionDisabled(true);
        setShowCountryBorders(true);
      }
    } else {
      setLanguagesFromCountry([]);

      if (selectedRegionArray.length == 0) {
        setRegionDisabled(false);
        setShowCountryBorders(false);
        setClippingDisabled(false);
      }
      const mapData2: ILanguage[] = [];
      selectedCountryArray.forEach((country) => {
        country.major_languages?.forEach((language) => {
          if (
            !mapData2.some(
              (selectedLanguage) => selectedLanguage.id === language.id
            )
          ) {
            mapData2.push(language);
          }
        });
      });
      setLanguageArrayToMap(mapData2 as ILanguage[]);
      setLanguageState(mapData2 as ILanguage[]);

      const tempArray: ILanguage[] = [];
      selectedCountryLocal.forEach((country) => {
        country.major_languages?.forEach((language) => {
          if (!tempArray.some((tempLang) => tempLang.id === language.id)) {
            tempArray.push(language);
          }
        });
      });
      setFilteredLanguages(tempArray);
    }
    setPointLFilterCountries(selectedCountryLocal);
  }, [countries, languageData, selectedCountryArray, selectedCountryLocal]);

  const updateArray = (
    arr: ICountry[],
    countriesToUpdate: ICountry[],
    add: boolean
  ): ICountry[] => {
    if (add) {
      return [...arr, ...countriesToUpdate];
    } else {
      const countryNamesToRemove = new Set(
        countriesToUpdate.map((country) => country.country)
      );
      return arr.filter(
        (country) => !countryNamesToRemove.has(country.country)
      );
    }
  };

  const handleSelection = (e: ICountry[]) => {
    const newlySelected = e.filter(
      (country) => !selectedCountryLocal.includes(country)
    );
    const unSelected = selectedCountryLocal.filter(
      (country) => !e.includes(country)
    );

    if (newlySelected.length > 0) {
      setSelectedCountryArray((prevState) =>
        updateArray(prevState, newlySelected, true)
      );
      setSelectedCountryLocal((prevState) =>
        updateArray(prevState, newlySelected, true)
      );
      setPreviousSelectedCountries((prevState) =>
        updateArray(prevState, newlySelected, true)
      );

      const newCountryNames = new Set(
        newlySelected.map((country) => country.country)
      );
      const newDeselected = deselectedCountries.filter(
        (country) => !newCountryNames.has(country.country)
      );
      setDeselectedCountries(newDeselected);
    }

    if (unSelected.length > 0) {
      setSelectedCountryArray((prevState) =>
        updateArray(prevState, unSelected, false)
      );
      setSelectedCountryLocal((prevState) =>
        updateArray(prevState, unSelected, false)
      );
      setPreviousSelectedCountries((prevState) =>
        updateArray(prevState, unSelected, false)
      );

      if (!regionDisabled) {
        setDeselectedCountries((prevState) =>
          updateArray(prevState, unSelected, true)
        );
      }
    }

    setCountries(e);
    setSelectedOptions(e);
    resetRightInfoBox();
  };
  const handleSelectAll = () => {
    const allSelectableCountries = sortedCountryList;
    setSelectedCountryLocal(allSelectableCountries);
    setSelectedCountryArray(allSelectableCountries);
    setPreviousSelectedCountries([]);
    setDeselectedCountries([]);
    setCountries(allSelectableCountries);
    setSelectedOptions(allSelectableCountries);
  };

  const handleResetCountry = () => {
    setSelectedOptions([...filteredCountries]);
    setSelectedCountryArray([]);
    setSelectedCountryLocal([...filteredCountries]);
    setDeselectedCountries([]);
  };

  const filterCountriesByQuery = (
    countries: ICountry[],
    query: string
  ): ICountry[] => {
    if (!query) return countries;

    const sanitizedQuery = query.toLowerCase().replace(/\s+/g, "");
    return countries.filter((country) => {
      const sanitizedCountryName = country?.country
        .toLowerCase()
        .replace(/\s+/g, "");
      return sanitizedCountryName.includes(sanitizedQuery);
    });
  };

  const allCountriesFiltered = filterCountriesByQuery(
    allCountriesInAllRegions as ICountry[],
    query
  );

  const sortedCountryList = useMemo(() => {
    const countriesToSort =
      selectedRegionArray.length > 0 ? filteredCountries : allCountriesFiltered;
    return sortCountries(countriesToSort, selectedOptions);
  }, [
    selectedRegionArray.length,
    filteredCountries,
    allCountriesFiltered,
    selectedOptions,
  ]);

  return (
    <>
      <Combobox
        value={selectedOptions}
        onChange={(e) => handleSelection(e)}
        multiple
        disabled={countryDisabled}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none sm:text-sm">
            <Combobox.Input
              className={cn(
                "w-full border-none py-2 pl-2 text-sm font-medium outline-none",
                countryDisabled
                  ? "bg-gray-600 text-white placeholder:text-white"
                  : (filteredCountries && filteredCountries?.length > 0) ||
                    (selectedCountryArray && selectedCountryArray?.length > 0)
                  ? "bg-secondary text-black placeholder:text-black"
                  : "bg-secondary-600 text-white placeholder:text-white"
              )}
              placeholder="Countries"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-1 flex items-center gap-0.5">
              <span
                className={cn(
                  "py-0.5 px-1.5 rounded-full text-xs",
                  (selectedCountryArray && selectedCountryArray?.length > 0) ||
                    selectedRegionArray.length > 0
                    ? "border-primary bg-primary text-white"
                    : "border-secondary bg-secondary text-black"
                )}
              >
                {filteredCountries && filteredCountries?.length > 0
                  ? filteredCountries.length - deselectedCountries.length
                  : selectedCountryArray.length}
              </span>
              <IconSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              <>
                <div className="flex p-2">
                  {selectedOptions && selectedCountryArray.length > 0 && (
                    <button
                      className="cursor-pointer text-red-500"
                      onClick={handleResetCountry}
                    >
                      Reset
                    </button>
                  )}
                  {selectedRegionArray.length === 0 && (
                    <button
                      className={cn(
                        "cursor-pointer text-green-500",
                        selectedOptions.length > 0 && "ml-auto"
                      )}
                      onClick={handleSelectAll}
                    >
                      Select All
                    </button>
                  )}
                </div>
                {Array.isArray(sortedCountryList) &&
                  sortedCountryList.map((country, index: number) => {
                    return (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default py-2 pl-3 pr-4 ${
                            active ? "bg-primary text-white" : "text-gray-900"
                          }`
                        }
                        value={country}
                        // disabled={countryDisabled}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {country?.country}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 right-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-primary"
                                }`}
                              >
                                <IconCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    );
                  })}
                {allCountriesFiltered?.length === 0 && query !== "" && (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                )}
              </>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
}

export default CountryDropdown;

function sortCountries(arrayToSort: ICountry[], conditionArray: ICountry[]) {
  const sortedCountryList = arrayToSort?.sort((a, b) => {
    // Sort selected options first
    if (a && b) {
      if (conditionArray?.includes(a) && !conditionArray?.includes(b)) {
        return -1;
      }
      if (!conditionArray?.includes(a) && conditionArray?.includes(b)) {
        return 1;
      }
      return a?.country.localeCompare(b?.country as string);
    }
    return 0;
  });
  return sortedCountryList;
}
