import Label from "@components/Label";
import { cn } from "@lib/utils";

export default function PolygonData({
  title,
  polygonData,
  classNames,
  count,
  population,
}: {
  title: string;
  polygonData?: string;
  classNames: string;
  count?: string | number;
  population?: number | string;
}) {
  return (
    <div className="grid grid-cols-6 items-center space-x-1 py-3 pl-2 pr-1 sm:space-x-2 xl:space-x-4">
      <div className="col-span-3 text-sm text-black">{title}</div>
      {count && (
        <div className="flex items-center gap-2">
          <Label
            className={cn("min-w-[2.5vw]", population === "NA" && "min-w-0")}
            number={count}
            bgColor="bg-black"
            textColor="text-secondary"
          />
        </div>
      )}
      {population && (
        <div className="col-span-2 flex items-center gap-2">
          <Label
            className={cn("min-w-[6vw]", population === "NA" && "min-w-0")}
            number={population}
            bgColor="bg-black"
            textColor="text-secondary"
          />
        </div>
      )}
    </div>
  );
}
