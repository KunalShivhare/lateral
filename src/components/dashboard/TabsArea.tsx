import * as React from "react";

const tabs = [
  "Overview",
  "Activity",
  "Payments",
  "Notes",
  "Communications",
  "Documents",
  "Tasks",
];

export function TabsArea() {
  const [activeTab, setActiveTab] = React.useState("Overview");

  return (
    <div className="border-b border-[#939292]">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`py-4 px-1 relative text-sm font-medium ${
              activeTab === tab
                ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500"
                : "text-[#939292]"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
