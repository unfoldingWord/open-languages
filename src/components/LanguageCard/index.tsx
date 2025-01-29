export default function LanguageCard({ language }: { language: any }) {
  function statusColor(status: string) {
    if (status === "red") {
      return "🔴";
    } else if (status === "yellow") {
      return "🟡";
    } else if (status === "light gray") {
      return "⚪";
    }
    return "🟢";
  }
  return (
    <div className="space-y-0.5 rounded-b-md bg-white px-4 py-5 shadow">
      <p className="text-sm text-black">
        <strong className="">Resource Type:</strong> {language?.ResourceType}
      </p>
      <p className="text-sm text-black">
        <strong className="text-sm">Resource Level:</strong>{" "}
        {language.ResourceLevel.join(", ")}
      </p>
      <p className="text-sm text-black">
        <strong className="">Status:</strong>{" "}
        <span className="">{statusColor(language?.Status)}</span>
      </p>
      <p className="text-sm text-black">
        <strong className="text-black">Priority:</strong> {language?.Priority}
      </p>
    </div>
  );
}
