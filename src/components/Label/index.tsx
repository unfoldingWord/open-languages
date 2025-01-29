interface LabelProps {
  number?: string | number;
  bgColor?: string;
  textColor?: string;
  className: string;
}

export default function Label({
  number,
  bgColor,
  textColor,
  className,
}: LabelProps) {
  return (
    <div
      className={`flex h-5 items-center justify-center ${className} rounded-lg bg-black px-2.5 py-3 ${bgColor} ${textColor}`}
    >
      <span className="text-xs">{number}</span>
    </div>
  );
}
