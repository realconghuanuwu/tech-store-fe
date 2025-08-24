import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/utils/function";

export default function NewArrivalSection() {
  return (
    <section className="py-16 mx-auto">
      <SectionHeader title="New Featured" />
      <div className={cn("flex items-center justify-between gap-2 mb-8")}>
        <div className="flex items-end gap-8 mb-8">
          <h2 className="text-4xl font-semibold">New Arrival</h2>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
          {/* PlayStation 5 - Large Card */}
          <div className="md:col-span-2 md:row-span-2 bg-black rounded-lg p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <h3 className="text-white text-2xl font-semibold mb-4">
                PlayStation 5
              </h3>
              <p className="text-gray-300 text-sm mb-6 max-w-xs">
                Black and White version of the PS5 coming out on sale.
              </p>
              <p className="text-white p-0 h-auto font-medium underline hover:no-underline">
                Shop Now
              </p>
            </div>
            {/* Placeholder for PS5 image */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                PS5 Image Placeholder
              </span>
            </div>
          </div>

          {/* Women's Collections */}
          <div className="md:col-span-2 bg-black rounded-lg p-6 flex items-end relative overflow-hidden">
            <div className="z-10">
              <h3 className="text-white text-xl font-semibold mb-2">
                Women's Collections
              </h3>
              <p className="text-gray-300 text-sm mb-4 max-w-xs">
                Featured woman collections that give you another vibe.
              </p>
              <p className="text-white p-0 h-auto font-medium underline hover:no-underline">
                Shop Now
              </p>
            </div>
            {/* Placeholder for woman image */}
            <div className="absolute right-0 top-0 w-48 h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 text-sm">
                Woman Image Placeholder
              </span>
            </div>
          </div>

          {/* Speakers */}
          <div className="bg-black rounded-lg p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <h3 className="text-white text-lg font-semibold mb-2">
                Speakers
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Amazon wireless speakers
              </p>
              <p className="text-white p-0 h-auto font-medium underline hover:no-underline">
                Shop Now
              </p>
            </div>
            {/* Placeholder for speakers image */}
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-500 text-xs">Speakers</span>
            </div>
          </div>

          {/* Perfume */}
          <div className="bg-black rounded-lg p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
              <h3 className="text-white text-lg font-semibold mb-2">Perfume</h3>
              <p className="text-gray-300 text-sm mb-4">
                GUCCI INTENSE OUD EDP
              </p>
              <p className="text-white p-0 h-auto font-medium underline hover:no-underline">
                Shop Now
              </p>
            </div>
            {/* Placeholder for perfume image */}
            <div className="absolute right-0 bottom-0 w-20 h-32 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-gray-500 text-xs">Perfume</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
