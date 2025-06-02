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
        "h-full bg-[var(--sidebar-background)] flex flex-col transition-all duration-300 relative",
        isCollapsed ? "w-8" : "w-64"
      )}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-6 bg-[var(--sidebar)] border-[1px] border-[#3F3F3F] justify-center items-center rounded-full p-2 transition-colors z-10 `}
      >
        {isCollapsed ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: "rotate(180deg)",
            }}
          >
            <path
              d="M10.0096 8.86152L16.9341 14.2501C17.3705 14.5901 18 14.2756 18 13.7189L18 12.2485C18 12.0445 17.9035 11.849 17.744 11.7216L12.7122 7.80759C12.3723 7.54411 12.3723 7.0214 12.7122 6.75367L17.744 2.84396C17.9035 2.71647 18 2.52523 18 2.317L18 0.833854C18 0.285645 17.3747 -0.0288314 16.9466 0.306893L10.0096 5.704L8.68343 6.76217C8.3519 7.02565 8.3519 7.53986 8.68343 7.80334L10.0096 8.86152Z"
              fill="#058FFF"
            />
            <path
              opacity="0.7"
              d="M2.1834 8.86317L9.10788 14.2502C9.54433 14.59 10.1738 14.2757 10.1738 13.7191L10.1738 12.2492C10.1738 12.0452 10.0773 11.8498 9.91783 11.7224L4.88605 7.80956C4.54612 7.54616 4.54612 7.0236 4.88605 6.75595L9.91783 2.84316C10.0773 2.71571 10.1738 2.52453 10.1738 2.31635L10.1738 0.833656C10.1738 0.285611 9.54853 -0.0287723 9.12047 0.306853L2.1834 5.70234L0.857263 6.7602C0.525728 7.0236 0.525728 7.53766 0.857263 7.80106L2.1834 8.85892L2.1834 8.86317Z"
              fill="#058FFF"
            />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0096 8.86152L16.9341 14.2501C17.3705 14.5901 18 14.2756 18 13.7189L18 12.2485C18 12.0445 17.9035 11.849 17.744 11.7216L12.7122 7.80759C12.3723 7.54411 12.3723 7.0214 12.7122 6.75367L17.744 2.84396C17.9035 2.71647 18 2.52523 18 2.317L18 0.833854C18 0.285645 17.3747 -0.0288314 16.9466 0.306893L10.0096 5.704L8.68343 6.76217C8.3519 7.02565 8.3519 7.53986 8.68343 7.80334L10.0096 8.86152Z"
              fill="#058FFF"
            />
            <path
              opacity="0.7"
              d="M2.1834 8.86317L9.10788 14.2502C9.54433 14.59 10.1738 14.2757 10.1738 13.7191L10.1738 12.2492C10.1738 12.0452 10.0773 11.8498 9.91783 11.7224L4.88605 7.80956C4.54612 7.54616 4.54612 7.0236 4.88605 6.75595L9.91783 2.84316C10.0773 2.71571 10.1738 2.52453 10.1738 2.31635L10.1738 0.833656C10.1738 0.285611 9.54853 -0.0287723 9.12047 0.306853L2.1834 5.70234L0.857263 6.7602C0.525728 7.0236 0.525728 7.53766 0.857263 7.80106L2.1834 8.85892L2.1834 8.86317Z"
              fill="#058FFF"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 flex flex-col overflow-auto px-2">
        {!isCollapsed && (
          <div className="flex pt-2 border-b border-[var(--underline)]">
            <button
              className={cn(
                "flex-1 relative text-xs font-normal text-[var(--primary-text)] pb-4"
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
                "flex-1 relative text-xs font-normal text-[#929292] pb-4"
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
                      "block px-6 py-2 text-xs text-[var(--primary-text)] font-normal hover:bg-[var(--underline)]",
                      isCollapsed && "flex justify-center py-4"
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    {isCollapsed ? (
                      <span className="text-lg"></span>
                    ) : (
                      item.title
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {!isCollapsed && (
              <>
                <div className="h-px bg-[var(--underline)] mx-0 my-4"></div>

                <div className="px-6 py-2">
                  <h3 className="text-sm font-normal text-[var(--primary-text)]">
                    My Saved Lists
                  </h3>
                </div>

                <ul>
                  {savedListItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className={cn(
                          "block px-6 py-2 text-xs text-[var(--primary-text)] font-normal hover:bg-[var(--underline)]",
                          isCollapsed && "flex justify-center py-4"
                        )}
                        title={isCollapsed ? item.title : undefined}
                      >
                        {isCollapsed ? (
                          <span className="text-lg"></span>
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
