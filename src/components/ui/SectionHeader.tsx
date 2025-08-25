import { cn } from "@/utils/function";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string | ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  right,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0",
        className
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-6 sm:w-5 sm:h-10 bg-c-main-red rounded"></div>
            <span className="text-c-main-red font-semibold text-lg sm:text-xl lg:text-2xl">
              {title}
            </span>
          </div>
        </div>
      </div>
      {right}
    </div>
  );
}
