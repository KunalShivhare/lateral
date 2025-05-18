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
import TableActionButtons from "./tableActionButton";

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

export function CaseTable() {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

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
