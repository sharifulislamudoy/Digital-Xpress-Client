import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import FlashDealCard from './FlashDealCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BgImg from '../../../assets/Category-Image.jpg'

const FlashDeals = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }, []);
    const [deals, setDeals] = useState([]);

    useEffect(() => {
        fetch('/data/flashdeals.json')
            .then(res => res.json())
            .then(data => {
                const validDeals = data.filter(deal => new Date(deal.endTime) > new Date());
                setDeals(validDeals);
            });
    }, []);

    const handleExpire = (expiredId) => {
        setDeals(prev => prev.filter(deal => deal.id !== expiredId));
    };

    if (deals.length === 0) return null;

    return (
        <section className="relative bg-cover bg-center py-25 text-white" style={{backgroundImage: `url(${BgImg})`}}>
            {/* Dark overlay with blur effect */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            
            <div className="container w-11/12 mx-auto px-4 relative z-10">
                <div
                    className="text-center mb-8"
                    data-aos-delay="100"
                >
                    <h2 className="text-3xl font-bold" data-aos="fade-down">
                        Flash <span className="text-orange-500">Deals</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded" data-aos="fade-left"></div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="pb-12"
                >
                    {deals.map(deal => (
                        <SwiperSlide data-aos="fade-down" key={deal.id}>
                            <FlashDealCard deal={deal} onExpire={handleExpire} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default FlashDeals;