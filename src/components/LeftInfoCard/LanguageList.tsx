import { useState } from "react";

import { IconEye } from "@tabler/icons-react";

import { IPolygon } from "@utils/types/mapData";

export default function LanguageList({
  language,
  handleShow,
}: {
  language: IPolygon;
  handleShow: (returningLanguage: IPolygon) => void;
}) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };
  return (
    <li
      onClick={() => handleShow(language)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex cursor-pointer items-center justify-between gap-3 p-2.5"
    >
      <span className="text-sm text-black">
        {language?.features[0].properties.language}
      </span>
      {show && (
        <button className="ml-auto">
          <IconEye className="h-5 w-5 text-black" />
        </button>
      )}
    </li>
  );
}
