import * as React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BigEmptyModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export function BigEmptyModal({
  isOpen,
  onClose,
  title = "",
  children,
  className,
}: BigEmptyModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "p-0 w-[90vw] min-w-[1200px] h-[80vh] flex flex-col overflow-hidden bg-[var(--background)]",
          className
        )}
      >
        {/* Header Strip */}
        <div className="bg-[var(--background)] px-6 py-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--primary-text)]">
            {title}
          </h3>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="w-full max-w-none px-4">
            {children || (
              <div className="h-full flex items-center justify-center text-[var(--primary-text)]">
                No content available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
