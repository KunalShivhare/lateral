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
          "p-0 max-w-4xl w-full h-[80vh] flex flex-col overflow-hidden bg-gray-950",
          className
        )}
      >
        {/* Header Strip */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto w-full">
            {children || (
              <div className="h-full flex items-center justify-center text-gray-500">
                No content available
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
