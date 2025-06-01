export function CaseListHeader() {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        {/* <button className="p-1 bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button> */}
        <h2 className="text-xl font-semibold text-[var(--primary-text)]">
          Records
        </h2>
      </div>
      <div className="ml-auto">
        <a href="#" className="text-blue-500 text-sm">
          Advanced Search
        </a>
      </div>
    </div>
  );
}
