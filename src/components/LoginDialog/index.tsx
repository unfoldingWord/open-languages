import { IconLogin } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

import Auth from "@components/Auth";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/ShadcnUi/dialog";
import { cn } from "@lib/utils";

export default function LoginDialog({ buttonColor }: { buttonColor?: string }) {
  const path = usePathname();
  const resourcePath = path.includes("resource");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "relative flex w-full cursor-pointer items-center gap-1 overflow-hidden rounded-lg  border-none px-4 py-2 text-left text-sm leading-5 text-white shadow-md placeholder:text-white focus:outline-none sm:text-sm",
            resourcePath ? "bg-gray-600" : "bg-secondary-600",
            buttonColor
          )}
        >
          <IconLogin className="h-5 w-5" />
          <span className="font-semibold">Login</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[24rem]">
        <Auth />
      </DialogContent>
    </Dialog>
  );
}
