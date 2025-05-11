import { useSearch } from "../../context/SearchContext";

export function CaseSearchFilter() {
  const { searchQuery, setSearchQuery, isNewSearchActive } = useSearch();

  // Only show if not using the sidebar search
  if (isNewSearchActive) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative ">
          <input
            type="text"
            placeholder="Search users and leads"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#8C8C8C] rounded py-2 pl-3 pr-10 text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#8C8C8C"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div>
          <button className="bg-[#3F3F3F] text-white rounded-full px-4 py-2 text-sm flex items-center">
            Assigned to
          </button>
        </div>

        <div>
          <button className="bg-[#3F3F3F] text-white rounded-full px-4 py-2 text-sm flex items-center ">
            Stage
          </button>
        </div>
        <div>
          <button className="text-blue-500 flex items-center gap-1 text-sm">
            <span>+</span>
            <span>Add filter</span>
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="text-blue-500 text-sm"
          onClick={() => setSearchQuery("")}
        >
          Clear Filters
        </button>
        <div className="mx-4"></div>
        <button className="text-blue-500 text-sm">Save Search</button>
      </div>
    </div>
  );
}
