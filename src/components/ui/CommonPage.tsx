import { Card, Breadcrumb, Spin } from "antd";
import { House } from "lucide-react";
import { PATH } from "@/constants/router.constant";
import { useNavigate } from "react-router";
import type { BreadcrumbProps } from "antd/lib";

interface CommonPageProps {
  children: React.ReactNode;
  title: BreadcrumbProps["items"];
  isLoading?: boolean;
}

export default function CommonPage({
  children,
  title,
  isLoading = false,
}: CommonPageProps) {
  const navigate = useNavigate();

  return (
    <Spin spinning={isLoading}>
      <Card bodyStyle={{ padding: 8 }} className="!mb-2">
        <Breadcrumb
          items={[
            {
              title: <House className="size-[1.35rem] cursor-pointer" />,
              onClick: () => navigate(PATH.HOME),
            },
            ...(title || []),
          ]}
        />
      </Card>
      {children}
    </Spin>
  );
}
