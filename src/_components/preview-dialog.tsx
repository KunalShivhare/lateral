import * as React from "react";
import { X } from "lucide-react";
import { type CustomTask } from "../_lib/custom-data";
import { cn } from "@/lib/utils";
import { CaseHeader } from "@/components/dashboard/CaseHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CASE_DETAILS } from "../_lib/queries";
import { GET_ADJACENT_CASES } from "../_lib/queries";
import { useEffect, useState } from "react";
import { CaseDetails } from "@/components/dashboard/CaseDetails";

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  caseId: string;
}

export function PreviewDialog({ isOpen, onClose, caseId }: PreviewDialogProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [prevCaseId, setPrevCaseId] = useState<string | null>(null);
  const [nextCaseId, setNextCaseId] = useState<string | null>(null);

  // Only fetch data when the dialog is open and we have a caseId
  const { data, loading } = useQuery(GET_CASE_DETAILS, {
    variables: { case_id: caseId },
    skip: !isOpen || !caseId,
    fetchPolicy: "network-only", // Don't use cache to ensure fresh data
  });

  // Query to get adjacent cases - only when dialog is open
  const { data: adjacentCasesData } = useQuery(GET_ADJACENT_CASES, {
    variables: { current_id: caseId },
    skip: !isOpen || !caseId,
    fetchPolicy: "network-only",
  });

  // Update prev and next case IDs when data changes
  useEffect(() => {
    if (adjacentCasesData) {
      const prevCase = adjacentCasesData.prev_case?.[0];
      const nextCase = adjacentCasesData.next_case?.[0];

      setPrevCaseId(prevCase ? prevCase.id : null);
      setNextCaseId(nextCase ? nextCase.id : null);
    }
  }, [adjacentCasesData]);

  // Navigate to previous case
  const goToPrevCase = () => {
    if (prevCaseId) {
      navigate(`/dashboard/${prevCaseId}`);
    }
  };

  // Navigate to next case
  const goToNextCase = () => {
    if (nextCaseId) {
      navigate(`/dashboard/${nextCaseId}`);
    }
  };
  const debtor = data?.rdebt_cases?.[0]?.debtor;
  const caseDetails = data?.rdebt_cases?.[0];

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-0 right-0 h-full flex flex-col transition-all duration-300 z-50 border-l border-[#3F3F3F] shadow-xl",
        "w-[40%] translate-x-0 px-8"
      )}
      style={{
        transition: "transform 0.3s ease-out, width 0.3s ease-out",
        backgroundColor: "#1a1a1a", // Solid dark background instead of blur
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-full w-full">
          <svg
            className="animate-spin h-12 w-12 text-[#058FFF]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="flex mb-4 items-center justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CaseHeader debtor={debtor} caseDetails={caseDetails} />
            <div className="w-[100%]">
              <CaseDetails caseDetails={caseDetails} debtor={debtor} />
            </div>
          </div>
          {/* Fixed View Record button at the bottom */}
          <div className="sticky bottom-0 w-full p-4 bg-[#1a1a1a] border-t border-[#3F3F3F] flex justify-center">
            <button
              onClick={() => navigate(`/dashboard/${caseId}`)}
              className="px-6 py-2 bg-[#058FFF] text-white rounded-md hover:bg-[#0470cc] transition-colors font-medium flex items-center justify-center"
            >
              View Record
            </button>
          </div>
        </>
      )}
    </div>
  );
}
