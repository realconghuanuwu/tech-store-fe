import type { LucideIcon } from "lucide-react";

interface AboutUsCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
}

export default function AboutUsCard({
  title,
  icon: Icon,
  description,
}: AboutUsCardProps) {
  return (
    <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-red-600 hover:border-red-600 group cursor-pointer">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
          <Icon className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
        </div>
      </div>
      <div className="text-2xl font-bold mb-1 group-hover:text-white transition-colors duration-300">
        {title}
      </div>
      <div className="text-sm text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
        {description}
      </div>
    </div>
  );
}
