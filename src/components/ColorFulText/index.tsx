"use client";
export default function ColorFulText({
  text,
  color,
  onCLick,
  font,
}: {
  text: string;
  color?: string;
  font?: string;
  onCLick?: () => void;
}) {
  return (
    <div className="flex w-[20vw] items-center justify-end text-sm">
      <h3
        onClick={onCLick}
        className={`cursor-pointer text-sm ${font}`}
        style={{ color }}
      >
        {text}
      </h3>
    </div>
  );
}
