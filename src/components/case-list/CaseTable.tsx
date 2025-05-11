import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSearch } from "../../context/SearchContext";

// Define the Case interface
interface Case {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  status: string;
  assignedTo: string;
  isSelected?: boolean;
}

// Sample data based on the image
const caseData: Case[] = [
  {
    id: "1",
    name: "Peter Green",
    email: "p.green@verizon.net",
    phone: "+44 (6949) 396 1561",
    stage: "Qualified to buy",
    status: "Closed",
    assignedTo: "Evie Green",
  },
  {
    id: "2",
    name: "Monte Liebermann",
    email: "monte.liebermann@tt.net",
    phone: "+44 (7800) 144 6634",
    stage: "All closed won",
    status: "Open",
    assignedTo: "Chloe Miller",
  },
  {
    id: "3",
    name: "Joan Jacobs",
    email: "J4J@optonline.net",
    phone: "+44 (7069) 368 2763",
    stage: "Qualified to buy",
    status: "Transfer",
    assignedTo: "Cameron Harrison",
  },
  {
    id: "4",
    name: "Gillian Lee",
    email: "gillian.lee@hotmail.com",
    phone: "+44 (8413) 410 7890",
    stage: "Decision Maker Bought-in",
    status: "Open",
    assignedTo: "Freddie Cook",
  },
  {
    id: "5",
    name: "Marissa Keen",
    email: "KeenMarissa@comcast.net",
    phone: "+44 (7595) 594 8389",
    stage: "Appointment scheduled",
    status: "Pending",
    assignedTo: "Lee Matthews",
  },
  {
    id: "6",
    name: "Jesse Simmons",
    email: "Jesse123Simmons@gmail.com",
    phone: "+44 (2334) 108 6155",
    stage: "Appointment made",
    status: "Pending",
    assignedTo: "Lizzie White",
  },
  {
    id: "7",
    name: "Eliza Powel",
    email: "ElizePower@bombaybicles.com",
    phone: "+44 (3033) 901 1192",
    stage: "All closed won",
    status: "Pending",
    assignedTo: "Amy Walker",
  },
];

// Table action buttons
const TableActionButtons = () => {
  return (
    <div className="flex items-center gap-2 mb-4 border-t border-b border-[#595959]">
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
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
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
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
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </button>
      <button className="p-2 hover:bg-slate-800 rounded">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      <div className="flex items-center ml-auto gap-2">
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400"
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
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400"
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
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <button className="p-2 hover:bg-slate-800 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export function CaseTable() {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedCases, setSelectedCases] = React.useState<string[]>([]);

  // Filter cases based on search query
  const filteredCases = React.useMemo(() => {
    if (!searchQuery) return caseData;

    const query = searchQuery.toLowerCase();
    return caseData.filter(
      (caseItem) =>
        caseItem.name.toLowerCase().includes(query) ||
        caseItem.email.toLowerCase().includes(query) ||
        caseItem.phone.toLowerCase().includes(query) ||
        caseItem.stage.toLowerCase().includes(query) ||
        caseItem.status.toLowerCase().includes(query) ||
        caseItem.assignedTo.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleRowClick = (caseId: string) => {
    navigate(`/dashboard/${caseId}`);
  };

  return (
    <div className="space-y-4">
      <TableActionButtons />

      <div className="overflow-hidden">
        <Table className="w-full">
          <TableHeader className="">
            <TableRow className="border-[#595959]">
              <TableHead className="w-12 text-slate-400 font-medium">
                <input type="checkbox" className="h-4 w-4 rounded" />
              </TableHead>
              <TableHead className="text-slate-400 font-medium">Name</TableHead>
              <TableHead className="text-slate-400 font-medium">
                Email
              </TableHead>
              <TableHead className="text-slate-400 font-medium">
                Phone
              </TableHead>
              <TableHead className="text-slate-400 font-medium">
                Stage
              </TableHead>
              <TableHead className="text-slate-400 font-medium">
                Status
              </TableHead>
              <TableHead className="text-slate-400 font-medium">
                Assigned to
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCases.map((caseItem) => (
              <TableRow
                key={caseItem.id}
                className={`hover:bg-[#1A1A1A] border-[#595959] cursor-pointer`}
                onClick={() => handleRowClick(caseItem.id)}
              >
                <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={caseItem.isSelected}
                    className="h-4 w-4 rounded"
                  />
                </TableCell>
                <TableCell>{caseItem.name}</TableCell>
                <TableCell>{caseItem.email}</TableCell>
                <TableCell>{caseItem.phone}</TableCell>
                <TableCell>{caseItem.stage}</TableCell>
                <TableCell>
                  <span
                    className={`
                    inline-block px-2 py-1 rounded text-xs
                    ${
                      caseItem.status === "Open"
                        ? "bg-green-900/20 text-green-500"
                        : ""
                    }
                    ${
                      caseItem.status === "Closed"
                        ? "bg-slate-900/70 text-slate-400"
                        : ""
                    }
                    ${
                      caseItem.status === "Transfer"
                        ? "bg-blue-900/20 text-blue-500"
                        : ""
                    }
                    ${
                      caseItem.status === "Pending"
                        ? "bg-yellow-900/20 text-yellow-500"
                        : ""
                    }
                  `}
                  >
                    {caseItem.status}
                  </span>
                </TableCell>
                <TableCell>{caseItem.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
