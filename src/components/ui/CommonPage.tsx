import { cn } from "@/utils/function";
import { Breadcrumb } from "antd";
import type { BreadcrumbProps } from "antd/lib";

interface CommonPageProps {
  children: React.ReactNode;
  className?: string;
  breadcrumbItems?: BreadcrumbProps["items"];
}

export default function CommonPage({
  children,
  className,
  breadcrumbItems,
}: CommonPageProps) {
  return (
    <div className={cn("max-w-7xl mx-auto px-4 md:px-0 py-8", className)}>
      {breadcrumbItems && (
        <Breadcrumb items={breadcrumbItems} className="mb-8" />
      )}
      {children}
    </div>
  );
}
