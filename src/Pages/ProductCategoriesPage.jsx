import { ReTitle } from 're-title';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollToTop from '../Components/Utils/useScrollToTop';
import CollapsibleSection from '../Components/Products/CollapsibleSection';

const ProductCategoriesPage = () => {
    const { categorySlug } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRanges] = useState([
        { min: 0, max: 500, label: "Under $500" },
        { min: 500, max: 1000, label: "$500 - $1000" },
        { min: 1000, max: 2000, label: "$1000 - $2000" },
        { min: 2000, max: 9999, label: "Over $2000" }
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [sortOption, setSortOption] = useState('popularity');
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;
    const handlePageChange = (page) => {
        paginate(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API call with a shimmer effect
                await new Promise(resolve => setTimeout(resolve, 800));
                const response = await fetch('/data/bestproducts.json');
                const data = await response.json();

                const uniqueCategories = [...new Set(data.map(p => p.category))].map(cat => ({
                    slug: cat,
                    name: cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                }));

                const uniqueBrands = [...new Set(data.map(p => p.brand))];

                setCategories(uniqueCategories);
                setBrands(uniqueBrands);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]);

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
        setCurrentPage(1);
    };

    const handlePriceRangeChange = (range) => {
        setSelectedPriceRange(prev => prev === range ? null : range);
        setCurrentPage(1);
    };

    const handleRatingChange = (rating) => {
        setSelectedRating(prev => prev === rating ? null : rating);
        setCurrentPage(1);
    };

    const handleFeatureChange = (feature) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
        setCurrentPage(1);
    };

    const applyFilters = () => {
        let filtered = [...products];

        if (categorySlug) {
            filtered = filtered.filter(product => product.category === categorySlug);
        }

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(product =>
                selectedBrands.includes(product.brand)
            );
        }

        if (selectedPriceRange) {
            filtered = filtered.filter(product =>
                product.price >= selectedPriceRange.min &&
                product.price <= selectedPriceRange.max
            );
        }

        if (selectedRating) {
            filtered = filtered.filter(product =>
                Math.floor(product.rating) === selectedRating
            );
        }

        if (selectedFeatures.length > 0) {
            filtered = filtered.filter(product =>
                selectedFeatures.every(feature =>
                    product.features.includes(feature)
                )
            );
        }

        switch (sortOption) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            default:
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        return filtered;
    };

    const filteredProducts = applyFilters();
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const allFeatures = [...new Set(
        products.flatMap(product => product.features)
    )];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <p className="text-gray-400">Discovering amazing tech for you...</p>
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
        <div className='bg-black text-white min-h-screen'>
            <div className='w-11/12 mx-auto'>
                <ReTitle title='Digital Xpress | Products'></ReTitle>

                {/* Floating Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="fixed top-4 left-4 z-40"
                >
                    <Link to="/" className="btn btn-ghost btn-circle bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 border border-gray-700 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                </motion.div>

                <div className="container mx-auto px-4 py-8 relative">
                    {/* Mobile Toggle - Always visible */}
                    <div className="md:hidden flex justify-between items-center mb-6 bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-lg">
                        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                            {categorySlug ? categories.find(c => c.slug === categorySlug)?.name || "Products" : "All Products"}
                        </h1>
                        <button
                            className="btn btn-sm bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Filters
                        </button>
                    </div>

                    {/* Mobile Filters Panel */}
                    <AnimatePresence>
                        {showMobileFilters && (
                            <motion.div
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: '100%' }}
                                transition={{ type: 'spring', damping: 25 }}
                                className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm overflow-y-auto"
                            >
                                <div className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-2xl m-4 p-6 max-h-[90vh] overflow-y-auto">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                                            Filters
                                        </h2>
                                        <button
                                            className="btn btn-sm btn-circle btn-ghost text-orange-400 hover:bg-gray-700"
                                            onClick={() => setShowMobileFilters(false)}
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="space-y-6 text-white">
                                        {/* Categories */}
                                        <div className="collapse collapse-plus bg-gray-700/50 rounded-xl border border-gray-600">
                                            <input type="checkbox" defaultChecked />
                                            <div className="collapse-title font-semibold text-orange-400">
                                                Categories
                                            </div>
                                            <div className="collapse-content">
                                                <ul className="space-y-2">
                                                    {categories.map((category, index) => (
                                                        <motion.li
                                                            key={index}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ type: 'spring', stiffness: 300 }}
                                                        >
                                                            <Link
                                                                to={`/products/${category.slug}`}
                                                                className={`hover:text-orange-400 transition-colors block py-1 ${categorySlug === category.slug ? 'text-orange-400 font-medium' : ''}`}
                                                            >
                                                                {category.name}
                                                            </Link>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Brands */}
                                        <div className="collapse collapse-plus bg-gray-700/50 rounded-xl border border-gray-600">
                                            <input type="checkbox" defaultChecked />
                                            <div className="collapse-title font-semibold text-orange-400">
                                                Brands
                                            </div>
                                            <div className="collapse-content space-y-2">
                                                {brands.map(brand => (
                                                    <motion.div
                                                        key={brand}
                                                        className="flex items-center"
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`brand-${brand}`}
                                                            checked={selectedBrands.includes(brand)}
                                                            onChange={() => handleBrandChange(brand)}
                                                            className="checkbox checkbox-sm checkbox-warning mr-2 bg-gray-700 border-gray-600"
                                                        />
                                                        <label htmlFor={`brand-${brand}`} className="cursor-pointer">{brand}</label>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="collapse collapse-plus bg-gray-700/50 rounded-xl border border-gray-600">
                                            <input type="checkbox" defaultChecked />
                                            <div className="collapse-title font-semibold text-orange-400">
                                                Price Range
                                            </div>
                                            <div className="collapse-content space-y-2">
                                                {priceRanges.map((range, index) => (
                                                    <motion.div
                                                        key={index}
                                                        className="flex items-center"
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            id={`price-${index}`}
                                                            name="price-range"
                                                            checked={selectedPriceRange?.min === range.min}
                                                            onChange={() => handlePriceRangeChange(range)}
                                                            className="radio radio-sm radio-warning mr-2 bg-gray-700 border-gray-600"
                                                        />
                                                        <label htmlFor={`price-${index}`} className="cursor-pointer">{range.label}</label>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Ratings */}
                                        <div className="collapse collapse-plus bg-gray-700/50 rounded-xl border border-gray-600">
                                            <input type="checkbox" defaultChecked />
                                            <div className="collapse-title font-semibold text-orange-400">
                                                Customer Ratings
                                            </div>
                                            <div className="collapse-content space-y-2">
                                                {[5, 4, 3, 2, 1].map(rating => (
                                                    <motion.div
                                                        key={rating}
                                                        className="flex items-center"
                                                        whileHover={{ scale: 1.02 }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            id={`rating-${rating}`}
                                                            name="rating"
                                                            checked={selectedRating === rating}
                                                            onChange={() => handleRatingChange(rating)}
                                                            className="radio radio-sm radio-warning mr-2 bg-gray-700 border-gray-600"
                                                        />
                                                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                                            ))}
                                                            <span className="ml-1 text-sm text-gray-400">& Up</span>
                                                        </label>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        {allFeatures.length > 0 && (
                                            <div className="collapse collapse-plus bg-gray-700/50 rounded-xl border border-gray-600">
                                                <input type="checkbox" />
                                                <div className="collapse-title font-semibold text-orange-400">
                                                    Features
                                                </div>
                                                <div className="collapse-content space-y-2">
                                                    {allFeatures.map(feature => (
                                                        <motion.div
                                                            key={feature}
                                                            className="flex items-center"
                                                            whileHover={{ scale: 1.02 }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`feature-${feature}`}
                                                                checked={selectedFeatures.includes(feature)}
                                                                onChange={() => handleFeatureChange(feature)}
                                                                className="checkbox checkbox-sm checkbox-warning mr-2 bg-gray-700 border-gray-600"
                                                            />
                                                            <label htmlFor={`feature-${feature}`} className="cursor-pointer">{feature}</label>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 mt-6">
                                        <button
                                            className="btn btn-block bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg"
                                            onClick={() => setShowMobileFilters(false)}
                                        >
                                            Apply Filters
                                        </button>
                                        <button
                                            className="btn btn-block btn-outline btn-warning"
                                            onClick={() => {
                                                setSelectedBrands([]);
                                                setSelectedPriceRange(null);
                                                setSelectedRating(null);
                                                setSelectedFeatures([]);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Desktop Filters - Vertical (left side) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hidden md:block w-72 flex-shrink-0"
                        >
                            <div className="sticky top-30 inset-0 space-y-4">
                                {/* Categories */}
                                <CollapsibleSection title="Categories" defaultOpen={true}>
                                    <ul className="space-y-2">
                                        {categories.map((category, index) => (
                                            <motion.li
                                                key={index}
                                                whileHover={{ x: 5 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                            >
                                                <Link
                                                    to={`/products/${category.slug}`}
                                                    className={`hover:text-orange-400 transition-colors block py-1 ${categorySlug === category.slug ? 'text-orange-400 font-medium' : ''}`}
                                                >
                                                    {category.name}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CollapsibleSection>

                                {/* Brands */}
                                <CollapsibleSection title="Brands">
                                    <div className="space-y-2">
                                        {brands.map(brand => (
                                            <motion.div
                                                key={brand}
                                                className="flex items-center"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`desktop-brand-${brand}`}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandChange(brand)}
                                                    className="checkbox checkbox-sm checkbox-warning mr-2 bg-gray-700 border-gray-600"
                                                />
                                                <label htmlFor={`desktop-brand-${brand}`} className="cursor-pointer">{brand}</label>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CollapsibleSection>

                                {/* Price Ranges */}
                                <CollapsibleSection title="Price Range">
                                    <div className="space-y-2">
                                        {priceRanges.map((range, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex items-center"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <input
                                                    type="radio"
                                                    id={`desktop-price-${index}`}
                                                    name="desktop-price-range"
                                                    checked={selectedPriceRange?.min === range.min}
                                                    onChange={() => handlePriceRangeChange(range)}
                                                    className="radio radio-sm radio-warning mr-2 bg-gray-700 border-gray-600"
                                                />
                                                <label htmlFor={`desktop-price-${index}`} className="cursor-pointer">{range.label}</label>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CollapsibleSection>

                                {/* Ratings */}
                                <CollapsibleSection title="Customer Ratings">
                                    <div className="space-y-2">
                                        {[5, 4, 3, 2, 1].map(rating => (
                                            <motion.div
                                                key={rating}
                                                className="flex items-center"
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                <input
                                                    type="radio"
                                                    id={`desktop-rating-${rating}`}
                                                    name="desktop-rating"
                                                    checked={selectedRating === rating}
                                                    onChange={() => handleRatingChange(rating)}
                                                    className="radio radio-sm radio-warning mr-2 bg-gray-700 border-gray-600"
                                                />
                                                <label htmlFor={`desktop-rating-${rating}`} className="flex items-center cursor-pointer">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                                    ))}
                                                    <span className="ml-1 text-sm text-gray-400">& Up</span>
                                                </label>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CollapsibleSection>

                                {/* Features */}
                                {allFeatures.length > 0 && (
                                    <CollapsibleSection title="Features">
                                        <div className="grid grid-cols-2 gap-2">
                                            {allFeatures.map(feature => (
                                                <motion.div
                                                    key={feature}
                                                    className="flex items-center"
                                                    whileHover={{ scale: 1.02 }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        id={`desktop-feature-${feature}`}
                                                        checked={selectedFeatures.includes(feature)}
                                                        onChange={() => handleFeatureChange(feature)}
                                                        className="checkbox checkbox-sm checkbox-warning mr-2 bg-gray-700 border-gray-600"
                                                    />
                                                    <label htmlFor={`desktop-feature-${feature}`} className="cursor-pointer text-sm">{feature}</label>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CollapsibleSection>
                                )}

                                <button
                                    className="btn btn-block btn-outline btn-warning mt-4"
                                    onClick={() => {
                                        setSelectedBrands([]);
                                        setSelectedPriceRange(null);
                                        setSelectedRating(null);
                                        setSelectedFeatures([]);
                                        setCurrentPage(1);
                                    }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </motion.div>

                        {/* Products Section (right side) */}
                        <div className="flex-1">
                            {/* Title and Sorting - Desktop */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="hidden md:flex justify-between items-center mb-6 bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg"
                            >
                                <div>
                                    <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                                        {categorySlug ? categories.find(c => c.slug === categorySlug)?.name || "Products" : "All Products"}
                                    </h1>
                                    <p className="text-sm text-gray-400">
                                        {selectedBrands.length > 0 || selectedPriceRange || selectedRating || selectedFeatures.length > 0 ? (
                                            <span>Showing {filteredProducts.length} filtered products</span>
                                        ) : (
                                            <span>Showing all {filteredProducts.length} products</span>
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className='flex gap-1 text-sm text-gray-400'>
                                            <span>Sort</span>
                                            <span>By:</span>
                                        </div>
                                        <select
                                            className="select select-bordered select-warning bg-gray-800 border-gray-700 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-500 shadow-sm"
                                            value={sortOption}
                                            onChange={(e) => {
                                                setSortOption(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                        >
                                            <option value="popularity">Popularity</option>
                                            <option value="newest">Newest</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Active Filters */}
                            {(selectedBrands.length > 0 || selectedPriceRange || selectedRating || selectedFeatures.length > 0) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 bg-gray-800/80 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-lg"
                                >
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-sm font-medium text-gray-400">Active filters:</span>
                                        {selectedBrands.map(brand => (
                                            <motion.span
                                                key={brand}
                                                className="badge badge-warning gap-2 bg-orange-600/80 border-orange-500 text-white"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {brand}
                                                <button onClick={() => handleBrandChange(brand)} className="text-xs hover:text-white">✕</button>
                                            </motion.span>
                                        ))}
                                        {selectedPriceRange && (
                                            <motion.span
                                                className="badge badge-warning gap-2 bg-orange-600/80 border-orange-500 text-white"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {selectedPriceRange.label}
                                                <button onClick={() => setSelectedPriceRange(null)} className="text-xs hover:text-white">✕</button>
                                            </motion.span>
                                        )}
                                        {selectedRating && (
                                            <motion.span
                                                className="badge badge-warning gap-2 bg-orange-600/80 border-orange-500 text-white"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {selectedRating} Stars
                                                <button onClick={() => setSelectedRating(null)} className="text-xs hover:text-white">✕</button>
                                            </motion.span>
                                        )}
                                        {selectedFeatures.map(feature => (
                                            <motion.span
                                                key={feature}
                                                className="badge badge-warning gap-2 bg-orange-600/80 border-orange-500 text-white"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {feature}
                                                <button onClick={() => handleFeatureChange(feature)} className="text-xs hover:text-white">✕</button>
                                            </motion.span>
                                        ))}
                                        <button
                                            className="text-orange-400 text-sm ml-2 hover:underline hover:text-orange-300"
                                            onClick={() => {
                                                setSelectedBrands([]);
                                                setSelectedPriceRange(null);
                                                setSelectedRating(null);
                                                setSelectedFeatures([]);
                                            }}
                                        >
                                            Clear all
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Products Grid */}
                            {currentProducts.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg"
                                >
                                    <div className="text-6xl mb-4 text-orange-400">🔍</div>
                                    <h3 className="text-xl font-medium mb-2">No products found</h3>
                                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                        Try adjusting your filters or browse our full catalog of amazing products.
                                    </p>
                                    <Link to="/products" className="btn bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg">
                                        View All Products
                                    </Link>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {currentProducts.map(product => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 300 }}
                                                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.1)' }}
                                                className="card bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-900/20 rounded-xl overflow-hidden"
                                            >
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
                                                            <Link to={`/product/${product.id}`} className="line-clamp-2">{product.name}</Link>
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
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex justify-center mt-8"
                                        >
                                            <div className="join">
                                                <button
                                                    className="join-item btn btn-outline btn-warning"
                                                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                                                            onClick={() => handlePageChange(pageNum)}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                                <button
                                                    className="join-item btn btn-outline btn-warning"
                                                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
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
                </div>
            </div>
        </div>
    );
};

export default ProductCategoriesPage;