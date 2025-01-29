"use client";
import React, { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { IconCheck, IconSelector } from "@tabler/icons-react";
import { IconStack2 } from "@tabler/icons-react";

import { useAppContext } from "@context/AppContext";
import { cn } from "@lib/utils";

const SelectLanguage = () => {
  const {
    clicked,
    setClicked,
    showPoints,
    setShowPoints,
    showBaseMap,
    setShowBaseMap,
    setSearchedPointIndex,
    setShowSearchedPoint,
  } = useAppContext();

  const handleClick = () => {
    setClicked((prev) => !prev);
    setShowPoints(!showPoints);
    setSearchedPointIndex(undefined);
    setShowSearchedPoint(false);
  };

  return (
    <>
      <Listbox>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex w-full items-center rounded-lg bg-secondary-600 py-2 pl-2 pr-7 text-sm font-medium outline-none">
            <span className="text-white">Layers</span>
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
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              <button
                onClick={handleClick}
                className="relative flex w-full cursor-pointer  items-center gap-2 border-none 
          py-2 pl-3 pr-10 text-left
          text-sm focus:outline-none  sm:text-sm"
              >
                <span className="text-black">Minor Languages</span>
                {showPoints ? (
                  <span
                    className={cn(
                      "absolute inset-y-0 right-2 flex items-center",
                      showPoints && "text-black"
                    )}
                  >
                    <IconCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </button>
              <button
                onClick={() => setShowBaseMap((prev) => !prev)}
                className="relative flex w-full  cursor-pointer items-center gap-2 border-none 
          py-2 pl-3 pr-10 text-left
          text-sm focus:outline-none sm:text-sm"
              >
                <span className="text-black">Buffered Layer</span>
                {showBaseMap ? (
                  <span
                    className={cn(
                      "absolute inset-y-0 right-2 flex items-center",
                      showBaseMap && "text-black"
                    )}
                  >
                    <IconCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default SelectLanguage;
