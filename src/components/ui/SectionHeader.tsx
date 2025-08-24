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
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">{title}</span>
          </div>
        </div>
      </div>
      {right}
    </div>
  );
}
