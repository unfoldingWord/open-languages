import { parse } from "csv-parse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const minorLanguagesFiles: File | null = data.get(
    "minorLanguages"
  ) as unknown as File;
  const majorLanguagesFiles: File | null = data.get(
    "majorLanguages"
  ) as unknown as File;
  const json_key_format: string | null = data.get("json_key_format") as string;

  if (!majorLanguagesFiles || !minorLanguagesFiles) {
    return NextResponse.json({ success: false, message: "No files found" });
  }

  const majorLanguages = await readCSV(majorLanguagesFiles);
  const minorLanguages = await readCSV(minorLanguagesFiles);

  const formattedMinorLanguages = minorLanguages.map((minorLanguage) =>
    formatMinorLanguageData(minorLanguage, majorLanguages, json_key_format)
  );

  return NextResponse.json({ success: true, formattedMinorLanguages });
}

const readCSV = async (file: File) => {
  const records = [];
  const parser = parse(await file.text(), {
    columns: true,
    skip_empty_lines: true,
  });

  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

const formatMinorLanguageData = (
  minorLanguage: MinorLanguageInput,
  majorLanguages: Array<MajorLanguageInputs>,
  json_key_format = "{mjl} ({mjl_id})"
): FormattedMinorLanguageData => {
  const overlaps_ids =
    typeof minorLanguage.joined_overlaps === "string"
      ? minorLanguage.joined_overlaps.split(",").filter((id) => id.length > 0)
      : [];
  const overlaps_scores =
    typeof minorLanguage.joined_scores === "string"
      ? minorLanguage.joined_scores.split(",").map((score) => Number(score))
      : typeof minorLanguage.joined_scores === "number"
      ? [minorLanguage.joined_scores]
      : [];

  const overlaps_levels =
    typeof minorLanguage.joined_levels === "string"
      ? minorLanguage.joined_levels.split(",").map((level) => Number(level))
      : typeof minorLanguage.joined_levels === "number"
      ? [minorLanguage.joined_levels]
      : [];

  const overlaps = overlaps_ids.map((id, index) => {
    const majorLanguage = majorLanguages.find(
      (majorLanguage) => majorLanguage.iso === id
    );

    // const object_key = majorLanguage?.RevisedLanguageName + ` (${mjl_id})`;

    const object_key = json_key_format
      .replace("{mjl}", majorLanguage?.RevisedLanguageName ?? "")
      .replace("{mjl_id}", id);

    return {
      [object_key]: {
        Level: overlaps_levels[index],
        Score: overlaps_scores[index],
      },
    };
  });

  return {
    language_name: minorLanguage.language_name,
    language_code: minorLanguage.language_code,
    overlaps,
  };
};

interface MajorLanguageInputs {
  "Revised Resource Level": number;
  RevisedLanguageName: string;
  iso: string;
}
//
type FormattedMinorLanguageData = {
  language_name: string;
  language_code: string;
  overlaps: Array<Overlap>;
};

type Overlap = {
  [key: string]: {
    Level: number;
    Score: number;
  };
};

interface MinorLanguageInput {
  language_code: string;
  language_name: string;
  joined_overlaps: string;
  joined_scores: string | number;
  joined_levels: string | number;
}
