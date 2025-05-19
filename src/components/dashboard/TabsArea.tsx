import * as React from "react";
import Overview from "./tabs/overview";

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

  // Render content for the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      default:
        return (
          <div className="p-6 min-h-[300px] flex items-center justify-center text-[#939292]">
            <p>{activeTab} content will go here</p>
          </div>
        );
    }
  };

  return (
    <div>
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

      {/* Tab content area */}
      {renderTabContent()}
    </div>
  );
}
