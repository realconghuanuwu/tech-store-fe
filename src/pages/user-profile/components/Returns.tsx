import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
} from "antd";
import { useState } from "react";
import { Eye, Plus } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

interface Return {
  id: string;
  orderNumber: string;
  returnNumber: string;
  date: string;
  status: "pending" | "approved" | "processing" | "completed" | "rejected";
  reason: string;
  items: number;
  refundAmount: number;
}

export default function Returns() {
  const [returns, setReturns] = useState<Return[]>([
    {
      id: "1",
      orderNumber: "#ORD-2024-001",
      returnNumber: "#RET-2024-001",
      date: "2024-01-20",
      status: "approved",
      reason: "Defective product",
      items: 1,
      refundAmount: 89.99,
    },
    {
      id: "2",
      orderNumber: "#ORD-2024-002",
      returnNumber: "#RET-2024-002",
      date: "2024-01-25",
      status: "processing",
      reason: "Wrong size",
      items: 2,
      refundAmount: 149.5,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "approved":
        return "blue";
      case "processing":
        return "purple";
      case "completed":
        return "green";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "approved":
        return "Approved";
      case "processing":
        return "Processing";
      case "completed":
        return "Completed";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "Return Number",
      dataIndex: "returnNumber",
      key: "returnNumber",
      render: (returnNumber: string) => (
        <span className="font-medium text-blue-600">{returnNumber}</span>
      ),
    },
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
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
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: number) => `${items} item${items > 1 ? "s" : ""}`,
    },
    {
      title: "Refund Amount",
      dataIndex: "refundAmount",
      key: "refundAmount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Return) => (
        <Button
          type="text"
          icon={<Eye size={16} />}
          onClick={() => handleViewReturn(record)}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleViewReturn = (returnItem: Return) => {
    console.log("View return:", returnItem);
    // Navigate to return detail page or open modal
  };

  const handleCreateReturn = () => {
    setIsModalVisible(true);
  };

  const handleSubmitReturn = (values: any) => {
    console.log("Submit return:", values);
    // Handle return submission
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-c-main-red">My Returns</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your return requests
          </p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleCreateReturn}
          className="bg-c-main-red border-c-main-red hover:bg-red-700"
        >
          Create Return
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={returns}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} returns`,
          }}
        />
      </Card>

      <Modal
        title="Create Return Request"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitReturn}
          className="mt-4"
        >
          <Form.Item
            label="Order Number"
            name="orderNumber"
            rules={[{ required: true, message: "Please enter order number" }]}
          >
            <Input placeholder="Enter order number (e.g., #ORD-2024-001)" />
          </Form.Item>

          <Form.Item
            label="Return Reason"
            name="reason"
            rules={[{ required: true, message: "Please select return reason" }]}
          >
            <Select placeholder="Select return reason">
              <Option value="defective">Defective product</Option>
              <Option value="wrong_size">Wrong size</Option>
              <Option value="not_as_described">Not as described</Option>
              <Option value="damaged">Damaged during shipping</Option>
              <Option value="changed_mind">Changed mind</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Return Date"
            name="returnDate"
            rules={[{ required: true, message: "Please select return date" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Additional Comments" name="comments">
            <TextArea
              rows={4}
              placeholder="Please provide additional details about your return..."
            />
          </Form.Item>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-c-main-red border-c-main-red hover:bg-red-700"
            >
              Submit Return Request
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
