"use client";

import React from "react";

import { IconCloudDownload, IconTableExport } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import CustomButton from "@components/Button";
import { MajorLanguagesDialog } from "@components/MajorLanguagesDialog";
import { toast } from "@components/ShadcnUi/use-toast";
import { TooltipWrapper } from "@components/Tooltip";
import { useAppContext } from "@context/AppContext";
import { useAuth } from "@context/AuthProvider";
import { useQueryContext } from "@context/QueryContext";
import { useFetchQueryData } from "@hooks/useFetchQueryData";
import { cn } from "@lib/utils";
import { fetchRightInfoData } from "@utils/fetchRightInfoData";
import { formatNumberWithComma } from "@utils/formatNumberWithComma";
import {
  getInProgressCountnPop,
  getNotStartedCountnPop,
  getGoalMetSecondLang,
  getGoalMet,
  getNotShown,
} from "@utils/getUniqueStatusAndPopulation";

import PolygonData from "./PolygonData";

export default function RightMapInfoCard() {
  const router = useRouter();
  const { user } = useAuth();
  const {
    population,
    minorLanguageCount,
    allAccessStatuses,
    pointsQueryObject,
    setPointsInMajorLanguages,
    setMinorLanguageCount,
    setPopulation,
    setAllAccessStatuses,
    setQueryIsLoading,
    isStaleData,
    setIsStaleData,
  } = useQueryContext();
  const { initialLoading } = useAppContext();

  const formattedPopulation = formatNumberWithComma(population);
  const exportData = () => {
    if (!user) {
      toast({
        title: "You are not logged in",
        description: "Please login to download the csv file",
      });
    } else if (minorLanguageCount === 0) {
      toast({
        title: "No data to export",
        description: "Please select a data-set to export",
      });
    } else {
      router.push("/export");
    }
  };

  const { majorLanguageListArray } = useFetchQueryData();

  const fetchMinorLangPointsData = () => {
    if (majorLanguageListArray.length === 0) {
      toast({
        title: "No selection",
        description: "Please make some selection to retrieve data.",
      });
    } else {
      fetchRightInfoData({
        pointsQueryObject,
        setPointsInMajorLanguages,
        setMinorLanguageCount,
        setPopulation,
        setAllAccessStatuses,
        setQueryIsLoading,
        setIsStaleData,
      });
    }
  };

  return (
    <div className="fixed right-5 z-0 h-44">
      <MajorLanguagesDialog />
      <div className=" divide-gray-200 rounded-b-2xl bg-white shadow-md">
        <div className="grid grid-cols-6 space-x-1 py-2 pl-2 pr-1 text-sm font-semibold text-black sm:space-x-2 xl:space-x-4">
          <div className="col-span-3"></div>
          <div>Count</div>
          <div className="col-span-2">Population</div>
        </div>
        <PolygonData
          title="Minor Languages"
          classNames="pl-0"
          count={minorLanguageCount ? minorLanguageCount.toString() : "NA"}
          population={population ? formattedPopulation.toString() : "NA"}
        />
        <PolygonData
          title="Translation in Progress"
          classNames="pl-0"
          count={getInProgressCountnPop(allAccessStatuses).count}
          population={formatNumberWithComma(
            getInProgressCountnPop(allAccessStatuses).population
          )}
        />
        <PolygonData
          title="Translation Not Started"
          classNames="pl-0"
          count={getNotStartedCountnPop(allAccessStatuses).count}
          population={formatNumberWithComma(
            getNotStartedCountnPop(allAccessStatuses).population
          )}
        />
        <PolygonData
          title="Goal Met in the language"
          classNames="pl-0"
          count={getGoalMet(allAccessStatuses).count}
          population={formatNumberWithComma(
            getGoalMet(allAccessStatuses).population
          )}
        />
        <PolygonData
          title="Goal Met via 2nd Language"
          classNames="pl-0"
          count={getGoalMetSecondLang(allAccessStatuses).count}
          population={formatNumberWithComma(
            getGoalMetSecondLang(allAccessStatuses).population
          )}
        />
        <PolygonData
          title="Restricted"
          classNames="pl-0"
          count={getNotShown(allAccessStatuses).count}
          population={formatNumberWithComma(
            getNotShown(allAccessStatuses).population
          )}
        />
        <div className="flex items-center justify-center gap-8 border-t p-2">
          <TooltipWrapper tooltipMessage="Click here to update data">
            <CustomButton
              loading={initialLoading}
              onClick={fetchMinorLangPointsData}
              buttonStyles={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium outline-none",
                isStaleData && majorLanguageListArray.length === 0
                  ? "bg-gray-600 text-white"
                  : isStaleData
                  ? "bg-custom-pink text-white"
                  : "bg-primary text-white"
              )}
              label={"Fetch Data"}
              iconPosition="LEFT"
              icon={
                <IconCloudDownload
                  className="h-5 w-5 text-white"
                  strokeWidth={1.5}
                />
              }
            />
          </TooltipWrapper>
          <TooltipWrapper tooltipMessage="Click here to download datasets">
            <CustomButton
              onClick={exportData}
              buttonStyles={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium outline-none",
                isStaleData ? "bg-gray-600 text-white" : "bg-primary text-white"
              )}
              label="Export Data"
              iconPosition="LEFT"
              icon={
                <IconTableExport
                  className="h-5 w-5 text-white"
                  strokeWidth={1.5}
                />
              }
              disabled={isStaleData}
            />
          </TooltipWrapper>
        </div>
      </div>
    </div>
  );
}
