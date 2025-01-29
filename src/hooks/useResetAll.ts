import { useContext } from "react";

import { Query } from "@tanstack/react-query";

import { AppContext } from "@context/AppContext";
import { QueryContext } from "@context/QueryContext";

const useResetAll = () => {
  const {
    setLanguageArrayToMap,
    setDisabledMapData,
    setFilteredCountries,
    setFilteredLanguages,
    setSelectedCountryArray,
    setSelectedRegionArray,
    setSelectedLanguageArray,
    setSelectedRegion,
    setSelectedLanguage,
    setSelectedLanguages,
    setSelectedResourceLevel,
    setLanguages,
    setShowPoints,
    setShowBaseMap,
    setBaseMapData,
    setSelectedFeature,
    setSelectedDisabledFeature,
    setFoundRegion,
    setLanguageState,
    setPointLFilterCountries,
    setClicked,
    setShowCountryBorders,
    setCountryDisabled,
    setRegionDisabled,
    setClippingDisabled,
    setRegionBorders,
    setShowRegionBorders,
    setSingleRegionSelection,
    setDeselectedCountries,
    setPreviousSelectedLanguages,
  } = useContext(AppContext);

  const {
    setPointsQueryObject,
    setPointsInMajorLanguages,
    setMinorLanguageCount,
    setPopulation,
    setAllAccessStatuses,
    setIsStaleData,
  } = useContext(QueryContext);

  const resetAll = () => {
    setLanguageArrayToMap([]);
    setDisabledMapData([]);
    setFilteredCountries([]);
    setFilteredLanguages([]);
    setSelectedCountryArray([]);
    setSelectedRegionArray([]);
    setSelectedLanguageArray([]);
    setSelectedRegion({} as any);
    setSelectedLanguage({} as any);
    setSelectedLanguages([]);
    setSelectedResourceLevel([]);
    setLanguages([]);
    setShowPoints(false);
    setShowBaseMap(false);
    // setBaseMapData([]); // TODO: removed this line to fix the bug of buffer not showing up after reset
    setSelectedFeature(null);
    setSelectedDisabledFeature(null);
    setFoundRegion(undefined);
    setLanguageState([]);
    setPointLFilterCountries([]);
    setShowCountryBorders(false);
    setCountryDisabled(false);
    setRegionDisabled(false);
    setClippingDisabled(false);
    setRegionBorders([]);
    setShowRegionBorders(false);
    setPointsQueryObject({ queryType: "none" });
    setPointsInMajorLanguages([]);
    setMinorLanguageCount(0);
    setPopulation(0);
    setClicked(false);
    setAllAccessStatuses([{ statusValue: "", count: 0, population: 0 }]);
    setSingleRegionSelection(undefined);
    setDeselectedCountries([]);
    setIsStaleData(true);
    setPreviousSelectedLanguages([]);
  };

  return { resetAll };
};

export default useResetAll;
