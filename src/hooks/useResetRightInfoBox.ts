import { useQueryContext } from "@context/QueryContext";

export const useResetRightInfoBox = () => {
  const {
    setPointsQueryObject,
    setPointsInMajorLanguages,
    setMinorLanguageCount,
    setPopulation,
    setAllAccessStatuses,
    setIsStaleData,
  } = useQueryContext();

  const resetRightInfoBox = () => {
    setPointsQueryObject({} as any);
    setPointsInMajorLanguages([]);
    setMinorLanguageCount(0);
    setPopulation(0);
    setAllAccessStatuses([]);
    setIsStaleData(true);
  };
  return { resetRightInfoBox };
};
