import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulate API call
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
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg text-orange-500 mb-4"></span>
                <p className="text-orange-500 text-lg">Loading products...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="alert alert-error bg-red-900 text-white max-w-md mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error loading products: {error}</span>
                <button className="btn btn-sm btn-ghost" onClick={() => window.location.reload()}>Retry</button>
            </div>
        </div>
    );

    return (
        <div className='bg-black text-white h-auto'>
            <div className="w-11/12 mx-auto">
                <div className="container mx-auto px-4 py-8">
                    {/* Mobile Toggle - Always visible */}
                    <div className="md:hidden flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg">
                        <h1 className="text-xl font-bold text-orange-400">
                            {categorySlug ? categories.find(c => c.slug === categorySlug)?.name || "Products" : "All Products"}
                        </h1>
                        <button
                            className="btn btn-outline btn-warning"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Filters
                        </button>
                    </div>

                    {/* Mobile Filters Panel */}
                    <div className={`md:hidden ${showMobileFilters ? 'block fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto' : 'hidden'}`}>
                        <div className={`bg-gray-900 p-6 rounded-lg shadow-sm m-4 border border-orange-500`}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-orange-500">Filters</h2>
                                <button
                                    className="btn btn-sm btn-ghost text-orange-500"
                                    onClick={() => setShowMobileFilters(false)}
                                >
                                    ✕ Close
                                </button>
                            </div>

                            {/* Filters */}
                            <div className="space-y-6 text-white">
                                {/* Categories */}
                                <div className="collapse collapse-plus bg-gray-800 rounded-box">
                                    <input type="checkbox" defaultChecked />
                                    <div className="collapse-title font-semibold text-orange-400">
                                        Categories
                                    </div>
                                    <div className="collapse-content">
                                        <ul className="space-y-2">
                                            {categories.map((category, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={`/products/${category.slug}`}
                                                        className={`hover:text-orange-500 transition-colors block py-1 ${categorySlug === category.slug ? 'text-orange-500 font-medium' : ''}`}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Brands */}
                                <div className="collapse collapse-plus bg-gray-800 rounded-box">
                                    <input type="checkbox" defaultChecked />
                                    <div className="collapse-title font-semibold text-orange-400">
                                        Brands
                                    </div>
                                    <div className="collapse-content space-y-2">
                                        {brands.map(brand => (
                                            <div key={brand} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`brand-${brand}`}
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandChange(brand)}
                                                    className="checkbox checkbox-sm checkbox-warning mr-2"
                                                />
                                                <label htmlFor={`brand-${brand}`} className="cursor-pointer">{brand}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="collapse collapse-plus bg-gray-800 rounded-box">
                                    <input type="checkbox" defaultChecked />
                                    <div className="collapse-title font-semibold text-orange-400">
                                        Price Range
                                    </div>
                                    <div className="collapse-content space-y-2">
                                        {priceRanges.map((range, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`price-${index}`}
                                                    name="price-range"
                                                    checked={selectedPriceRange?.min === range.min}
                                                    onChange={() => handlePriceRangeChange(range)}
                                                    className="radio radio-sm radio-warning mr-2"
                                                />
                                                <label htmlFor={`price-${index}`} className="cursor-pointer">{range.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className="collapse collapse-plus bg-gray-800 rounded-box">
                                    <input type="checkbox" defaultChecked />
                                    <div className="collapse-title font-semibold text-orange-400">
                                        Customer Ratings
                                    </div>
                                    <div className="collapse-content space-y-2">
                                        {[5, 4, 3, 2, 1].map(rating => (
                                            <div key={rating} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`rating-${rating}`}
                                                    name="rating"
                                                    checked={selectedRating === rating}
                                                    onChange={() => handleRatingChange(rating)}
                                                    className="radio radio-sm radio-warning mr-2"
                                                />
                                                <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                                    ))}
                                                    <span className="ml-1">& Up</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                {allFeatures.length > 0 && (
                                    <div className="collapse collapse-plus bg-gray-800 rounded-box">
                                        <input type="checkbox" />
                                        <div className="collapse-title font-semibold text-orange-400">
                                            Features
                                        </div>
                                        <div className="collapse-content space-y-2">
                                            {allFeatures.map(feature => (
                                                <div key={feature} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`feature-${feature}`}
                                                        checked={selectedFeatures.includes(feature)}
                                                        onChange={() => handleFeatureChange(feature)}
                                                        className="checkbox checkbox-sm checkbox-warning mr-2"
                                                    />
                                                    <label htmlFor={`feature-${feature}`} className="cursor-pointer">{feature}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="btn btn-outline btn-warning w-full mt-6"
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
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col">
                        {/* Title and Sorting - Desktop */}
                        <div className="hidden md:flex justify-between items-center mb-6 bg-gray-900 p-4 rounded-lg">
                            <div>
                                <h1 className="text-2xl font-bold text-orange-400">
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
                                    <div className='flex gap-1 text-sm'>
                                        <span>Sort</span>
                                        <span>By:</span>
                                    </div>
                                    <select
                                        className="select select-bordered select-warning"
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
                        </div>

                        {/* Desktop Filters - Horizontal */}
                        <div className="hidden md:block mb-6 bg-gray-900 p-4 rounded-lg border border-orange-500">
                            <div className="flex flex-wrap gap-6">
                                {/* Categories */}
                                <div className="dropdown dropdown-hover">
                                    <label tabIndex={0} className="btn btn-outline btn-warning m-1">
                                        Categories
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 rounded-box w-52">
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={`/products/${category.slug}`}
                                                    className={`hover:text-orange-500 ${categorySlug === category.slug ? 'text-orange-500 font-medium' : ''}`}
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Brands */}
                                <div className="dropdown dropdown-hover">
                                    <label tabIndex={0} className="btn btn-outline btn-warning m-1">
                                        Brands
                                    </label>
                                    <div tabIndex={0} className="dropdown-content z-[1] p-4 shadow bg-gray-800 rounded-box w-64">
                                        <div className="grid grid-cols-2 gap-2">
                                            {brands.map(brand => (
                                                <div key={brand} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`desktop-brand-${brand}`}
                                                        checked={selectedBrands.includes(brand)}
                                                        onChange={() => handleBrandChange(brand)}
                                                        className="checkbox checkbox-sm checkbox-warning mr-2"
                                                    />
                                                    <label htmlFor={`desktop-brand-${brand}`} className="cursor-pointer">{brand}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="dropdown dropdown-hover">
                                    <label tabIndex={0} className="btn btn-outline btn-warning m-1">
                                        Price Range
                                    </label>
                                    <div tabIndex={0} className="dropdown-content z-[1] p-4 shadow bg-gray-800 rounded-box w-64">
                                        <div className="space-y-2">
                                            {priceRanges.map((range, index) => (
                                                <div key={index} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`desktop-price-${index}`}
                                                        name="desktop-price-range"
                                                        checked={selectedPriceRange?.min === range.min}
                                                        onChange={() => handlePriceRangeChange(range)}
                                                        className="radio radio-sm radio-warning mr-2"
                                                    />
                                                    <label htmlFor={`desktop-price-${index}`} className="cursor-pointer">{range.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Ratings */}
                                <div className="dropdown dropdown-hover">
                                    <label tabIndex={0} className="btn btn-outline btn-warning m-1">
                                        Ratings
                                    </label>
                                    <div tabIndex={0} className="dropdown-content z-[1] p-4 shadow bg-gray-800 rounded-box w-64">
                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map(rating => (
                                                <div key={rating} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`desktop-rating-${rating}`}
                                                        name="desktop-rating"
                                                        checked={selectedRating === rating}
                                                        onChange={() => handleRatingChange(rating)}
                                                        className="radio radio-sm radio-warning mr-2"
                                                    />
                                                    <label htmlFor={`desktop-rating-${rating}`} className="flex items-center cursor-pointer">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                                                        ))}
                                                        <span className="ml-1">& Up</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                {allFeatures.length > 0 && (
                                    <div className="dropdown dropdown-hover">
                                        <label tabIndex={0} className="btn btn-outline btn-warning m-1">
                                            Features
                                        </label>
                                        <div tabIndex={0} className="dropdown-content z-[1] p-4 shadow bg-gray-800 rounded-box w-64">
                                            <div className="grid grid-cols-2 gap-2">
                                                {allFeatures.map(feature => (
                                                    <div key={feature} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`desktop-feature-${feature}`}
                                                            checked={selectedFeatures.includes(feature)}
                                                            onChange={() => handleFeatureChange(feature)}
                                                            className="checkbox checkbox-sm checkbox-warning mr-2"
                                                        />
                                                        <label htmlFor={`desktop-feature-${feature}`} className="cursor-pointer">{feature}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    className="btn btn-outline btn-warning m-1"
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

                        {/* Active Filters */}
                        {(selectedBrands.length > 0 || selectedPriceRange || selectedRating || selectedFeatures.length > 0) && (
                            <div className="mb-6 bg-gray-800 p-4 rounded-lg">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium">Active filters:</span>
                                    {selectedBrands.map(brand => (
                                        <span key={brand} className="badge badge-warning gap-2">
                                            {brand}
                                            <button onClick={() => handleBrandChange(brand)} className="text-xs">✕</button>
                                        </span>
                                    ))}
                                    {selectedPriceRange && (
                                        <span className="badge badge-warning gap-2">
                                            {selectedPriceRange.label}
                                            <button onClick={() => setSelectedPriceRange(null)} className="text-xs">✕</button>
                                        </span>
                                    )}
                                    {selectedRating && (
                                        <span className="badge badge-warning gap-2">
                                            {selectedRating} Stars
                                            <button onClick={() => setSelectedRating(null)} className="text-xs">✕</button>
                                        </span>
                                    )}
                                    {selectedFeatures.map(feature => (
                                        <span key={feature} className="badge badge-warning gap-2">
                                            {feature}
                                            <button onClick={() => handleFeatureChange(feature)} className="text-xs">✕</button>
                                        </span>
                                    ))}
                                    <button
                                        className="text-orange-400 text-sm ml-2 hover:underline"
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
                            </div>
                        )}

                        {/* Products Grid */}
                        {currentProducts.length === 0 ? (
                            <div className="text-center py-16 bg-gray-900 rounded-lg">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-medium mb-2">No products found</h3>
                                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                    Try adjusting your filters or browse our full catalog of amazing products.
                                </p>
                                <Link to="/products" className="btn btn-warning">
                                    View All Products
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentProducts.map(product => (
                                        <div key={product.id} className="card bg-gray-900 text-white border border-gray-800 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-900/20">
                                            <figure className="px-4 pt-4 bg-black rounded-t-lg relative">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="rounded-xl h-48 w-full object-contain"
                                                    loading="lazy"
                                                />
                                                {new Date(product.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                                                    <span className="absolute top-4 right-4 badge badge-warning badge-sm animate-pulse">NEW</span>
                                                )}
                                                {product.discount > 0 && (
                                                    <span className="absolute top-4 left-4 badge badge-error badge-sm">
                                                        -{product.discount}%
                                                    </span>
                                                )}
                                            </figure>
                                            <div className="card-body p-4">
                                                <div className="flex justify-between items-start">
                                                    <h2 className="card-title text-base hover:text-orange-400 transition-colors">
                                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
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
                                                    <div className='text-lg font-bold text-orange-400'>
                                                        Price: {product.price}
                                                    </div>
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
                                                    <button className="btn text-white bg-orange-600 w-full hover:bg-orange-700 transition-colors">
                                                        Add to Cart
                                                    </button>
                                                    <button className="btn border border-orange-400  text-orange-400 bg-gray-800 hover:bg-orange-600 hover:text-white w-full">
                                                        Quick View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-8">
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
                                                        className={`join-item btn ${currentPage === pageNum ? 'btn-warning' : 'btn-outline btn-warning'}`}
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
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCategoriesPage;