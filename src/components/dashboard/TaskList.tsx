const tasks = [
  {
    id: 1,
    text: "This is a normal task that can be checked off right here",
    date: "Jul 1, 2034",
    isPredefine: false,
    user: "KS",
  },
  {
    id: 2,
    text: "This is a predefine task with where further action",
    date: "Jul 1, 2034",
    isPredefine: true,
    user: null,
  },
  {
    id: 3,
    text: "This is a normal task that can be checked off right here",
    date: "Jul 1, 2034",
    isPredefine: false,
    user: "KS",
  },
];

export function TaskList() {
  return (
    <div className="bg-[#090A0BBF] border-[1px] border-[#3F3F3F] rounded-lg mt-6 overflow-hidden">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-white text-base font-medium">Tasks</h3>
          <div className="text-[#8C8C8C] rounded-full px-2 text-base">10</div>
        </div>
        <button className="text-[#058FFF] flex items-center text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#058FFF"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add task
        </button>
      </div>

      <div className="divide-y divide-slate-800">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="mt-0.5">
                {task.isPredefine ? (
                  <div className="h-fit w-fit">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.75"
                        y="0.75"
                        width="22.5"
                        height="22.5"
                        rx="11.25"
                        fill="#262626"
                        stroke="#BFBFBF"
                        stroke-width="1.5"
                      />
                      <path
                        d="M8.01367 11L11.0222 14L16.0365 9"
                        stroke="#BFBFBF"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="h-fit w-fit rounded-full border border-slate-600 flex items-center justify-center hover:bg-slate-800 cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.75"
                        y="0.75"
                        width="22.5"
                        height="22.5"
                        rx="11.25"
                        fill="#262626"
                        stroke="#BFBFBF"
                        stroke-width="1.5"
                      />
                      <path
                        d="M8.01367 11L11.0222 14L16.0365 9"
                        stroke="#BFBFBF"
                        stroke-width="1.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <p className="text-slate-300 text-sm">{task.text}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-500 text-xs">{task.date}</span>
              {task.user && (
                <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-xs text-white">
                  {task.user}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
