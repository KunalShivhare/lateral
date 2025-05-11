import { Badge } from "@/components/ui/badge";

export function CaseHeader() {
  return (
    <div className="bg-[#090A0BBF] border-[1px] border-[#3F3F3F] rounded-lg ">
      <div className="flex justify-between items-center px-3 pt-4">
        <div className="flex items-center space-x-2 bg-[#058FFF1A] rounded-lg px-4 py-2">
          <div className="h-4 w-4 rounded-full bg-[#058FFF]"></div>
          <div className="text-[#058FFF] text-sm">On arrangement</div>
        </div>
        <div>
          <div className="flex justify-end space-x-2">
            <Badge variant="outline" className="bg-black text-white px-4 py-2">
              H&S WARNING
            </Badge>
            <Badge variant="outline" className="bg-black text-white px-4 py-2">
              V1 - VULNERABLE
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex px-3">
        <div className="w-[90%] p-2 mt-4">
          <h2 className="text-2xl font-semibold text-white">
            Buff Outdoor Carpets
          </h2>
          <div className="space-y-1 text-white">
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span className="text-sm">
                615-249-9565 <span className="text-[#BABABA]">(Mobile)</span> |
                358-772-2657 <span className="text-[#BABABA]">(Work)</span>
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="text-sm">
                2479 Lincoln Drive, Leola, ON, N4K 2L7
              </span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-sm">Buffcarpets@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="p-2 mt-4">
          <div className="text-left">
            <div className="text-slate-400 text-sm">Total Outstanding</div>
            <div className="text-white text-2xl font-semibold">£120,372.00</div>
          </div>
          <div className="text-left">
            <div className="text-slate-400 text-sm">Payments</div>
            <div className="text-green-400 font-semibold">£2,534.00</div>
          </div>
        </div>
      </div>

      <div className="flex border-t border-[#3F3F3F] mt-4 px-3 py-2 space-x-3">
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button className="p-2 text-slate-400 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
