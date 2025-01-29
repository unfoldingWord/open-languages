"use client";

import {
  IconArrowLeft,
  IconCrop,
  IconPolygon,
  IconRefresh,
  IconSearch,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import CustomButton from "@components/Button";
import CountryDropdown from "@components/Dropdowns/CountryDropdown";
import LanguageDropdown from "@components/Dropdowns/LanguageDropdown";
import RegionDropdown from "@components/Dropdowns/RegionDropdown";
import LanguagePoints from "@components/LanguagePoints";
import Loader from "@components/Loader";
import LoginDialog from "@components/LoginDialog";
import NavProfileDropDown from "@components/NavProfileDropdown/index";
import OverlayModal from "@components/OverlayModal";
import SearchPoints from "@components/SeachPoints";
import SelectResourceLevel from "@components/Select/SelectResourceLevel";
import { TooltipWrapper } from "@components/Tooltip";
import { useAuth } from "@context/AuthProvider";
import { useInitialDataFetch } from "@hooks/useInitialDataFetch";
import { useAppContext } from "@hooks/useLanguages";
import useResetAll from "@hooks/useResetAll";
import { cn } from "@lib/utils";

export default function NavBar({
  backgroundColor,
  buttonBgColor,
}: {
  title?: string;
  subtitle?: string;
  tool?: string;
  backgroundColor: string;
  buttonBgColor?: string;
}) {
  const {
    showPoints,
    showCountryBorders,
    setShowCountryBorders,
    regionDisabled,
    showRegionBorders,
    setShowRegionBorders,
    showClusteredPoints,
    setShowClusteredPoints,
    clippingDisabled,
    initialLoading,
    setSearchedPointIndex,
    setShowSearchedPoint,
  } = useAppContext();

  useInitialDataFetch();
  const { resetAll } = useResetAll();

  const handleBorders = () => {
    if (regionDisabled) {
      setShowCountryBorders(!showCountryBorders);
      setShowRegionBorders ? setShowRegionBorders(false) : {};
    } else {
      setShowRegionBorders(!showRegionBorders);
      setShowCountryBorders ? setShowCountryBorders(false) : {};
    }
  };

  const path = usePathname();
  const resourcePath = path.includes("resource");
  const exportPath = path.includes("export");
  const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      {initialLoading && <OverlayModal isLoading={true} />}
      {initialLoading && <Loader />}
      <nav
        className={`fixed top-0 z-10 flex h-20 w-full justify-between px-4 ${backgroundColor}`}
      >
        <div className="hidden flex-col justify-center xl:flex">
          <span className="text-xs font-medium uppercase leading-loose tracking-wide text-secondary">
            {resourcePath
              ? "STRATEGIC LANGUAGES DASHBOARD"
              : "STRATEGIC LANGUAGES INITIATIVE"}
          </span>
          <span className="text-xs text-ol-lightgray-50">version 1.0</span>
        </div>
        {exportPath ? (
          ""
        ) : resourcePath ? (
          <div className="flex w-1/2 items-center justify-center">
            <p className="text-base font-bold uppercase text-white">
              Translation Resource Ecosystem (TRE)
            </p>
          </div>
        ) : (
          <div className="flex gap-4 divide-x divide-secondary-600">
            <div className="flex items-center gap-4">
              <RegionDropdown />
              <CountryDropdown />
              <LanguageDropdown />
              <SelectResourceLevel />
            </div>
            <div className="flex items-center gap-4 pl-4">
              <LanguagePoints />
              <TooltipWrapper tooltipMessage="Clip to Boundaries">
                <CustomButton
                  onClick={handleBorders}
                  buttonStyles={cn(
                    "flex mt-1 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium outline-none",
                    clippingDisabled
                      ? "bg-gray-600 text-white placeholder:text-white"
                      : showRegionBorders || showCountryBorders
                      ? "bg-secondary"
                      : "bg-secondary-600"
                  )}
                  label={
                    <IconCrop
                      className={cn(
                        "h-5 w-5",
                        clippingDisabled
                          ? "bg-gray-600 text-white placeholder:text-white"
                          : showRegionBorders || showCountryBorders
                          ? "bg-secondary text-black"
                          : "bg-secondary-600 text-white"
                      )}
                      strokeWidth={1.5}
                    />
                  }
                  disabled={clippingDisabled}
                />
              </TooltipWrapper>
              {showPoints && (
                <TooltipWrapper tooltipMessage="Cluster Points">
                  <CustomButton
                    onClick={() => {
                      setShowClusteredPoints((prev) => !prev);
                      setSearchedPointIndex(undefined);
                      setShowSearchedPoint(true);
                    }}
                    buttonStyles={cn(
                      "flex mt-1 items-center gap-1.5 rounded-lg bg-secondary-600 px-3 py-2 text-sm font-medium outline-none",
                      showClusteredPoints ? "bg-secondary" : "bg-secondary-600"
                    )}
                    label={
                      <IconPolygon
                        className={cn(
                          "h-5 w-5",
                          showClusteredPoints ? "text-black" : "text-white"
                        )}
                        strokeWidth={1.5}
                      />
                    }
                  />
                </TooltipWrapper>
              )}
              <TooltipWrapper tooltipMessage="Search minor languages">
                <SearchPoints />
              </TooltipWrapper>
              <TooltipWrapper tooltipMessage="Reset Map">
                <CustomButton
                  onClick={resetAll}
                  buttonStyles="mt-1 flex items-center gap-1.5 rounded-lg bg-secondary-600 px-3 py-2 text-sm font-medium outline-none"
                  label={
                    <IconRefresh
                      className="h-5 w-5 text-white"
                      strokeWidth={1.5}
                    />
                  }
                />
              </TooltipWrapper>
            </div>
          </div>
        )}
        <div className="ml-2 flex cursor-pointer items-center gap-4">
          {user ? (
            <NavProfileDropDown />
          ) : (
            <LoginDialog buttonColor={buttonBgColor} />
          )}
        </div>
      </nav>
    </>
  );
}
