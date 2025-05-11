import { Pickaxe } from "lucide-react";

export type DataTableConfig = typeof dataTableConfig;

export const dataTableConfig = {
  featureFlags: [
    // {
    //   label: "Advanced table",
    //   value: "advancedTable" as const,
    //   icon: Pickaxe,
    //   tooltipTitle: "Toggle advanced table",
    //   tooltipDescription: "A filter and sort builder to filter and sort rows.",
    // }
  ],
  textOperators: [
    { label: "Contains", value: "iLike" as const },
    { label: "Does not contain", value: "notILike" as const },
    { label: "Equals", value: "eq" as const },
    { label: "Not equals", value: "ne" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  numericOperators: [
    { label: "Equals", value: "eq" as const },
    { label: "Not equals", value: "ne" as const },
    { label: "Less than", value: "lt" as const },
    { label: "Less than or equal to", value: "lte" as const },
    { label: "Greater than", value: "gt" as const },
    { label: "Greater than or equal to", value: "gte" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  dateOperators: [
    { label: "Equals", value: "eq" as const },
    { label: "Not equals", value: "ne" as const },
    { label: "Before", value: "lt" as const },
    { label: "After", value: "gt" as const },
    { label: "On or before", value: "lte" as const },
    { label: "On or after", value: "gte" as const },
    { label: "Between", value: "isBetween" as const },
    { label: "Relative to today", value: "isRelativeToToday" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  selectOperators: [
    { label: "Equals", value: "eq" as const },
    { label: "Not equals", value: "ne" as const },
    { label: "Is empty", value: "isEmpty" as const },
    { label: "Is not empty", value: "isNotEmpty" as const },
  ],
  booleanOperators: [
    { label: "Equals", value: "eq" as const },
    { label: "Not equals", value: "ne" as const },
  ],
  joinOperators: [
    { label: "And", value: "and" as const },
    { label: "Or", value: "or" as const },
  ],
  sortOrders: [
    { label: "Asc", value: "asc" as const },
    { label: "Desc", value: "desc" as const },
  ],
  columnTypes: [
    "text",
    "number",
    "date",
    "boolean",
    "select",
    "multi-select",
  ] as const,
  globalOperators: [
    "iLike",
    "notILike",
    "eq",
    "ne",
    "isEmpty",
    "isNotEmpty",
    "lt",
    "lte",
    "gt",
    "gte",
    "isBetween",
    "isRelativeToToday",
    "and",
    "or",
  ] as const,
};
