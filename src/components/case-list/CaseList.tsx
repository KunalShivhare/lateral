import { PageLayout } from "../layout/PageLayout";
import { CaseListHeader } from "./CaseListHeader";
import { CaseSearchFilter } from "./CaseSearchFilter";
import { CaseTable } from "./CaseTable";

export function CaseList() {
  return (
    <PageLayout>
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-6">
          <CaseListHeader />
          <CaseSearchFilter />
          <CaseTable />
        </div>
      </div>
    </PageLayout>
  );
}
