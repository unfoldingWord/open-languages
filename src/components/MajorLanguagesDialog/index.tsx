import { IconArrowsMaximize } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ShadcnUi/dialog";
import { useQueryContext } from "@context/QueryContext";
import { useFetchQueryData } from "@hooks/useFetchQueryData";
import Spinner from "@public/assets/spinner.svg";

export function MajorLanguagesDialog() {
  const { majorLanguageListArray, majorLanguageList } = useFetchQueryData();

  const { queryIsLoading, setQueryIsLoading } = useQueryContext();

  const LanguageList = majorLanguageListArray.slice(0, 2) + "...";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex h-10 w-full cursor-pointer items-center rounded-t-2xl bg-black">
          <span className="pl-3 text-sm text-white">
            {majorLanguageList.length !== 0 ? LanguageList : "Languages"}
          </span>

          {queryIsLoading ? (
            <Spinner className="absolute right-3 flex h-6 w-6 animate-spin fill-white text-primary" />
          ) : (
            <div className="ml-auto flex h-10 w-16 items-center justify-center gap-2 rounded-tr-2xl bg-primary px-3 py-2">
              <span className="rounded-full border border-secondary px-1.5 py-0.5 text-xs text-white">
                {majorLanguageListArray.length}
              </span>
              <span className="">
                <IconArrowsMaximize
                  className="h-5 w-5 rounded-full text-white"
                  strokeWidth={1.5}
                />
              </span>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="fixed right-5 top-80 max-h-[480px] min-h-[100px] sm:max-w-[425px]">
        <DialogHeader className="h-full">
          {majorLanguageListArray.length !== 0 ? (
            <DialogTitle className="text-center">
              Major Languages selected
            </DialogTitle>
          ) : (
            <DialogTitle className="mt-6 text-center text-black">
              No Major Languages selected
            </DialogTitle>
          )}
        </DialogHeader>
        <div className="ml-10 flex max-h-[414px] flex-col overflow-auto border-black text-black">
          {majorLanguageListArray.map((language: string, index: number) => {
            return (
              <span key={index} className="pb-2">
                {language}
              </span>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
