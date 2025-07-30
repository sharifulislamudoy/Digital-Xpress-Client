import React, { useState, useEffect } from 'react';
import ProductTabs from './ProductTabs';
import ProductCard from './ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS styles
import BgImg from '../../../assets/Feature-Image.jpg'

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('latest');

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
        const fetchProducts = async () => {
            try {
                const response = await fetch('/data/products.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getFilteredProducts = () => {
        switch (activeTab) {
            case 'trending':
                return products.filter(product => product.trending);
            case 'best-sellers':
                return products.filter(product => product.bestSeller);
            case 'latest':
            default:
                return products.filter(product => product.isNew);
        }
    };

    if (loading) {
        return (
            <section className="py-12 bg-black text-white">
                <div className="container mx-auto px-4 text-center">
                    <p>Loading products...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 bg-black text-white ">
                <div className="container mx-auto px-4 text-center text-red-500">
                    <p>Error: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-black text-white bg-cover bg-center relative" style={{backgroundImage: `url(${BgImg})`}}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            
            <div className="container px-4 w-11/12 mx-auto relative z-10">
                <div 
                    className="text-center mb-8"
                    data-aos-delay="100"
                >
                    <h2 className="text-3xl font-bold" data-aos="fade-down">
                        Featured <span className="text-orange-500">Products</span>
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-2 rounded" data-aos="fade-left"></div>
                </div>

                <div data-aos="fade-up" data-aos-delay="200">
                    <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    {getFilteredProducts().map((product, index) => (
                        <div 
                            key={product.id}
                            data-aos="fade-up"
                            data-aos-delay={400 + (index * 100)}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                <div 
                    className="text-center mt-10"
                    data-aos="fade-up"
                    data-aos-delay="600"
                >
                    <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-bold py-2 px-6 rounded-full transition-colors duration-300">
                        View All Products
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;