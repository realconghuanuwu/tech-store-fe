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
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <Row gutter={[16, 24]}>
          {/* Contact Information */}
          <Col xs={24} sm={24} md={8} lg={6} xl={6}>
            <Card className="h-fit">
              {/* Call To Us */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium">
                    Call To Us
                  </h3>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
                <hr className="border-gray-200" />
              </div>

              {/* Write To US */}
              <div className="space-y-4 mt-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium">
                    Write To US
                  </h3>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
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
          <Col xs={24} sm={24} md={16} lg={18} xl={18}>
            <Card>
              <div className="space-y-4 sm:space-y-6">
                {/* Form Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <Input
                    placeholder="Your Name *"
                    className="bg-gray-50 border-0 placeholder:text-gray-500 text-sm sm:text-base"
                    size="large"
                  />
                  <Input
                    placeholder="Your Email *"
                    type="email"
                    className="bg-gray-50 border-0 placeholder:text-gray-500 text-sm sm:text-base"
                    size="large"
                  />
                  <Input
                    placeholder="Your Phone *"
                    type="tel"
                    className="bg-gray-50 border-0 placeholder:text-gray-500 text-sm sm:text-base sm:col-span-2 lg:col-span-1"
                    size="large"
                  />
                </div>

                {/* Message Textarea */}
                <TextArea
                  placeholder="Your Message"
                  className="bg-gray-50 border-0 placeholder:text-gray-500 resize-none text-sm sm:text-base"
                  autoSize={{ minRows: 6, maxRows: 8 }}
                  style={{ minHeight: "120px" }}
                />

                {/* Send Button */}
                <div className="flex justify-center sm:justify-end pt-2">
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white px-8 sm:px-12 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
                    size="large"
                  >
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
