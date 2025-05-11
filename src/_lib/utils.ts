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
import { CustomTask } from "./custom-data";

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: CustomTask["status"]) {
  const statusIcons = {
    canceled: CircleX,
    completed: CheckCircle2,
    "in-progress": Timer,
    pending: CircleHelp,
  };

  return statusIcons[status] || CircleIcon;
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns A React component representing the priority icon.
 */
export function getPriorityIcon(priority: CustomTask["priority"]) {
  const priorityIcons = {
    high: ArrowUpIcon,
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
  };

  return priorityIcons[priority] || CircleIcon;
}
