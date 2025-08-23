import type { ReactNode } from "react";

interface SectionHeaderProps {
  title: string | ReactNode;
  right?: React.ReactNode;
}

export default function SectionHeader({ title, right }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center">
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
