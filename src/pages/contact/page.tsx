import CommonPage from "@/components/ui/CommonPage";
import { PATH } from "@/constants/router.constant";
import { Button, Card, Col, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router";

export default function Contact() {
  const navigate = useNavigate();
  const breadcrumbItems = [
    {
      title: "Home",
      onClick: () => navigate(PATH.HOME),
    },
    {
      title: "Contact",
    },
  ];
  return (
    <CommonPage breadcrumbItems={breadcrumbItems}>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Row gutter={[16, 16]}>
          {/* Contact Information */}
          <Col span={6}>
            <Card>
              {/* Call To Us */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Call To Us</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
                <hr className="border-gray-200" />
              </div>

              {/* Write To US */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">Write To US</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col span={18}>
            <Card>
              <div className="space-y-6">
                {/* Form Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Your Name *"
                    className="bg-gray-50 border-0 placeholder:text-gray-500"
                  />
                  <Input
                    placeholder="Your Email *"
                    type="email"
                    className="bg-gray-50 border-0 placeholder:text-gray-500"
                  />
                  <Input
                    placeholder="Your Phone *"
                    type="tel"
                    className="bg-gray-50 border-0 placeholder:text-gray-500"
                  />
                </div>

                {/* Message Textarea */}
                <TextArea
                  placeholder="Your Message"
                  className="bg-gray-50 border-0 placeholder:text-gray-500 h-[200px] resize-none"
                  autoSize={{ minRows: 8, maxRows: 8 }}
                />

                {/* Send Button */}
                <div className="flex justify-end">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-12 py-3">
                    Send Message
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </main>
    </CommonPage>
  );
}
