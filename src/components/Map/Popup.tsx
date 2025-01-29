import React from "react";

import { Popup } from "react-leaflet";

import { formatNumberWithComma, roundOff } from "@utils/formatNumberWithComma";
import { Point, SortedScore } from "@utils/types/points";

export const PopUp = ({ point }: { point: Point }) => {
  let sortedConfidenceScore: SortedScore = [];

  if (point.sorted_confidence_score) {
    if (typeof point.sorted_confidence_score === "string") {
      // Parse the JSON string into an array if it's a string
      sortedConfidenceScore = JSON.parse(point.sorted_confidence_score);
    } else if (Array.isArray(point.sorted_confidence_score)) {
      // If it's already an array (not a JSON string), use it directly
      sortedConfidenceScore = point.sorted_confidence_score;
    }
  }
  return (
    <Popup className="w-96">
      <span className="text-base font-bold">{point.language_name}</span>
      <div className="mt-2 space-y-2">
        <div className="flex justify-start gap-1">
          <span className="mr-1 text-base">
            <span className="font-bold">Population:</span>{" "}
            {formatNumberWithComma(point.first_language_pop)}
          </span>
        </div>
        <span className="text-base font-bold">
          Strategic Languages Overlap:
        </span>
        <table className="min-w-[21.25rem]">
          <thead className="border">
            <tr className="border">
              <th className="border px-2 py-1.5">Language</th>
              <th className="whitespace-nowrap border px-2 py-1.5">
                Resource Level
              </th>
              <th className="whitespace-nowrap border px-2 py-1.5">
                Confidence
              </th>
            </tr>
          </thead>
          <tbody className="border">
            {sortedConfidenceScore && sortedConfidenceScore?.length > 0 ? (
              sortedConfidenceScore
                .filter((item) => {
                  return Object.keys(item).some(
                    (language) => item[language].Score !== 0
                  );
                })
                .map((item) =>
                  Object.keys(item).map((language) => {
                    const score = item[language].Score;
                    const level = item[language].Level;
                    if (score !== 0) {
                      // Render only if the score is not 0
                      return (
                        <tr key={language}>
                          <td className="border px-2 py-1.5 text-center">
                            {language}
                          </td>
                          <td className="border px-2 py-1.5 text-center">
                            {level}
                          </td>
                          <td className="border px-2 py-1.5 text-center">
                            {score}%
                          </td>
                        </tr>
                      );
                    } else {
                      return null;
                    }
                  })
                )
            ) : (
              <tr>
                <td>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Popup>
  );
};
