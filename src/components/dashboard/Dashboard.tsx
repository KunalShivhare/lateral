import { useParams } from "react-router-dom";
import { CaseDetails } from "./CaseDetails";
import { CaseHeader } from "./CaseHeader";
import { LinkedRecords } from "./LinkedRecords";
import { OpenInvoices } from "./OpenInvoices";
import { PaymentPlan } from "./PaymentPlan";
import { SettlementOffer } from "./SettlementOffer";
import { TabsArea } from "./TabsArea";
import { TaskList } from "./TaskList";
import { PageLayout } from "../layout/PageLayout";

export function Dashboard() {
  const { caseId } = useParams();
  return (
    <PageLayout>
      <div className="flex h-full">
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          <div className="flex items-center mb-4 text-slate-400">
            <button className="flex items-center mr-4 text-white ">
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
            <div className="ml-auto text-sm text-[#BABABA]">#{caseId}</div>
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

          <CaseHeader />

          <div className="py-6">
            <TabsArea />
            <TaskList />
            <PaymentPlan />
            <LinkedRecords />
            <OpenInvoices />
            <SettlementOffer />
          </div>
        </div>

        <CaseDetails />
      </div>
    </PageLayout>
  );
}
