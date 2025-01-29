import { useEffect, useState } from "react";

import supabase from "@utils/supabaseClient";
import { RegionDataProps, LanguageDataProps } from "@utils/types/downloadData";

export const useDownloadData = () => {
  const [majorLanguages, setMajorLanguages] = useState<LanguageDataProps[]>([]);
  const [regionsData, setRegionData] = useState<RegionDataProps[]>([]);
  const [majorLanguagesInResourceLevel4, setMajorLanguagesInRsourceLevel4] =
    useState<LanguageDataProps[]>([]);
  useEffect(() => {
    async function fetchLanguagesData() {
      try {
        const { data, error } = await supabase
          .from("major_languages")
          .select(`id, language, iso, resource_level, bcp_47, country_overlap`);

        if (error) {
          throw error;
        }

        setMajorLanguages(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function fetchRegionsData() {
      try {
        const { data, error } = await supabase
          .from("minor_languages")
          .select(
            `id, language_name, language_code, region, country, first_language_pop`
          );

        if (error) {
          throw error;
        }

        setRegionData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    async function fetchLanguagesinResourceLevel4() {
      try {
        const { data, error } = await supabase
          .from("major_languages")
          .select(`id, language, iso, resource_level, bcp_47, country_overlap`)
          .eq("resource_level", 4);

        if (error) {
          throw error;
        }

        setMajorLanguagesInRsourceLevel4(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchRegionsData();
    fetchLanguagesData();
    fetchLanguagesinResourceLevel4();
  }, []);

  return {
    majorLanguages,
    regionsData,
    majorLanguagesInResourceLevel4,
  };
};
