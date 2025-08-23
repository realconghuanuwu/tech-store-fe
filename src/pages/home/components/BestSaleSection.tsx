import SectionCarousel from "@/components/ui/SectionCarousel";
import { Card, Typography } from "antd";
import { Computer, Smartphone, Watch } from "lucide-react";
import type { ReactNode } from "react";

const products: CategoryProduct[] = [
  {
    id: 1,
    name: "Phones",
    icon: <Smartphone size={32} />,
  },
  {
    id: 2,
    name: "Computers",
    icon: <Computer size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <Watch size={32} />,
  },
];

interface CategoryProduct {
  id: number;
  name: string;
  icon: ReactNode;
}

export default function BestSaleSection() {
  return (
    <SectionCarousel
      title="This Month"
      products={products}
      topRender={<BestSaleSectionTopRender />}
      renderItem={(item: CategoryProduct) => (
        <Card bodyStyle={{ width: 200 }} className="!p-4">
          <div className="flex flex-col justify-center items-center gap-2">
            {item.icon}
            <Typography.Title level={5}>{item.name}</Typography.Title>
          </div>
        </Card>
      )}
    />
  );
}

function BestSaleSectionTopRender() {
  return (
    <div className="flex items-end gap-8 mb-8">
      <h2 className="text-4xl font-semibold">Best Selling Products</h2>
    </div>
  );
}
