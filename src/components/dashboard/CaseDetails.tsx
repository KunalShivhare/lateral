import * as React from "react";

export function CaseDetails({
  caseDetails,
  debtor,
}: {
  caseDetails: any;
  debtor: any;
}) {
  const [otherInfoExpanded, setOtherInfoExpanded] = React.useState(true);
  const [loremIpsumExpanded, setLoremIpsumExpanded] = React.useState(false);

  return (
    <div className="w-[20%] flex-shrink-0 border-l border-slate-800 overflow-y-auto h-screen">
      <div className="p-4 flex items-center">
        <h2 className="text-white text-sm font-medium">Case Details</h2>
        <button className="text-[#058FFF] text-xs pl-2">Edit</button>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">CV Client Code</span>
          <span className="text-white text-xs">{caseDetails?.client_id}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Client Name</span>
          <span className="text-white text-xs">{debtor?.debtor_name}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Client Trading Name</span>
          <span className="text-white text-xs">
            {debtor?.debtor_trading_as}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Client Account Number</span>
          <span className="text-white text-xs">
            {caseDetails?.client_account_number}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Workflow Title</span>
          <span className="text-blue-500 text-xs">
            {caseDetails?.workflow_title}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Agent Name</span>
          <span className="text-blue-500 text-xs">
            {caseDetails?.agent_name}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Stage Name</span>
          <span className="text-blue-500 text-xs">Email Phase template</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Date of Assignment</span>
          <span className="text-white text-xs">Aug 21, 2023</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">Case Age</span>
          <span className="text-white text-xs">186 Days</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400 text-xs">
            Total Outstanding Balance
          </span>
          <span className="text-white text-xs">
            ${caseDetails?.d_outstanding}
          </span>
        </div>
      </div>

      <button
        className="flex items-center justify-between w-full p-4 border-y border-slate-800"
        onClick={() => setOtherInfoExpanded(!otherInfoExpanded)}
      >
        <span className="text-white font-medium">Other information</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-slate-400 transition-transform ${
            otherInfoExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {otherInfoExpanded && (
        <div className="p-4 border-b border-slate-800">
          <p className="text-slate-400 text-sm">
            No other information available
          </p>
        </div>
      )}

      <button
        className="flex items-center justify-between w-full p-4 border-b border-slate-800"
        onClick={() => setLoremIpsumExpanded(!loremIpsumExpanded)}
      >
        <span className="text-white font-medium">Lorem Ipsum information</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-slate-400 transition-transform ${
            loremIpsumExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {loremIpsumExpanded && (
        <div className="p-4 border-b border-slate-800">
          <p className="text-slate-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      )}
    </div>
  );
}
