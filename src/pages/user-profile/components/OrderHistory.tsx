import { Card, Table, Tag, Button, Space, Image } from "antd";
import { Eye, Download } from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  paymentMethod: string;
}

export default function OrderHistory() {
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "#ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 299.99,
      items: 3,
      paymentMethod: "Credit Card",
    },
    {
      id: "2",
      orderNumber: "#ORD-2024-002",
      date: "2024-01-20",
      status: "shipped",
      total: 149.5,
      items: 2,
      paymentMethod: "PayPal",
    },
    {
      id: "3",
      orderNumber: "#ORD-2024-003",
      date: "2024-01-25",
      status: "processing",
      total: 89.99,
      items: 1,
      paymentMethod: "Credit Card",
    },
    {
      id: "4",
      orderNumber: "#ORD-2024-004",
      date: "2024-01-30",
      status: "pending",
      total: 199.99,
      items: 4,
      paymentMethod: "Debit Card",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "processing":
        return "blue";
      case "shipped":
        return "purple";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (orderNumber: string) => (
        <span className="font-medium text-blue-600">{orderNumber}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: number) => `${items} item${items > 1 ? "s" : ""}`,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Order) => (
        <Space>
          <Button
            type="text"
            icon={<Eye size={16} />}
            onClick={() => handleViewOrder(record)}
            className="text-blue-600 hover:text-blue-800"
          >
            View
          </Button>
          <Button
            type="text"
            icon={<Download size={16} />}
            onClick={() => handleDownloadInvoice(record)}
            className="text-green-600 hover:text-green-800"
          >
            Invoice
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewOrder = (order: Order) => {
    console.log("View order:", order);
    // Navigate to order detail page or open modal
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log("Download invoice for:", order);
    // Handle invoice download
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-c-main-red">Order History</h1>
        <p className="text-gray-600 mt-2">View and track all your orders</p>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
          }}
        />
      </Card>
    </>
  );
}
