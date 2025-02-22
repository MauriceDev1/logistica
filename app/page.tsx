import Hero from "@/components/Hero";
import HomeDash from "@/components/HomeDash";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mogistic | Home",
  description: "Welcome to Mogistic home of logistic syndication",
};

export default function Home() {
  return (
    <>
      <Hero />
      <HomeDash />

      <div className="w-full flex gap-5 py-5">
        <div className="w-1/2 p-5">
          <h1 className="text-3xl">
            Logistic Syndication
          </h1>
          <p className="py-5 text-lg">
            Invest in the future of logistics without the hassle of daily management. With Logistic Syndication, you can own a share in a thriving logistics company by purchasing investment blocks. Alongside other investors, you’ll contribute to funding essential assets that keep the business moving. Enjoy the benefits of ownership while our expert team handles operations, allowing you to focus on your life—without the stress of running the business.
          </p>
          <Button className="mt-3 bg-customBlue hover:bg-customBlueHover">More Info</Button>
        </div>
        <div className="w-1/2 h-96 bg-ship_doc bg-cover">

        </div>
      </div>

      <div className="w-full flex gap-5 py-5">
        <div className="w-1/2 h-96 bg-gray-200">

        </div>
        <div className="w-1/2 p-5">
          <h1 className="text-3xl">
            What is a Syndication
          </h1>
          <p className="py-5 text-lg">
          Syndication is a way for multiple investors to pool their money together to fund a large-scale investment, such as real estate, startups, or media projects. This allows investors to access high-value opportunities with lower risk and shared profits, while benefiting from expert management and strategic growth.
          </p>
          <Button className="mt-3 bg-customBlue hover:bg-customBlueHover">More Info</Button>
        </div>
      </div>

      <div className="w-full flex gap-5 py-5">
        <div className="w-1/2 p-5">
          <h1 className="text-3xl">
            Why Mogistic
          </h1>
          <p className="py-5 text-lg">
            Invest in the future of logistics without the hassle of daily management. With Logistic Syndication, you can own a share in a thriving logistics company by purchasing investment blocks. Alongside other investors, you’ll contribute to funding essential assets that keep the business moving. Enjoy the benefits of ownership while our expert team handles operations, allowing you to focus on your life—without the stress of running the business.
          </p>
          <Button className="mt-3 bg-customBlue hover:bg-customBlueHover">More Info</Button>
        </div>
        <div className="w-1/2 h-96 bg-truck-2 bg-cover" />
      </div>

      <div className="w-full h-80 bg-gray-300 mt-5 mb-10">

      </div>
    </>
  );
}
