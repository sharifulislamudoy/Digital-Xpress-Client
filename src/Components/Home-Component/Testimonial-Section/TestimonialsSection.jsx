import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import TestimonialCard from './TestimonialCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BgImg from '../../../assets/Testimonial-Image.jpg'

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }, []);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/data/testimonials.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                setTestimonials(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) {
        return <div className="text-center text-white bg-black py-12">Loading testimonials...</div>;
    }

    if (error) {
        return <div className="text-center py-12 text-red-500">Error: {error}</div>;
    }

    return (
        <section className="relative bg-cover bg-center py-25 text-white" style={{backgroundImage: `url(${BgImg})`}}>
            {/* Dark overlay with blur effect */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-down">
                        What Our <span className="text-orange-500">Customers Say</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded" data-aos="fade-left"></div>
                </div>

                <div className="w-11/12 mx-auto">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            el: '.testimonial-pagination',
                            bulletClass: 'testimonial-bullet',
                            bulletActiveClass: 'testimonial-bullet-active',
                        }}
                        loop={true}
                    >
                        {testimonials.map((testimonial) => (
                            <SwiperSlide data-aos="fade-down" key={testimonial.id}>
                                <TestimonialCard testimonial={testimonial} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="testimonial-pagination flex justify-center mt-8 gap-2" />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;