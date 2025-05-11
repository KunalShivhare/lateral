import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useSearch } from "../../context/SearchContext";

type SidebarItem = {
  title: string;
  isActive?: boolean;
};

const savedSearchItems: SidebarItem[] = [
  { title: "Broken Payment" },
  { title: "Unassigned Cases" },
  { title: "Assigned to Cases", isActive: true },
  { title: "Viewed Recently" },
  { title: "30+ Days of Inactivity" },
];

const savedListItems: SidebarItem[] = [
  { title: "Assignments" },
  { title: "My To Do's" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const {
    searchQuery,
    setSearchQuery,
    isNewSearchActive,
    setIsNewSearchActive,
  } = useSearch();

  const handleTabChange = (tab: string) => {
    if (tab === "new") {
      setIsNewSearchActive(true);
    } else {
      setIsNewSearchActive(false);
    }
  };

  return (
    <div
      className={cn(
        "h-full bg-[#0000004D] flex flex-col transition-all duration-300 relative",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-[#1a1e23] border border-[#3F3F3F] rounded-full p-1 hover:bg-[#1A1A1A] transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-white" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-white" />
        )}
      </button>

      <div className="flex-1 flex flex-col overflow-auto px-2">
        {!isCollapsed && (
          <div className="flex pt-2 border-b border-[#3F3F3F]">
            <button
              className={cn(
                "flex-1 relative text-xs font-normal text-white pb-4"
              )}
              onClick={() => handleTabChange("saved")}
            >
              Saved Searches
              {!isNewSearchActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
              )}
            </button>
            <button
              className={cn(
                "flex-1 relative text-xs font-normal text-gray-400 pb-4"
              )}
              onClick={() => handleTabChange("new")}
            >
              New Search
              {isNewSearchActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
              )}
            </button>
          </div>
        )}

        {!isNewSearchActive && (
          <>
            <ul className="mt-2">
              {savedSearchItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={cn(
                      "block px-6 py-2 text-xs text-white font-normal hover:bg-[#12171b]",
                      isCollapsed && "flex justify-center py-4"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isCollapsed ? (
                      <span className="text-lg">🔍</span>
                    ) : (
                      item.title
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {!isCollapsed && (
              <>
                <div className="h-px bg-[#2a3036] mx-0 my-4"></div>

                <div className="px-6 py-2">
                  <h3 className="text-sm font-normal text-white">
                    My Saved Lists
                  </h3>
                </div>

                <ul>
                  {savedListItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className={cn(
                          "block px-6 py-2 text-xs text-white font-normal hover:bg-[#12171b]",
                          isCollapsed && "flex justify-center py-4"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        {isCollapsed ? (
                          <span className="text-lg">📋</span>
                        ) : (
                          item.title
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}

        {!isCollapsed && isNewSearchActive && (
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1e23] border border-[#3F3F3F] rounded py-2 px-4 text-xs text-white pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
