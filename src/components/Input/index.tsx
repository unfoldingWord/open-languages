import { IconSearch } from "@tabler/icons-react";

export default function Input({ bgColor }: { bgColor?: string }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Language"
        className="w-48 rounded-3xl bg-black px-4 py-2.5 text-sm text-white outline-none placeholder:text-sm placeholder:font-semibold placeholder:tracking-wide placeholder:text-secondary xl:w-72"
      />
      <div className="absolute right-2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <IconSearch className="h-5 w-5 text-secondary" />
      </div>
    </div>
  );
}
