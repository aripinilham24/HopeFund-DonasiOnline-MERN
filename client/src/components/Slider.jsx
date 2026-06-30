import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { url } from "../api/axios.js";

const slides = [
  { src: "foto_presisi_1.png", alt: "slide-1" },
  { src: "foto_presisi_2.png", alt: "slide-2" },
  { src: "foto_presisi_3.png", alt: "slide-3" },
];

const Slider = () => {
  return (
    <div className="relative group mt-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        className="rounded-xl shadow-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.src}>
            <div className="relative">
              <img
                className="h-40 sm:h-56 md:h-72 lg:h-96 w-full object-cover"
                src={`${url}/uploads/image/slide-banner/${slide.src}`}
                alt={slide.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          width: 32px;
          height: 32px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 12px;
          font-weight: 700;
          color: #3b82f6;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          transform: scale(1.1);
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.6;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 5px;
          background: white;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Slider;
