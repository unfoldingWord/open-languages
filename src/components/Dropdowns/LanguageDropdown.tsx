/* eslint-disable max-lines */
"use client";
import React, { Fragment, useEffect, useMemo, useState } from "react";

import { Combobox, Transition } from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";

import { useAppContext } from "@context/AppContext";
import { useResetRightInfoBox } from "@hooks/useResetRightInfoBox";
import { cn } from "@lib/utils";
import { ICountry, ILanguage } from "@utils/types/mapData";

const sortArray = (array: ILanguage[]) => {
  return array.sort((a: ILanguage, b: ILanguage) => {
    if (a.language < b.language) {
      return -1;
    }
    if (a.language > b.language) {
      return 1;
    }
    return 0;
  });
};

const LanguageDropdown = () => {
  const [languages, setLanguages] = useState<ILanguage[] | undefined>([]);
  const [selectedOptions, setSelectedOptions] = useState<ILanguage[]>([]);
  const [selectedLanguageLocal, setSelectedLanguageLocal] = useState<
    ILanguage[]
  >([]);
  const [query, setQuery] = useState("");
  const [counter, setCounter] = useState(0);

  const {
    languageData,
    languagesArray,
    languageArrayToMap,
    selectedLanguageArray,
    filteredLanguages,
    selectedRegionArray,
    selectedCountryArray,
    setSelectedLanguageArray,
    setLanguageArrayToMap,
    setLanguageState,
    setLanguagesFromLanguage,
    setRegionDisabled,
    setCountryDisabled,
    languageDisabled,
    setClippingDisabled,
    previousSelectedLanguages,
    setPreviousSelectedLanguages,
  } = useAppContext();

  const { resetRightInfoBox } = useResetRightInfoBox();

  const allLanguagesInAllRegions = languagesArray;

  useEffect(() => {
    setSelectedLanguageLocal(filteredLanguages);
    setSelectedOptions([...filteredLanguages, ...selectedLanguageArray]);
  }, [filteredLanguages]);

  useEffect(() => {
    if (selectedLanguageArray.length > 0) {
      const selected = selectedLanguageArray;
      let selectedWRegionNCountry = selectedLanguageArray;
      selectedLanguageLocal.map((language) => {
        if (!selectedWRegionNCountry.includes(language)) {
          selectedWRegionNCountry = [language, ...selectedWRegionNCountry]; //this is the fix
        }
      });
      selectedLanguageArray.map((language) => {
        if (!selectedWRegionNCountry.includes(language)) {
          selectedWRegionNCountry = [language, ...selectedWRegionNCountry];
        }
      });
      setLanguageArrayToMap(selectedWRegionNCountry as ILanguage[]);
      setLanguageState(selectedWRegionNCountry as ILanguage[]);
      setLanguagesFromLanguage(selected as ILanguage[]);
      setPreviousSelectedLanguages(languages as ILanguage[]);
      if (selectedRegionArray.length == 0 && selectedCountryArray.length == 0) {
        setRegionDisabled(true);
        setCountryDisabled(true);
        setClippingDisabled(true);
      }
    } else {
      setLanguagesFromLanguage([]);

      setLanguageArrayToMap(selectedLanguageLocal as ILanguage[]); //setting languages to from languages and languages selected
      setLanguageState(selectedLanguageLocal as ILanguage[]);
      if (selectedRegionArray.length == 0 && selectedCountryArray.length == 0) {
        setRegionDisabled(false);
        setCountryDisabled(false);
        setClippingDisabled(false);
      }
    }
  }, [languages, languageData, selectedLanguageLocal]);

  const handleSelection = (e: ILanguage[]) => {
    const newlySelected = e.filter(
      (language) =>
        !previousSelectedLanguages.includes(language) &&
        !selectedLanguageLocal.includes(language)
    );

    const unSelected =
      previousSelectedLanguages.length > 0
        ? previousSelectedLanguages.filter((language) => !e.includes(language))
        : selectedLanguageLocal.filter((language) => !e.includes(language));

    // Add newly selected languages
    if (newlySelected.length > 0) {
      setSelectedLanguageLocal((prevState) => [...prevState, ...newlySelected]);
      setPreviousSelectedLanguages((prevState) => [
        ...prevState,
        ...newlySelected,
      ]);
      setSelectedLanguageArray((prevState) => [...prevState, ...newlySelected]);
    }

    // Remove unselected languages
    if (unSelected.length > 0) {
      const isNotUnselected = (language: ILanguage) =>
        !unSelected.includes(language);

      setSelectedLanguageArray(selectedLanguageArray.filter(isNotUnselected));
      setSelectedLanguageLocal(selectedLanguageLocal.filter(isNotUnselected));
      setPreviousSelectedLanguages(
        previousSelectedLanguages.filter(isNotUnselected)
      );
    }

    setLanguages(e);
    setSelectedOptions(e);
    resetRightInfoBox();
  };

  const handleReset = () => {
    setSelectedLanguageArray([]);
    setPreviousSelectedLanguages([]);
    setSelectedOptions([...filteredLanguages]);
    setSelectedLanguageLocal([...filteredLanguages]);
  };

  const languageList =
    query === ""
      ? allLanguagesInAllRegions
      : allLanguagesInAllRegions &&
        allLanguagesInAllRegions.filter((e) => {
          return (
            e?.language &&
            e?.language.toLowerCase().includes(query.toLowerCase())
          );
        });

  const newArray = languageList?.filter((languages) =>
    selectedOptions.some(
      (options) =>
        languages?.country === options.country &&
        languages?.language === options.language
    )
  );

  const sortedLanguageList = useMemo(() => {
    if (selectedRegionArray.length > 0 || selectedCountryArray.length > 0) {
      return sortLanguages(filteredLanguages, selectedOptions);
    } else {
      return sortLanguages(languageList as ILanguage[], selectedOptions);
    }
  }, [
    selectedRegionArray.length,
    selectedCountryArray.length,
    filteredLanguages,
    selectedOptions,
    languageList,
  ]);
  const handleSelectAll = () => {
    const allLanguages = sortedLanguageList;

    // Select all languages
    setSelectedLanguageLocal(allLanguages);
    setPreviousSelectedLanguages(allLanguages);
    setSelectedLanguageArray(allLanguages);

    // Update the languages and options state
    setLanguages(allLanguages);
    setSelectedOptions(allLanguages);
  };

  return (
    <Combobox
      value={selectedOptions}
      onChange={(e) => handleSelection(e)}
      multiple
      disabled={languageDisabled}
    >
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none sm:text-sm">
          <Combobox.Input
            className={cn(
              "w-full border-none py-2 pl-2 pr-10 text-sm font-medium outline-none",
              languageDisabled
                ? "bg-gray-600 text-white placeholder:text-white"
                : (filteredLanguages && filteredLanguages.length > 0) ||
                  (selectedLanguageArray && selectedLanguageArray.length > 0)
                ? "bg-secondary text-black placeholder:text-black"
                : "bg-secondary-600 text-white placeholder:text-white"
            )}
            placeholder="Strategic Languages"
            displayValue={(selectedLanguage: any) => {
              return selectedLanguage?.Language;
            }}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-1 flex items-center gap-0.5">
            <span
              className={cn(
                "py-0.5 px-1.5 rounded-full text-xs",
                (selectedOptions && selectedOptions.length > 0) ||
                  selectedRegionArray.length > 0 ||
                  selectedCountryArray.length > 0
                  ? "border-primary bg-primary text-white"
                  : "border-secondary bg-secondary text-black"
              )}
            >
              {selectedOptions.length}
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
                {languageArrayToMap && languageArrayToMap.length > 0 && (
                  <button
                    className="cursor-pointer text-red-500"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                )}
                {selectedCountryArray.length === 0 &&
                  selectedRegionArray.length === 0 && (
                    <button
                      className={cn(
                        "cursor-pointer text-green-500",
                        languageArrayToMap.length > 0 && "ml-auto"
                      )}
                      onClick={handleSelectAll}
                    >
                      Select All
                    </button>
                  )}
              </div>

              {Array.isArray(sortedLanguageList) &&
                sortedLanguageList?.map((e: any, idx: number) => (
                  <Combobox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default py-2 pl-3 pr-4 ${
                        active ? "bg-primary text-white" : "text-gray-900"
                      }`
                    }
                    value={e}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {e.language}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            <IconCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            {/* <IconCheck className="h-5 w-5" aria-hidden="true" /> */}
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              {languageList?.length === 0 && query !== "" && (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              )}
            </>
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default LanguageDropdown;

function sortLanguages(arrayToSort: ILanguage[], conditionArray: ILanguage[]) {
  const sortedCountryList = arrayToSort?.sort((a, b) => {
    // Sort selected options first
    if (a && b) {
      if (conditionArray?.includes(a) && !conditionArray?.includes(b)) {
        return -1;
      }
      if (!conditionArray?.includes(a) && conditionArray?.includes(b)) {
        return 1;
      }
      return a?.language.localeCompare(b?.language as string);
    }
    return 0;
  });
  return sortedCountryList;
}
