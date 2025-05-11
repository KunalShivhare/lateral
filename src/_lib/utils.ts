import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle2,
  CircleHelp,
  CircleIcon,
  CircleX,
  Timer,
} from "lucide-react";

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(
  status: "pending" | "in-progress" | "completed" | "canceled" | undefined
) {
  const statusIcons = {
    canceled: CircleX,
    completed: CheckCircle2,
    "in-progress": Timer,
    pending: CircleHelp,
  };

  return statusIcons[status as keyof typeof statusIcons] || CircleIcon;
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns A React component representing the priority icon.
 */
export function getPriorityIcon(
  priority: "low" | "medium" | "high" | undefined
) {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  };

  return priorityIcons[priority as keyof typeof priorityIcons] || CircleIcon;
}
