import { dataSources } from "@utils/data/dataSources";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex w-screen items-center justify-between bg-white p-3">
      <span className="text-sm font-bold tracking-wider text-black">
        OPENLANGUAGES.IO
      </span>
      <div className="space-x-8 text-xs text-black">
        <span className="cursor-default font-semibold tracking-wider">
          Data Sources:
        </span>
        {dataSources.map((source, index) => {
          return (
            <span key={index}>
              {source.name === "SevenX" && <span>developed by </span>}
              <a
                href={source.sourceUrl}
                target="_blank"
                className="cursor-pointer tracking-wider hover:underline"
              >
                {source.name}
              </a>
            </span>
          );
        })}
      </div>
      <div className="flex gap-2 text-xs text-gray-400">
        <span>© {new Date().getFullYear()}</span>
        <h4 className="tracking-wider">Openlanguages.io</h4>
      </div>
    </footer>
  );
};
