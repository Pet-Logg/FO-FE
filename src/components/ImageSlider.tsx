import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import banner1 from "../assets/banner001.png";
import banner2 from "../assets/banner002.png";
import banner3 from "../assets/banner003.png";

const ImageSlider = () => {
  const images = [banner1, banner2, banner3];

  return (
    <div className="w-full h-[400px]">
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        speed={1800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // 유저가 터치해도 자동슬라이드 유지
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {images.concat(images).map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} className="mx-auto" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
