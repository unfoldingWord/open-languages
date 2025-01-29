import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconCaretDown, IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@context/AuthProvider";

export default function NavProfileDropDown() {
  const { signOut, user } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    const { error } = await signOut();

    if (error) {
      console.error("ERROR signing out:", error);
    } else {
      console.log("Successfully signed out!");
      router.push("/");
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-1 outline-none">
        <span className="font-semibold text-white">
          {user.user_metadata.first_name}
        </span>
        <IconCaretDown className="h-4 w-4 fill-gray-300 text-gray-300" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 mr-3 mt-1 flex min-w-[250px] flex-col rounded-md bg-white shadow-xl">
          <DropdownMenu.Item className="mt-5 flex select-none flex-col items-center justify-center px-4 leading-none outline-none">
            <span className="mb-2 text-xs font-bold leading-3 tracking-wide text-gray-700">
              {user.user_metadata.first_name} {user.user_metadata.last_name}
            </span>
            <span className="pb-2 text-xs font-bold leading-3 tracking-wide text-gray-700">
              {user.email}
            </span>
          </DropdownMenu.Item>
          <button
            className=" mt-4 flex cursor-pointer select-none items-center justify-center border-t py-3 text-sm text-gray-700 outline-none hover:rounded-b-md hover:text-primary"
            onClick={handleSignOut}
          >
            <DropdownMenu.Item
              className="flex items-center justify-center gap-1 "
              disabled
            >
              <IconLogout size={18} />
              <span className="text-sm font-semibold uppercase leading-4 tracking-wide hover:text-primary">
                Logout
              </span>
            </DropdownMenu.Item>
          </button>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
