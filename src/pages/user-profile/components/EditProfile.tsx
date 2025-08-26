import { Form, Input, Button, Card, Divider } from "antd";
import { useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EditProfile() {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock user data - in real app, this would come from API/store
  const userData: UserProfile = {
    firstName: "Md",
    lastName: "Rimel",
    email: "rimelllll@gmail.com",
    address: "Kingston, 5236, United State",
  };

  const handleSaveProfile = async (values: UserProfile) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Profile updated:", values);
      // Show success message
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: PasswordChange) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Password changed:", values);
      passwordForm.resetFields();
      // Show success message
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    passwordForm.resetFields();
  };

  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold text-c-main-red mb-4 sm:mb-6">
        Edit Your Profile
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {/* Personal Information */}
        <Card className="shadow-sm">
          <Form
            form={form}
            layout="vertical"
            initialValues={userData}
            onFinish={handleSaveProfile}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  size="large"
                  className="bg-gray-50 border-gray-300"
                  placeholder="Enter your first name"
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  size="large"
                  className="bg-gray-50 border-gray-300"
                  placeholder="Enter your last name"
                />
              </Form.Item>
            </div>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                size="large"
                className="bg-gray-50 border-gray-300"
                placeholder="Enter your email"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter your address" }]}
            >
              <Input
                size="large"
                className="bg-gray-50 border-gray-300"
                placeholder="Enter your address"
              />
            </Form.Item>
          </Form>
        </Card>

        {/* Password Changes */}
        <Card className="shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Password Changes
          </h2>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordChange}
            className="space-y-4"
          >
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                size="large"
                className="bg-gray-50 border-gray-300"
                placeholder="Enter your current password"
              />
            </Form.Item>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  { required: true, message: "Please enter your new password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  size="large"
                  className="bg-gray-50 border-gray-300"
                  placeholder="Enter your new password"
                />
              </Form.Item>

              <Form.Item
                label="Confirm New Password"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  className="bg-gray-50 border-gray-300"
                  placeholder="Confirm your new password"
                />
              </Form.Item>
            </div>
          </Form>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
          <Button
            size="large"
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:border-gray-400 order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={() => {
              form.submit();
              passwordForm.submit();
            }}
            className="bg-c-main-red border-c-main-red hover:bg-red-700 hover:border-red-700 order-1 sm:order-2"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}
