"use client";

import { createContext, useContext, useState } from "react";

import { IQueryObject, IAllAccessStatus } from "@utils/types/queryTypes";
import { QueryContextType } from "@utils/types/queryTypes";

export const QueryContext = createContext<QueryContextType>(
  {} as QueryContextType
);

export const useQueryContext = () => {
  return useContext(QueryContext);
};

export default function QueryContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pointsQueryObject, setPointsQueryObject] = useState<IQueryObject>({
    queryType: "none",
  });
  const [pointsInMajorLanguages, setPointsInMajorLanguages] = useState<
    string[]
  >([]);
  const [minorLanguageCount, setMinorLanguageCount] = useState(0);
  const [population, setPopulation] = useState(0);
  const [allAccessStatuses, setAllAccessStatuses] = useState<
    IAllAccessStatus[]
  >([]);
  const [queryIsLoading, setQueryIsLoading] = useState(false);
  const [isStaleData, setIsStaleData] = useState(true);

  const contextValues = {
    pointsQueryObject,
    setPointsQueryObject,
    pointsInMajorLanguages,
    setPointsInMajorLanguages,
    minorLanguageCount,
    setMinorLanguageCount,
    population,
    setPopulation,
    allAccessStatuses,
    setAllAccessStatuses,
    queryIsLoading,
    setQueryIsLoading,
    isStaleData,
    setIsStaleData,
  };
  return (
    <QueryContext.Provider value={contextValues}>
      {children}
    </QueryContext.Provider>
  );
}
