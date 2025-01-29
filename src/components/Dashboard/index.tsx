"use client";
import React, { useState, useEffect } from "react";

import { IconChevronDown } from "@tabler/icons-react";

import Bar from "@components/Bar";
import ColorFulText from "@components/ColorFulText";
import RightResourceInfoCard from "@components/RightResourceInfoCard";
import { cn } from "@lib/utils";
import {
  Info,
  IFormattedData,
  IResourceType,
} from "@utils/types/dashboardData";
import { Dmsans } from "src/app/font";

const Dashboard = () => {
  const [resourceData, setResourceData] = useState([]);
  const [resourceType, setResourceType] = useState([]);
  const [selectedLanguage, setSelectedLanguage] =
    useState<Record<string, string>>();

  function formatData(resourceData: Info[]) {
    const formattedData: IFormattedData = {};
    for (const item of resourceData) {
      if (!formattedData[item.Language.Language]) {
        formattedData[item.Language.Language] = { Info: [] };
      }
      formattedData[item.Language.Language].Info.push({
        ResourceType: item.resource_type,
        ResourceLevel: item.resource_level_link.map(
          (item) => item.resource_level
        ),
        Priority: item.priority,
        Status: item.status,
      });
    }
    return formattedData;
  }

  const handleLanguageClick = (language: Record<string, string>) => {
    setSelectedLanguage(language);
  };

  const data = formatData(resourceData as Info[]);
  // Extracting all the languages
  const languages = Object.keys(data);

  const resourceArr = data?.English?.Info?.map(
    (language) => language.ResourceType
  );

  const lastIndex = resourceArr?.length - 1;

  const [currentIndex, setCurrentIndex] = useState<number[]>([0]);

  const handleClick = (
    child: IResourceType[] | undefined,
    selectedIndex: number
  ) => {
    if (child) {
      // Check if the current index array already includes the selected index
      if (currentIndex.includes(selectedIndex)) {
        // If the selected index is already in the array, remove it
        setCurrentIndex(
          currentIndex.filter((index) => index !== selectedIndex)
        );
      } else {
        // If the selected index is not in the array, add it
        setCurrentIndex([...currentIndex, selectedIndex]);
      }
      // Check if the current index array already includes the selected index
      if (currentIndex.includes(selectedIndex)) {
        // If the selected index is already in the array, remove it
        setCurrentIndex(
          currentIndex.filter((index) => index !== selectedIndex)
        );
      } else {
        // If the selected index is not in the array, add it
        setCurrentIndex([...currentIndex, selectedIndex]);
      }
    }
  };

  async function getResourceData() {
    try {
      const apiREs = await fetch(`/api/resources`);
      const resourceData = await apiREs.json();
      setResourceData(resourceData.resources);
      setResourceType(resourceData.resourceType);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getResourceData();
  }, []);

  return (
    <div className="bg-white">
      {!selectedLanguage ? (
        ""
      ) : (
        <RightResourceInfoCard selectedLanguage={selectedLanguage} />
      )}
      <div className="pb-24 pl-56">
        {resourceType &&
          resourceType.map((resource: IResourceType, resourceIndex: number) => {
            return (
              <>
                {!resource.parent_item && (
                  <div
                    key={resourceIndex}
                    className="flex items-center gap-5 py-1"
                  >
                    <div className="relative flex">
                      <ColorFulText
                        font="font-bold"
                        onCLick={() =>
                          handleClick(resource.children, resourceIndex)
                        }
                        text={resource.type}
                        color={resource.color}
                      />
                      {resource.children && (
                        <IconChevronDown
                          className={cn(
                            "absolute -right-6 top-1 h-4 w-4 -translate-x-1/2 cursor-pointer text-gray-400",
                            resource.children &&
                              currentIndex.includes(resourceIndex)
                              ? "-rotate-180"
                              : ""
                          )}
                        />
                      )}
                    </div>

                    <div className="relative flex gap-5">
                      {languages.map((language) => {
                        const infoObj = data[language].Info.filter(
                          (info) => info.ResourceType === resource.type
                        )[0];
                        return (
                          <Bar
                            key={resourceIndex}
                            onClick={() => handleLanguageClick(infoObj)}
                            height={resource.height}
                            bgColor={cn(
                              infoObj?.Status === "yellow" && "bg-yellow-500",
                              infoObj?.Status === "green" && "bg-green-500",
                              infoObj?.Status === "red" && "bg-red-500",
                              infoObj?.Status === "light gray" && "bg-gray-300"
                            )}
                            language={language}
                            resourceType={resource.type}
                          />
                        );
                      })}
                      {resourceIndex === lastIndex && (
                        <div className="absolute inset-x-0 -bottom-10 flex gap-5">
                          {languages.map((language, index: number) => {
                            return (
                              <div
                                key={index}
                                className="flex w-8 -rotate-90 justify-end"
                              >
                                {language === "Arabic, Juba" ? (
                                  <p className="text-sm text-black">Arabic</p>
                                ) : language === "Chinese, Gan" ? (
                                  <p className="text-sm text-black">Chinese</p>
                                ) : (
                                  <p className="text-sm text-black">
                                    {language}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col">
                  {resource.children &&
                    currentIndex.includes(resourceIndex) &&
                    resource.children.map((child, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-5 py-1"
                        >
                          <ColorFulText
                            font={`${Dmsans.className}`}
                            key={resourceIndex}
                            text={child.resourceType}
                            color={child.color}
                          />
                          {languages.map((language, index: number) => {
                            const infoChildObj = data[language].Info.filter(
                              (info) => info.ResourceType === child.resourceType
                            )[0];

                            return (
                              <div
                                key={index}
                                className="flex flex-col items-center justify-center gap-2"
                              >
                                <Bar
                                  key={index}
                                  onClick={() =>
                                    handleLanguageClick(infoChildObj)
                                  }
                                  height={child.height}
                                  bgColor={cn(
                                    infoChildObj?.Status === "yellow" &&
                                      "bg-yellow-500",
                                    infoChildObj?.Status === "green" &&
                                      "bg-green-500",
                                    infoChildObj?.Status === "red" &&
                                      "bg-red-500",
                                    infoChildObj?.Status === "light gray" &&
                                      "bg-gray-300"
                                  )}
                                  language={language}
                                  resourceType={child.type}
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
