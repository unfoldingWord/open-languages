"use client";
import React, { Fragment, useEffect, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";

import { useAppContext } from "@context/AppContext";
import { useResetRightInfoBox } from "@hooks/useResetRightInfoBox";
import { cn } from "@lib/utils";
import { resourceList } from "@utils/data/resourceLevel";
import { ILanguage, IPolygon } from "@utils/types/mapData";

const SelectResourceLevel = () => {
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [disabledOptions, setDisabledOptions] = useState<any>([]);
  const [filteredResourceList, setFilteredResourceList] = useState<any>([]);
  const [initialDisabledOptions, setInitialDisabledOptions] = useState<any>([]);
  const {
    languageData,
    selectedResourceLevel,
    setSelectedResourceLevel,
    setLanguageArrayToMap,
    selectedLanguageArray,
    selectedRegionArray,
    selectedCountryArray,
    languageState,
    setLanguageState,
    languageArrayToMap,
    setRegionDisabled,
    setCountryDisabled,
    setLanguageDisabled,
  } = useAppContext();

  const { resetRightInfoBox } = useResetRightInfoBox();

  const languageList = languageData?.flatMap((region) =>
    region.country?.flatMap((country) => country.major_languages)
  );

  useEffect(() => {
    if (
      selectedRegionArray.length == 0 &&
      selectedCountryArray.length == 0 &&
      selectedLanguageArray.length == 0
    ) {
      if (selectedResourceLevel.length > 0) {
        const levelMatchingPolygons = selectedResourceLevel.flatMap(
          (level: any) => {
            return languageList?.filter(
              (language: any) => level.resourceLevel == language.resource_level
            );
          }
        );
        const resourceLevelstoMap = [] as ILanguage[];
        levelMatchingPolygons.forEach((language: ILanguage) => {
          if (
            !resourceLevelstoMap.some(
              (resourceLevel) => resourceLevel.id == language.id
            )
          ) {
            resourceLevelstoMap.push(language);
          }
        });
        setLanguageArrayToMap(resourceLevelstoMap);
        setLanguageState(resourceLevelstoMap);
        setRegionDisabled(true);
        setCountryDisabled(true);
        setLanguageDisabled(true);
      } else {
        setLanguageArrayToMap([]);
        setRegionDisabled(false);
        setCountryDisabled(false);
        setLanguageDisabled(false);
        setSelectedOptions([]);
      }
    } else {
      if (selectedResourceLevel.length > 0) {
        setLanguageArrayToMap(
          selectedResourceLevel.flatMap((level: any) => {
            return languageState.filter(
              (language) => level.resourceLevel == language.resource_level
            );
          })
        );
      } else {
        setLanguageArrayToMap([]);
        setSelectedOptions([]);
      }
    }
  }, [selectedResourceLevel]);

  useEffect(() => {
    //setting the options as selected based on the selected polygon's resource level
    if (
      selectedRegionArray.length !== 0 ||
      selectedCountryArray.length !== 0 ||
      selectedLanguageArray.length !== 0
    ) {
      const resourceLevelsFromLanguageToMap = languageArrayToMap?.map(
        (language) => parseInt(language.resource_level)
      );
      const filteredResourceList = resourceList.filter((resource) => {
        return resourceLevelsFromLanguageToMap.includes(resource.resourceLevel);
      });
      setSelectedOptions(filteredResourceList);
      setFilteredResourceList(filteredResourceList);
      // setDisabledOptions(unSelectableResourceList);
    } else if (selectedResourceLevel.length == 0) {
      // setDisabledOptions([]);
      setSelectedOptions([]);
    }
  }, [languageArrayToMap]);

  useEffect(() => {
    //setting the options as selected based on the selected polygon's resource level
    if (
      selectedRegionArray.length !== 0 ||
      selectedCountryArray.length !== 0 ||
      selectedLanguageArray.length !== 0
    ) {
      const resourceLevelsFromLanguageToMap = languageArrayToMap?.map(
        (language) => language.resource_level
      );
      const unSelectableResourceList = resourceList.filter((resource) => {
        return !resourceLevelsFromLanguageToMap.includes(
          resource.resourceLevel.toString()
        );
      });
      setDisabledOptions(unSelectableResourceList);
      setInitialDisabledOptions(unSelectableResourceList);
    }
  }, []);

  const handleSelect = (value: any) => {
    setSelectedResourceLevel(value);
    setSelectedOptions(value);
    resetRightInfoBox();
  };
  const handleReset = () => {
    if (filteredResourceList.length !== 0) {
      setSelectedResourceLevel(filteredResourceList);
      setSelectedOptions(filteredResourceList);
      setDisabledOptions(initialDisabledOptions);
    } else {
      setSelectedResourceLevel([]);
      setSelectedOptions([]);
      setDisabledOptions(initialDisabledOptions);
    }
  };
  return (
    <Listbox value={selectedOptions} onChange={handleSelect} multiple={true}>
      <div className="relative mt-1">
        <Listbox.Button
          className={cn(
            "relative flex items-center rounded-lg pl-2 pr-8 py-2 text-sm font-medium outline-none",
            selectedOptions.length !== 0
              ? "bg-secondary text-black"
              : "bg-secondary-600 text-white"
          )}
        >
          <span>Resource Level</span>
          <IconSelector
            className="absolute right-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
            {selectedResourceLevel.length !== 0 && (
              <button
                className="cursor-pointer py-2 pl-2 pr-4 text-red-500"
                onClick={handleReset}
              >
                Reset
              </button>
            )}
            {resourceList?.map((level: any, idx: number) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default pl-3 py-1.5  ${
                    active ? "bg-primary text-white" : "text-gray-900"
                  }`
                }
                value={level}
                disabled={disabledOptions.includes(level)}
              >
                {({ selected, active, disabled }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected
                          ? "font-medium"
                          : disabled
                          ? "font-normal text-gray-200"
                          : "font-normal"
                      }`}
                    >
                      {level.resourceName}
                    </span>
                    {selected ? (
                      <span
                        className={`absolute inset-y-0 right-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-primary"
                        }`}
                      >
                        <IconCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectResourceLevel;
