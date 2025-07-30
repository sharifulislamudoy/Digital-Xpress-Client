import React from 'react';
import Marquee from 'react-fast-marquee';

const brands = [
    { name: 'Samsung', logo: '/brands/samsung.png' },
    { name: 'Xiaomi', logo: '/brands/xiaomi.png' },
    { name: 'Realme', logo: '/brands/realme.png' },
    { name: 'Oppo', logo: '/brands/oppo.png' },
    { name: 'Vivo', logo: '/brands/vivo.png' },
    { name: 'Apple', logo: '/brands/apple.png' },
    { name: 'OnePlus', logo: '/brands/oneplus.png' },
];

const Brands = () => {
    return (
        <section className="py-12 bg-black">
            <div className="container w-11/12 mx-auto px-4 mb-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-down">
                        Top <span className="text-orange-500">Brands</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded" data-aos="fade-left"></div>
                </div>
                <Marquee
                    speed={50}
                    pauseOnHover={true}
                    // gradient={true}
                    gradientWidth={60}
                    className="overflow-hidden"
                >
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="mx-6 flex items-center justify-center transition-transform hover:scale-110 duration-300"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-300"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>


        </section>
    );
};

export default Brands;
