import { Truck, Headphones, Shield } from "lucide-react";

export default function ServiceLabelSection() {
  const services = [
    {
      icon: Truck,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: Headphones,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: Shield,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <section className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <div key={index} className="flex flex-col items-center space-y-4">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-black">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
