import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles

const CategorySection = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false,
            mirror: true
        });
    }, []);

    const categories = [
        {
            name: "Mobile Phones",
            image: "/images/categories/mobile.png",
            link: "/products/mobile-phones"
        },
        {
            name: "Laptops & Computers",
            image: "/images/categories/laptop.png",
            link: "/products/laptops-computers"
        },
        {
            name: "Gadgets & Accessories",
            image: "/images/categories/gadgets.png",
            link: "/products/gadgets-accessories"
        },
        {
            name: "Home Appliances",
            image: "/images/categories/appliances.png",
            link: "/products/home-appliances"
        },
    ];

    return (
        <section className="bg-black py-25 text-white">
            <div className="w-11/12 mx-auto text-center px-4">
                <div
                    className="text-center mb-8"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <h2 className="text-3xl font-bold" data-aos="fade-up">
                        Shop by <span className="text-orange-500">Category</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-400 mx-auto mt-2 rounded" data-aos="fade-left"></div>
                </div>

                <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {categories.map((cat, idx) => (
                        <a
                            href={cat.link}
                            key={idx}
                            className="card bg-gray-800 hover:bg-gray-900 transition-all duration-300 p-5 rounded-xl text-center shadow hover:shadow-xl"
                            data-aos="fade-up"
                            data-aos-delay={300 + (idx * 100)}
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-16 h-16 mx-auto mb-3 object-contain"
                            />
                            <h3 className="text-md font-semibold">{cat.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;