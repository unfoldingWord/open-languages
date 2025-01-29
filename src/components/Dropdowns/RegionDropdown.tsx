/*eslint max-nested-callbacks: ["error", 5]*/
"use client";
import React, { useEffect, useState, Fragment } from "react";

import { Listbox, Combobox, Transition } from "@headlessui/react";
import { IconCheck, IconWorld, IconSelector } from "@tabler/icons-react";

import { Button } from "@components/ShadcnUi/button";
import { useAppContext } from "@context/AppContext";
import { useResetRightInfoBox } from "@hooks/useResetRightInfoBox";
import { cn } from "@lib/utils";
import { regionPoints } from "@utils/data/regionPoints";
import { ICountry, IRegion, ILanguage } from "@utils/types/mapData";

function RegionDropdown() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<IRegion[] | undefined>([]);

  const {
    languageData,
    selectedRegionArray,
    setFilteredCountries,
    setSelectedRegionArray,
    setLanguageArrayToMap,
    setLanguageState,
    setLanguagesFromRegion,
    mapRef,
    foundRegion,
    setFoundRegion,
    regionDisabled,
    setShowRegionBorders,
    setDeselectedCountries,
    singleRegionSelection,
    setSingleRegionSelection,
  } = useAppContext();

  const { resetRightInfoBox } = useResetRightInfoBox();

  const regionList =
    query === ""
      ? region
      : region &&
        region.filter((e) => {
          return (
            e?.region && e?.region.toLowerCase().includes(query.toLowerCase())
          );
        });

  const handleResetRegion = () => {
    setSelectedRegionArray([]);
    setDeselectedCountries([]);
    setSingleRegionSelection(undefined);
  };

  useEffect(() => {
    setRegion(languageData);
    if (selectedRegionArray.length > 0) {
      setShowRegionBorders(true);
      const selected: ILanguage[] = [];
      selectedRegionArray.forEach((region) => {
        region.country?.forEach((country) => {
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
      });
      setLanguagesFromRegion(selected as ILanguage[]);
      setLanguageArrayToMap(selected as ILanguage[]);
      // setLanguageArrayToMap(selectedWCountriesNLanguages as ILanguage[]);
      setLanguageState(selected as ILanguage[]);
      // setLanguageState(selectedWCountriesNLanguages as ILanguage[]);

      //this is for country dropdown
      selectedRegionArray &&
        setFilteredCountries([
          ...selectedRegionArray.flatMap((region: any) => region.country),
        ]);
    } else {
      setLanguagesFromRegion([]);
      setShowRegionBorders(false);
      // const otherLanguages = [
      //   ...selectedCountryArray.flatMap((country) => country.major_languages),
      //   ...selectedLanguageArray,
      // ];
      setLanguageArrayToMap([] as ILanguage[]); //setting languages to from countries and languages selected
      // setLanguageArrayToMap(otherLanguages as ILanguage[]); //setting languages to from countries and languages selected
      setLanguageState([] as ILanguage[]);
      // setLanguageState(otherLanguages as ILanguage[]);
      setLanguageState([] as ILanguage[]);
      setFilteredCountries([]); // no countries selected from region
    }
  }, [selectedRegionArray, languageData]);

  function handleSelection(e: any) {
    setSelectedRegionArray(e);
    setSingleRegionSelection(e[e.length - 1]);
    setQuery("");
    resetRightInfoBox();
  }

  useEffect(() => {
    setFoundRegion(
      regionPoints.find(
        (region) =>
          region.region ===
          selectedRegionArray[selectedRegionArray.length - 1]?.region
      )
    );
  }, [selectedRegionArray, setFoundRegion]);

  useEffect(() => {
    const map = mapRef.current;
    if (map && foundRegion) {
      map.setView([foundRegion?.latitude, foundRegion?.longitude], 4);
    }
  }, [foundRegion, mapRef]);

  return (
    <>
      <Combobox
        value={selectedRegionArray}
        onChange={(e) => handleSelection(e)}
        multiple
        disabled={regionDisabled}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left focus:outline-none sm:text-sm">
            <Combobox.Input
              className={cn(
                "w-full border-none py-2 pl-2 text-sm font-medium outline-none",
                regionDisabled
                  ? "bg-gray-600 text-white placeholder:text-white"
                  : selectedRegionArray.length > 0
                  ? "bg-secondary text-black placeholder:text-black"
                  : "bg-secondary-600 text-white placeholder:text-white"
              )}
              placeholder="Region"
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-1 flex items-center gap-0.5">
              <span
                className={cn(
                  "py-0.5 px-1.5 rounded-full text-xs",
                  selectedRegionArray.length > 0
                    ? "border-primary bg-primary text-white"
                    : "border-secondary bg-secondary text-black"
                )}
              >
                {selectedRegionArray.length}
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
                  {selectedRegionArray.length > 0 && (
                    <button
                      className="cursor-pointer text-red-500"
                      onClick={handleResetRegion}
                    >
                      Reset
                    </button>
                  )}
                  <button
                    className={cn(
                      "cursor-pointer text-green-500 ",
                      selectedRegionArray.length > 0 && "ml-auto"
                    )}
                    onClick={() =>
                      setSelectedRegionArray(languageData as IRegion[])
                    }
                  >
                    Select All
                  </button>
                </div>
                {Array.isArray(regionList) &&
                  regionList.map((region, index: number) => {
                    return (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default py-2 pl-3 pr-4 ${
                            active ? "bg-primary text-white" : "text-gray-900"
                          }`
                        }
                        value={region}
                        // disabled={
                        //   singleRegionSelection &&
                        //   singleRegionSelection !== region
                        // }
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {region?.region}
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
                {regionList?.length === 0 && query !== "" && (
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

export default RegionDropdown;
