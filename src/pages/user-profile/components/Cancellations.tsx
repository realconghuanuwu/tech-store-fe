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
import { Eye, Plus, AlertCircle } from "lucide-react";

const { Option } = Select;
const { TextArea } = Input;

interface Cancellation {
  id: string;
  orderNumber: string;
  cancellationNumber: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
  items: number;
  refundAmount: number;
  cancellationFee: number;
}

export default function Cancellations() {
  const [cancellations, setCancellations] = useState<Cancellation[]>([
    {
      id: "1",
      orderNumber: "#ORD-2024-003",
      cancellationNumber: "#CAN-2024-001",
      date: "2024-01-26",
      status: "approved",
      reason: "Changed mind",
      items: 1,
      refundAmount: 89.99,
      cancellationFee: 0,
    },
    {
      id: "2",
      orderNumber: "#ORD-2024-004",
      cancellationNumber: "#CAN-2024-002",
      date: "2024-01-28",
      status: "pending",
      reason: "Found better price elsewhere",
      items: 2,
      refundAmount: 149.5,
      cancellationFee: 5.0,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "orange";
      case "approved":
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
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const columns = [
    {
      title: "Cancellation Number",
      dataIndex: "cancellationNumber",
      key: "cancellationNumber",
      render: (cancellationNumber: string) => (
        <span className="font-medium text-blue-600">{cancellationNumber}</span>
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
      title: "Cancellation Fee",
      dataIndex: "cancellationFee",
      key: "cancellationFee",
      render: (fee: number) => (fee > 0 ? `$${fee.toFixed(2)}` : "Free"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: Cancellation) => (
        <Button
          type="text"
          icon={<Eye size={16} />}
          onClick={() => handleViewCancellation(record)}
          className="text-blue-600 hover:text-blue-800"
        >
          View Details
        </Button>
      ),
    },
  ];

  const handleViewCancellation = (cancellation: Cancellation) => {
    console.log("View cancellation:", cancellation);
    // Navigate to cancellation detail page or open modal
  };

  const handleCreateCancellation = () => {
    setIsModalVisible(true);
  };

  const handleSubmitCancellation = (values: any) => {
    console.log("Submit cancellation:", values);
    // Handle cancellation submission
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-c-main-red">
            My Cancellations
          </h1>
          <p className="text-gray-600 mt-2">
            Track and manage your order cancellation requests
          </p>
        </div>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleCreateCancellation}
          className="bg-c-main-red border-c-main-red hover:bg-red-700"
        >
          Request Cancellation
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={cancellations}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} cancellations`,
          }}
        />
      </Card>

      <Modal
        title="Request Order Cancellation"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitCancellation}
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
            label="Cancellation Reason"
            name="reason"
            rules={[
              { required: true, message: "Please select cancellation reason" },
            ]}
          >
            <Select placeholder="Select cancellation reason">
              <Option value="changed_mind">Changed mind</Option>
              <Option value="found_better_price">
                Found better price elsewhere
              </Option>
              <Option value="ordered_by_mistake">Ordered by mistake</Option>
              <Option value="duplicate_order">Duplicate order</Option>
              <Option value="shipping_too_long">Shipping takes too long</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Cancellation Date"
            name="cancellationDate"
            rules={[
              { required: true, message: "Please select cancellation date" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Additional Comments" name="comments">
            <TextArea
              rows={4}
              placeholder="Please provide additional details about your cancellation request..."
            />
          </Form.Item>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="text-yellow-600" size={20} />
              <span className="font-medium text-yellow-800">
                Important Notice
              </span>
            </div>
            <p className="text-yellow-700 text-sm">
              Cancellation requests are subject to approval and may incur
              cancellation fees depending on the order status and timing.
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-c-main-red border-c-main-red hover:bg-red-700"
            >
              Submit Cancellation Request
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
