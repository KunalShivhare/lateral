import { CustomTable } from "@/_components/custom-table";
import { PageLayout } from "../layout/PageLayout";
import { CaseListHeader } from "./CaseListHeader";
import { CaseSearchFilter } from "./CaseSearchFilter";
import { CaseTable } from "./CaseTable";

export function CaseList() {
  return (
    <PageLayout>
      <div className="flex-1 h-full overflow-auto p-6">
        <div className="space-y-6">
          <CustomTable />
          {/* <CaseTable /> */}
        </div>
      </div>
    </PageLayout>
  );
}
