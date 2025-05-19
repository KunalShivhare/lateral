import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_CASE_DETAILS } from "../../_lib/queries";
import { PageLayout } from "../layout/PageLayout";
import { CaseDetails } from "./CaseDetails";
import { CaseHeader } from "./CaseHeader";
import { TabsArea } from "./TabsArea";
import { useState } from "react";

export function Dashboard() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { data, loading } = useQuery(GET_CASE_DETAILS, {
    variables: { case_id: caseId },
  });
  const debtor = data?.rdebt_cases?.[0]?.debtor;
  const caseDetails = data?.rdebt_cases?.[0];
  return (
    <PageLayout>
      {loading ? (
        <>Loading...</>
      ) : (
        <div className="flex h-full">
          <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            <div className="flex items-center mb-4 text-slate-400">
              <button
                className="flex items-center mr-4 text-white"
                onClick={() => navigate(-1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
              <div 
                className="ml-auto text-sm text-[#BABABA] cursor-pointer relative group"
                onClick={() => {
                  navigator.clipboard.writeText(caseId || '');
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                #{caseId}
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {copied ? 'Copied!' : 'Click to copy'}
                </span>
              </div>
              <div className="flex ml-4 space-x-2">
                <button className="p-1 hover:bg-slate-800 rounded text-white">
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="p-1 hover:bg-slate-800 rounded text-white">
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <CaseHeader debtor={debtor} caseDetails={caseDetails} />

            <div className="py-6">
              <TabsArea />
            </div>
          </div>

          <CaseDetails caseDetails={caseDetails} debtor={debtor} />
        </div>
      )}
    </PageLayout>
  );
}
