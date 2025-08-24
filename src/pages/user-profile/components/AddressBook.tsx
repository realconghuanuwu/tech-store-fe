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
} from "antd";
import { useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

const { Option } = Select;

interface Address {
  id: string;
  type: "home" | "work" | "other";
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "home",
      fullName: "Md Rimel",
      phone: "+1 234 567 8900",
      address: "123 Main Street",
      city: "Kingston",
      state: "New York",
      zipCode: "5236",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      type: "work",
      fullName: "Md Rimel",
      phone: "+1 234 567 8901",
      address: "456 Business Ave",
      city: "New York",
      state: "New York",
      zipCode: "10001",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag
          color={
            type === "home" ? "blue" : type === "work" ? "green" : "orange"
          }
        >
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: string, record: Address) => (
        <div>
          <div>{address}</div>
          <div className="text-gray-500 text-sm">
            {record.city}, {record.state} {record.zipCode}
          </div>
          <div className="text-gray-500 text-sm">{record.country}</div>
        </div>
      ),
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
      render: (_, record: Address) => (
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
    setEditingAddress(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    form.setFieldsValue(address);
    setIsModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Address",
      content: "Are you sure you want to delete this address?",
      onOk: () => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
      },
    });
  };

  const handleSave = (values: any) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? { ...addr, ...values } : addr
        )
      );
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        ...values,
        isDefault: addresses.length === 0, // First address is default
      };
      setAddresses([...addresses, newAddress]);
    }
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-c-main-red">Address Book</h1>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
          className="bg-c-main-red border-c-main-red hover:bg-red-700"
        >
          Add New Address
        </Button>
      </div>

      <Card className="shadow-sm">
        <Table
          columns={columns}
          dataSource={addresses}
          rowKey="id"
          pagination={false}
        />
      </Card>

      <Modal
        title={editingAddress ? "Edit Address" : "Add New Address"}
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
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Address Type"
              name="type"
              rules={[
                { required: true, message: "Please select address type" },
              ]}
            >
              <Select placeholder="Select address type">
                <Option value="home">Home</Option>
                <Option value="work">Work</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: "Please enter full name" }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
          </div>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Enter street address" />
          </Form.Item>

          <div className="grid grid-cols-3 gap-4">
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input placeholder="Enter city" />
            </Form.Item>

            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input placeholder="Enter state" />
            </Form.Item>

            <Form.Item
              label="ZIP Code"
              name="zipCode"
              rules={[{ required: true, message: "Please enter ZIP code" }]}
            >
              <Input placeholder="Enter ZIP code" />
            </Form.Item>
          </div>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter country" }]}
          >
            <Input placeholder="Enter country" />
          </Form.Item>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-c-main-red border-c-main-red hover:bg-red-700"
            >
              {editingAddress ? "Update" : "Add"} Address
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
