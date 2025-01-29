import React from "react";

import LanguageCard from "@components/LanguageCard";

export default function RightResourceInfoCard({
  selectedLanguage,
}: {
  selectedLanguage: Record<string, string>;
}) {
  return (
    <div className="fixed right-5 z-0 h-44 w-80">
      <div className="rounded-t-2xl bg-black py-2 pl-5">
        <span className="text-white">resource Details</span>
      </div>
      <LanguageCard language={selectedLanguage} />
    </div>
  );
}
