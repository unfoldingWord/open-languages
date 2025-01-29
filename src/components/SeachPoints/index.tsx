"use client";
import React, { useEffect, useState } from "react";

import { IconSearch } from "@tabler/icons-react";
import { useDebounce } from "use-debounce";
import { set } from "zod";

import CustomButton from "@components/Button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@components/ShadcnUi/command";
import { Input } from "@components/ShadcnUi/input";
import { useAppContext } from "@hooks/useLanguages";
import { cn } from "@lib/utils";
import { Point } from "@utils/types/points";

const SearchPoints = () => {
  const [open, setOpen] = useState(false);
  const {
    mapRef,
    minorLanguage,
    setMinorLanguage,
    languagePoints,
    setShowPoints,
    setSearchedPoint,
    setSearchedPointIndex,
    setShowSearchedPoint,
  } = useAppContext();
  const [foundPoint, setFoundPoint] = useState<Point[]>();
  const [debouncedValue] = useDebounce(minorLanguage, 500);

  function searchPoint() {
    const minorLang = languagePoints?.filter(
      (point) =>
        point.language_name
          .toLowerCase()
          .includes(debouncedValue.toLowerCase()) ||
        point.language_code.toLowerCase().includes(debouncedValue.toLowerCase())
    );

    setFoundPoint(minorLang);
  }

  const handleSelection = (point: Point) => {
    setShowPoints(true);
    setSearchedPoint(point);
    const pointIndex = languagePoints.findIndex(
      (p) => p.language_name === point.language_name
    );
    setSearchedPointIndex(pointIndex);
    const map = mapRef.current;
    map.setView([point.latitude, point.longitude], 14);
    setOpen(false);
  };

  useEffect(() => {
    if (debouncedValue !== "") {
      searchPoint();
    } else if (debouncedValue === "") {
      setFoundPoint([]);
    }
  }, [debouncedValue]);

  return (
    <>
      <CustomButton
        onClick={() => {
          setSearchedPointIndex(undefined);
          setShowSearchedPoint(true);
          setShowPoints(false);
          setFoundPoint([]);
          setSearchedPoint(undefined);
          setOpen(true);
        }}
        buttonStyles={cn(
          "flex mt-1 items-center gap-1.5 rounded-lg bg-secondary-600 px-3 py-2 text-sm font-medium outline-none"
        )}
        label={
          <IconSearch className={cn("h-5 w-5 text-white")} strokeWidth={1.5} />
        }
      />
      {open && (
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Input
            placeholder="Search minor languages..."
            value={minorLanguage}
            onChange={(e) => setMinorLanguage(e.target.value)}
          />
          <CommandList>
            <CommandGroup>
              <CommandEmpty>No results found.</CommandEmpty>
              {foundPoint &&
                foundPoint?.map((point) => (
                  <CommandItem
                    key={point.id}
                    onSelect={() => handleSelection(point)}
                    className="w-full cursor-pointer rounded-sm hover:bg-gray-100"
                  >
                    {point.language_name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      )}
    </>
  );
};

export default SearchPoints;
