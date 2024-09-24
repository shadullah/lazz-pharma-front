import FeaturedProducts from "@/app/products/page";
import Banner from "@/components/Banner";
import HeroSection from "@/components/HeroSection";
import { Sidebard } from "@/components/Sidebard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      {/* <HeroSection /> */}
      <Banner />
      {/* <Sidebard /> */}

      <FeaturedProducts />
    </main>
  );
}
