import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';

const ProductCategoryPage = () => {
    const { categorySlug } = useParams();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/bestproducts.json');
                const data = await response.json();
                
                // Extract unique categories
                const uniqueCategories = [...new Set(data.map(p => p.category))].map(cat => ({
                    slug: cat,
                    name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                }));
                
                setCategories(uniqueCategories);
                
                // Filter products by category if categorySlug exists
                if (categorySlug) {
                    const filtered = data.filter(product => product.category === categorySlug);
                    setFilteredProducts(filtered);
                } else {
                    setFilteredProducts(data);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]);

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
            <div className="text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-2 rounded-full bg-orange-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-medium text-orange-400">Loading Products</h2>
                <p className="text-gray-400">Discovering amazing products for you...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="alert alert-error bg-red-900/80 backdrop-blur-sm text-white max-w-md mx-4 border border-red-700 shadow-lg"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                    <h3 className="font-bold">Error loading products</h3>
                    <span className="text-sm">{error}</span>
                </div>
                <button
                    className="btn btn-sm btn-ghost hover:bg-red-800/50"
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </motion.div>
        </div>
    );

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="w-11/12 mx-auto px-4 py-8">
                {/* Category Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-2">
                        {categorySlug ? 
                            categories.find(c => c.slug === categorySlug)?.name || "Products" : 
                            "All Products"}
                    </h1>
                    <p className="text-gray-400">
                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                    </p>
                </motion.div>

                {/* Category Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 overflow-x-auto"
                >
                    <div className="flex space-x-2 pb-2">
                        <Link
                            to="/products"
                            className={`px-4 py-2 rounded-full border ${!categorySlug ? 'bg-orange-600 border-orange-600 text-white' : 'border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-400'} transition-colors whitespace-nowrap`}
                        >
                            All Products
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category.slug}
                                to={`/products/${category.slug}`}
                                className={`px-4 py-2 rounded-full border ${categorySlug === category.slug ? 'bg-orange-600 border-orange-600 text-white' : 'border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-400'} transition-colors whitespace-nowrap`}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg"
                    >
                        <div className="text-6xl mb-4 text-orange-400">🔍</div>
                        <h3 className="text-xl font-medium mb-2">No products found</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            We couldn't find any products in this category. Try browsing our other categories.
                        </p>
                        <Link to="/products" className="btn bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg">
                            View All Products
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {currentProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.1)' }}
                                    className="card bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-900/20 rounded-xl overflow-hidden"
                                >
                                    <Link to={`/product/${product.id}`} className="block">
                                        <figure className="relative bg-black">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-60 w-full object-contain transition-transform duration-500 hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-0 left-0 right-0 flex justify-between p-3">
                                                {new Date(product.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                                                    <span className="badge badge-warning badge-sm animate-pulse border-none shadow-md">NEW</span>
                                                )}
                                                {product.discount > 0 && (
                                                    <span className="badge badge-error badge-sm border-none shadow-md">
                                                        -{product.discount}%
                                                    </span>
                                                )}
                                            </div>
                                        </figure>
                                        <div className="card-body p-5">
                                            <div className="flex justify-between items-start">
                                                <h2 className="card-title text-base hover:text-orange-400 transition-colors">
                                                    <span className="line-clamp-2">{product.name}</span>
                                                </h2>
                                            </div>
                                            <div className="flex items-center mb-1">
                                                <div className="rating rating-sm">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <input
                                                            key={i}
                                                            type="radio"
                                                            name={`rating-${product.id}`}
                                                            className={`mask mask-star-2 ${i < Math.floor(product.rating) ? 'bg-orange-400' : 'bg-gray-700'}`}
                                                            checked={i === Math.floor(product.rating) - 1}
                                                            readOnly
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs ml-1 text-gray-400">({product.reviews} reviews)</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className='text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300'>
                                                    ${product.price.toFixed(2)}
                                                </div>
                                                {product.discount > 0 && (
                                                    <div className="text-sm text-gray-400 line-through">
                                                        ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {product.features.slice(0, 3).map(feature => (
                                                    <span key={feature} className="badge badge-outline badge-sm border-orange-400 text-orange-400">
                                                        {feature}
                                                    </span>
                                                ))}
                                                {product.features.length > 3 && (
                                                    <span className="badge badge-outline badge-sm border-gray-600 text-gray-400">
                                                        +{product.features.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                            <div className="card-actions mt-4">
                                                <button className="btn bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 w-full shadow-lg">
                                                    Add to Cart
                                                </button>
                                                <button className="btn btn-outline btn-warning w-full">
                                                    Quick View
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-center mt-8"
                            >
                                <div className="join">
                                    <button
                                        className="join-item btn btn-outline btn-warning"
                                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        «
                                    </button>
                                    {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = index + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = index + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + index;
                                        } else {
                                            pageNum = currentPage - 2 + index;
                                        }

                                        return (
                                            <button
                                                key={index}
                                                className={`join-item btn ${currentPage === pageNum ? 'bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white' : 'btn-outline btn-warning'}`}
                                                onClick={() => paginate(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                    <button
                                        className="join-item btn btn-outline btn-warning"
                                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        »
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCategoryPage;