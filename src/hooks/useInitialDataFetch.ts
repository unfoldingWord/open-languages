import { useEffect, useState, useContext } from "react";

import { AppContext } from "@context/AppContext";
import { decompressPolygonJson } from "@utils/brotli";

export const useInitialDataFetch = () => {
  const {
    setLanguageData,
    setRegionBorders,
    setLanguagesArray,
    setBaseMapData,
    setlanguagePoints,
    setCountryBorders,
    setRegionCountryWiseBorderData,
    setLoadingBarProgress,
    setInitialLoading,
  } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getRegions = async () => {
          const apiRes = await fetch(`/api/data`);
          const regionList = await apiRes.json();

          console.table({ regionList });
          setLanguageData(regionList);
          setRegionBorders(regionList);
          incrementProgress();
        };

        const getLanguages = async () => {
          const apiRes = await fetch(`/api/language`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const bufferedLayer = await fetch(`/api/bufferedLayer`, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const { data: compressedData, error } = await apiRes.json();

          console.time("decompress");

          const data = await Promise.all(
            compressedData.map(async (item: any) => {
              const { compressed_polygon, ...rest } = item;
              const polygon = await decompressPolygonJson(compressed_polygon);
              return { ...rest, polygon };
            })
          );

          console.timeEnd("decompress");

          console.log("LANGUAGES");
          console.table(data);

          const { data: bufferedLayerData } = await bufferedLayer.json();
          console.log("BUFFERED LAYER");
          console.table(bufferedLayerData);
          if (error) console.log({ error });
          if (data) {
            setLanguagesArray(data);
            const polygonsArray = bufferedLayerData?.flatMap(
              (item: any) => item.polygon
            );
            setBaseMapData(polygonsArray);
          }
          incrementProgress();
        };

        const getPoints = async () => {
          const apiREs = await fetch(`/api/languagepoints`, {
            next: {
              revalidate: 1800, // every 30 minutes,
            },
          });
          const languageList = await apiREs.json();
          setlanguagePoints(languageList);
          incrementProgress();
        };

        const getCountryBorders = async () => {
          const apiRes = await fetch(`/api/countryborders`);
          const countryBorders = await apiRes.json();
          if (countryBorders.length !== 0) {
            setCountryBorders(countryBorders);
            setRegionCountryWiseBorderData(countryBorders);
          }
          incrementProgress();
        };

        const incrementProgress = () => {
          setLoadingBarProgress((prevProgress) => prevProgress + 25); // Increment by 25 for each function call
        };

        await Promise.all([
          getRegions(),
          getLanguages(),
          getPoints(),
          getCountryBorders(),
        ]);

        // Update loading states here
        setInitialLoading(false);
      } catch (error) {
        console.error(error);
        setLoadingBarProgress(100);
      } finally {
        setLoadingBarProgress(100);
      }
    };

    fetchData();
  }, []);

  return;
};
