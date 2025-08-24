import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
} from "antd";
import { useState } from "react";
import { Edit, Trash2, Plus, CreditCard } from "lucide-react";

const { Option } = Select;

interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "paypal";
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
  brand: string;
}

export default function PaymentOptions() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "credit_card",
      cardNumber: "**** **** **** 1234",
      cardHolder: "Md Rimel",
      expiryDate: "12/25",
      isDefault: true,
      brand: "Visa",
    },
    {
      id: "2",
      type: "debit_card",
      cardNumber: "**** **** **** 5678",
      cardHolder: "Md Rimel",
      expiryDate: "08/26",
      isDefault: false,
      brand: "Mastercard",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(
    null
  );
  const [form] = Form.useForm();

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "paypal":
        return "🔵";
      default:
        return <CreditCard size={20} />;
    }
  };

  const getCardTypeColor = (type: string) => {
    switch (type) {
      case "credit_card":
        return "blue";
      case "debit_card":
        return "green";
      case "paypal":
        return "orange";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "Payment Method",
      key: "paymentMethod",
      render: (_, record: PaymentMethod) => (
        <div className="flex items-center space-x-3">
          <span className="text-xl">{getCardIcon(record.brand)}</span>
          <div>
            <div className="font-medium">{record.brand}</div>
            <div className="text-gray-500 text-sm">
              {record.type.replace("_", " ").toUpperCase()}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Card Number",
      dataIndex: "cardNumber",
      key: "cardNumber",
    },
    {
      title: "Card Holder",
      dataIndex: "cardHolder",
      key: "cardHolder",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      render: (isDefault: boolean) => (
        <Tag color={isDefault ? "red" : "default"}>
          {isDefault ? "Default" : ""}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record: PaymentMethod) => (
        <Space>
          <Button
            type="text"
            icon={<Edit size={16} />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<Trash2 size={16} />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingPayment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (payment: PaymentMethod) => {
    setEditingPayment(payment);
    form.setFieldsValue({
      ...payment,
      cardNumber: payment.cardNumber.replace(/\*/g, ""), // Show actual number for editing
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Payment Method",
      content: "Are you sure you want to delete this payment method?",
      onOk: () => {
        setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
      },
    });
  };

  const handleSave = (values: any) => {
    const maskedCardNumber = `**** **** **** ${values.cardNumber.slice(-4)}`;

    if (editingPayment) {
      // Update existing payment method
      setPaymentMethods(
        paymentMethods.map((pm) =>
          pm.id === editingPayment.id
            ? { ...pm, ...values, cardNumber: maskedCardNumber }
            : pm
        )
      );
    } else {
      // Add new payment method
      const newPayment: PaymentMethod = {
        id: Date.now().toString(),
        ...values,
        cardNumber: maskedCardNumber,
        isDefault: paymentMethods.length === 0, // First payment method is default
      };
      setPaymentMethods([...paymentMethods, newPayment]);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-c-main-red">
          My Payment Options
        </h1>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
          className="bg-c-main-red border-c-main-red hover:bg-red-700"
        >
          Add Payment Method
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={paymentMethods}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingPayment ? "Edit Payment Method" : "Add Payment Method"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          className="mt-4"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Card Type"
                name="type"
                rules={[{ required: true, message: "Please select card type" }]}
              >
                <Select placeholder="Select card type">
                  <Option value="credit_card">Credit Card</Option>
                  <Option value="debit_card">Debit Card</Option>
                  <Option value="paypal">PayPal</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Card Brand"
                name="brand"
                rules={[
                  { required: true, message: "Please select card brand" },
                ]}
              >
                <Select placeholder="Select card brand">
                  <Option value="Visa">Visa</Option>
                  <Option value="Mastercard">Mastercard</Option>
                  <Option value="American Express">American Express</Option>
                  <Option value="Discover">Discover</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[
              { required: true, message: "Please enter card number" },
              {
                pattern: /^\d{16}$/,
                message: "Please enter a valid 16-digit card number",
              },
            ]}
          >
            <Input placeholder="Enter card number" maxLength={16} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Card Holder Name"
                name="cardHolder"
                rules={[
                  { required: true, message: "Please enter card holder name" },
                ]}
              >
                <Input placeholder="Enter card holder name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                  { required: true, message: "Please enter expiry date" },
                  {
                    pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: "Please enter in MM/YY format",
                  },
                ]}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-c-main-red border-c-main-red hover:bg-red-700"
            >
              {editingPayment ? "Update" : "Add"} Payment Method
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
