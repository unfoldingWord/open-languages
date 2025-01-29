import { Dispatch, SetStateAction, useState } from "react";

import { IResourceType } from "@utils/types/dashboardData";

export default function Bar({
  bgColor,
  height,
  onClick,
}: {
  bgColor: string;
  language: string;
  resourceType: string;
  resourceLevel?: string;
  status?: string;
  height: string;
  priority?: string;
  onClick: Dispatch<SetStateAction<IResourceType | any>>;
}) {
  return (
    <span
      onClick={onClick}
      className={`flex w-8 ${bgColor} cursor-pointer`}
      style={{ height }}
    ></span>
  );
}
