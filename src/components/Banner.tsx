"use client";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import Image from "next/image";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import img1 from "../../public/zerocal.webp";
import img2 from "../../public/ads.webp";

const Banner = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <div>
      <AutoplaySlider
        play={true}
        interval={5000}
        cancelOnInteraction={false}
        className="slider h-96 "
      >
        <div className="">
          <Image src={img1} alt="1" />
        </div>

        {/* 2nd slide */}

        <div className="slider_content flex flex-col-reverse md:flex-row justify-between items-center mx-6 md:mx-0">
          <div className="py-16 md:py-0">
            <Image src={img2} alt="1"></Image>
          </div>
        </div>
      </AutoplaySlider>
    </div>
  );
};

export default Banner;
