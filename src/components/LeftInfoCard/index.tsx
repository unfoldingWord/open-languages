import React, { useState } from "react";

import { IconEye } from "@tabler/icons-react";

import { useAppContext } from "@context/AppContext";
import { ICountry, IPolygon } from "@utils/types/mapData";

import LanguageList from "./LanguageList";

export default function LeftMapInfoCard() {
  const {
    disabledMapData,
    languageState,
    languageArrayToMap,
    setLanguageArrayToMap,
    setDisabledMapData,
    deselectedCountries,
    setDeselectedCountries,
  } = useAppContext();

  const [hoveredCountryIndex, setHoveredCountryIndex] = useState<number | null>(
    null
  );

  const handleShow = (returningLanguage: IPolygon) => {
    const returningFeature = languageState.filter((language) => {
      const matchingFeature = language.polygon.features?.find(
        (feature) =>
          feature.properties.fid ===
          returningLanguage.features[0].properties.fid
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
  };

  const reselectCountry = (country: ICountry) => {
    setLanguageArrayToMap((prev) => [...prev, ...country.major_languages]);
    setDeselectedCountries((prev) => prev.filter((c) => c !== country));
  };
  return (
    <div className="fixed left-5 z-0 min-w-[18vw] rounded-2xl">
      {disabledMapData.length != 0 && (
        <>
          <div className="rounded-t-2xl bg-black p-2.5">
            <span className="text-sm text-white">Deselected Languages</span>
          </div>
          <div className="rounded-b-2xl bg-white shadow-md">
            {disabledMapData.map((language: IPolygon, key) => (
              <LanguageList
                key={key}
                language={language}
                handleShow={handleShow}
              />
            ))}
          </div>
        </>
      )}
      {deselectedCountries.length != 0 && (
        <>
          <div className="mt-8 rounded-t-2xl bg-black p-2.5">
            <span className="text-sm text-white">Deselected Countries</span>
          </div>
          <div className="rounded-b-2xl bg-white shadow-md">
            {deselectedCountries.map((country: ICountry, index: number) => (
              <li
                onClick={() => reselectCountry(country)}
                onMouseEnter={() => setHoveredCountryIndex(index)}
                onMouseLeave={() => setHoveredCountryIndex(null)}
                key={index}
                className="flex cursor-pointer items-center justify-between gap-3 p-2.5"
              >
                <span className="text-sm text-black">{country.country}</span>
                {hoveredCountryIndex === index && (
                  <button className="ml-auto">
                    <IconEye className="h-5 w-5 text-black" />
                  </button>
                )}
              </li>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
