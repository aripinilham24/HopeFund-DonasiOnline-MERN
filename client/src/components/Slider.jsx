import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {url} from "../api/axios.js";

const Slider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000 }}
            className="shadow-xl"
            >
            <SwiperSlide>
                <img
                className="h-30 lg:h-60 w-full object-cover rounded"
                    src={`${url}/uploads/image/slide-banner/foto_presisi_1.png`}
                    alt="slide-1"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="h-30 lg:h-60 w-full object-cover rounded"
                    src={`${url}/uploads/image/slide-banner/foto_presisi_2.png`}
                    alt="slide-2"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="h-30 lg:h-60 w-full object-cover rounded"
                    src={`${url}/uploads/image/slide-banner/foto_presisi_3.png`}
                    alt="slide-3"
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default Slider;
