import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { GET_CASE_DETAILS, GET_ADJACENT_CASES } from "../../_lib/queries";
import { PageLayout } from "../layout/PageLayout";
import { CaseDetails } from "./CaseDetails";
import { CaseHeader } from "./CaseHeader";
import { TabsArea } from "./TabsArea";
import { useState, useEffect } from "react";
import { EmptyDialog } from "./EmptyDialog";
import { Button } from "@/components/ui/button";

// Function to add click handlers to all buttons without onClick handlers
function addClickHandlersToButtons() {
  // Wait for DOM to be ready
  setTimeout(() => {
    // Get all buttons in the dashboard
    const buttons = document.querySelectorAll(
      "button:not([data-has-click-handler])"
    );

    buttons.forEach((button) => {
      // Skip buttons that already have click handlers
      if (
        button.hasAttribute("onclick") ||
        (button as HTMLButtonElement).onclick
      )
        return;

      // Add a data attribute to mark this button as processed
      button.setAttribute("data-has-click-handler", "true");

      // Add click handler
      button.addEventListener("click", (e) => {
        // Prevent default action
        e.preventDefault();

        // Get button text or use a default
        const buttonText = button.textContent?.trim() || "Feature";

        // Create a custom event that the Dashboard component can listen for
        const event = new CustomEvent("openEmptyDialog", {
          detail: {
            title: `${buttonText} Action`,
            description: `The ${buttonText} feature is coming soon.`,
          },
          bubbles: true,
        });

        // Dispatch the event
        button.dispatchEvent(event);
      });
    });
  }, 500); // Small delay to ensure DOM is ready
}

export function Dashboard() {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [prevCaseId, setPrevCaseId] = useState<string | null>(null);
  const [nextCaseId, setNextCaseId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({
    title: "Coming Soon",
    description: "This feature is not yet implemented.",
  });

  const { data, loading } = useQuery(GET_CASE_DETAILS, {
    variables: { case_id: caseId },
  });

  // Query to get adjacent cases
  const { data: adjacentCasesData } = useQuery(GET_ADJACENT_CASES, {
    variables: { current_id: caseId },
    skip: !caseId,
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
  const openDialog = (title?: string, description?: string) => {
    setDialogProps({
      title: title || "Coming Soon",
      description: description || "This feature is not yet implemented.",
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  // Add event listener for custom openEmptyDialog events
  useEffect(() => {
    const handleOpenDialog = (e: CustomEvent) => {
      const { title, description } = e.detail;
      openDialog(title, description);
    };

    // Add the event listener
    document.addEventListener(
      "openEmptyDialog",
      handleOpenDialog as EventListener
    );

    // Call the function to add click handlers to buttons
    addClickHandlersToButtons();

    // Clean up
    return () => {
      document.removeEventListener(
        "openEmptyDialog",
        handleOpenDialog as EventListener
      );
    };
  }, []);

  // Add click handlers whenever the case data changes
  useEffect(() => {
    if (!loading) {
      addClickHandlersToButtons();
    }
  }, [data]);

  return (
    <PageLayout>
      <EmptyDialog
        isOpen={dialogOpen}
        onClose={closeDialog}
        title={dialogProps.title}
        description={dialogProps.description}
      />
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
        <div className="flex h-full">
          <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
            <div className="flex items-center mb-4 text-slate-400">
              <button
                className="flex items-center p-1 hover:bg-slate-800 rounded text-white"
                onClick={() => navigate("/")}
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
                <span>Back</span>
              </button>

              <div
                className="ml-auto text-sm text-[#BABABA] cursor-pointer relative group"
                onClick={() => {
                  navigator.clipboard.writeText(caseId || "");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                #{caseId}
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {copied ? "Copied!" : "Click to copy"}
                </span>
              </div>
              <div className="flex ml-4 space-x-2">
                <button
                  className={`p-1 rounded text-white ${
                    prevCaseId
                      ? "hover:bg-slate-800"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={goToPrevCase}
                  disabled={!prevCaseId}
                  title={prevCaseId ? "Previous case" : "No previous case"}
                >
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
                <button
                  className={`p-1 rounded text-white ${
                    nextCaseId
                      ? "hover:bg-slate-800"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={goToNextCase}
                  disabled={!nextCaseId}
                  title={nextCaseId ? "Next case" : "No next case"}
                >
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

            <CaseHeader
              debtor={debtor}
              caseDetails={caseDetails}
              openDialog={openDialog}
              closeDialog={closeDialog}
            />

            <div className="py-6">
              <TabsArea />

              {/* Example of buttons with no onClick that will trigger the dialog */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <Button variant="outline" className="p-6">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Generate Report</span>
                  </div>
                </Button>
                <Button variant="outline" className="p-6">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Send Email</span>
                  </div>
                </Button>
                <Button variant="outline" className="p-6">
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Schedule Meeting</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="w-[25%] border-l border-slate-800 flex-shrink-0 overflow-y-auto h-screen">
            <CaseDetails caseDetails={caseDetails} debtor={debtor} />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
