// AboutSection.jsx
import { FaCheckCircle, FaShippingFast, FaHeadset, FaTags, FaShieldAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const AboutSection = () => {
    const features = [
        {
            icon: <FaShippingFast className="text-orange-400 text-xl" />,
            title: "Fast Nationwide Delivery",
            description: "Get your products within 1-3 business days with our efficient delivery network covering all of Bangladesh."
        },
        {
            icon: <FaShieldAlt className="text-orange-400 text-xl" />,
            title: "Authentic Products",
            description: "100% genuine products with manufacturer warranties. We source directly from authorized distributors."
        },
        {
            icon: <FaHeadset className="text-orange-400 text-xl" />,
            title: "Expert Support",
            description: "Our tech specialists are available 7 days a week to help you choose the perfect product."
        },
        {
            icon: <FaTags className="text-orange-400 text-xl" />,
            title: "Competitive Pricing",
            description: "Best prices guaranteed with regular promotions, bundle deals, and exclusive member discounts."
        }
    ];

    const stats = [
        { value: "10K+", label: "Happy Customers" },
        { value: "50+", label: "Brands Available" },
        { value: "24/7", label: "Customer Support" },
        { value: "98%", label: "Positive Reviews" }
    ];

    const [testimonials, setTestimonials] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const testimonialsPerPage = 3;

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/data/testimonials.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                // Limit content to 15 words
                const processedTestimonials = data.map(testimonial => ({
                    ...testimonial,
                    shortContent: testimonial.content.split(' ').slice(0, 15).join(' ') +
                        (testimonial.content.split(' ').length > 15 ? '...' : '')
                }));
                setTestimonials(processedTestimonials);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []);

    // Auto-play functionality
    useEffect(() => {
        if (testimonials.length === 0) return;

        const interval = setInterval(() => {
            setCurrentPage(prev => prev % totalPages + 1);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length, testimonialsPerPage]);

    // Calculate pagination
    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);
    const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="bg-black py-20 px-4 md:px-10 lg:px-24 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="inline-block text-orange-400 font-medium mb-3 tracking-wider"
                    >
                        WHO WE ARE
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Redefining <span className="text-orange-500">Tech Retail</span> in Bangladesh
                    </motion.h2>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 mx-auto mb-8 transform origin-left"
                    ></motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                    >
                        At Digital Xpress, we blend cutting-edge technology with exceptional service to bring you the best in mobile devices, home appliances, and innovative gadgets. Our mission is to make premium technology accessible to everyone.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                        <img
                            src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                            alt="Digital Xpress Store"
                            className="relative rounded-2xl w-full h-auto shadow-2xl transform group-hover:scale-[1.02] transition duration-300"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl font-bold text-white mb-6">Our Value Proposition</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-orange-500 transition duration-300 hover:shadow-lg hover:shadow-orange-900/20"
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="bg-orange-500/20 p-3 rounded-full mr-4">
                                            {feature.icon}
                                        </div>
                                        <h4 className="text-xl font-semibold text-white">{feature.title}</h4>
                                    </div>
                                    <p className="text-gray-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-center"
                                >
                                    <div className="text-3xl font-bold text-orange-400 mb-1">{stat.value}</div>
                                    <div className="text-sm text-gray-300">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <Link to={'/products'}>
                                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition duration-300 transform hover:-translate-y-1">
                                    Explore Our Products
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Testimonials section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-24"
                >
                    <h3 className="text-3xl font-bold text-white mb-12 text-center">What Our Customers Say</h3>

                    {testimonials.length > 0 ? (
                        <>
                            <div className="relative overflow-hidden h-[400px] md:h-[350px]">
                                <AnimatePresence mode="wait" custom={currentPage}>
                                    <motion.div
                                        key={currentPage}
                                        custom={currentPage}
                                        initial={{ x: 300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="grid grid-cols-1 md:grid-cols-3 gap-8 absolute inset-0"
                                    >
                                        {currentTestimonials.map((testimonial) => (
                                            <motion.div
                                                key={testimonial.id}
                                                className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-orange-500 transition duration-300 h-full flex flex-col"
                                            >
                                                <div className="flex mb-4">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`text-lg ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.shortContent}"</p>
                                                <div className="flex items-center mt-auto">
                                                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold mr-3">
                                                        {testimonial.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{testimonial.name}</div>
                                                        <div className="text-sm text-gray-400">{testimonial.role}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Pagination controls */}
                            <div className="flex justify-center mt-12 space-x-2">
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentPage(index + 1);
                                        }}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === index + 1
                                                ? 'bg-orange-500 w-6'
                                                : 'bg-gray-600 hover:bg-gray-400'
                                            }`}
                                        aria-label={`Go to page ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-400 py-12">Loading testimonials...</div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;