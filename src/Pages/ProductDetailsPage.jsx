import { ReTitle } from 're-title';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';


const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [zoomImage, setZoomImage] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Simulate API call with shimmer effect
                await new Promise(resolve => setTimeout(resolve, 800));
                const response = await fetch('/data/bestproducts.json');
                const data = await response.json();
                
                const foundProduct = data.find(p => p.id === parseInt(id));
                if (!foundProduct) {
                    throw new Error('Product not found');
                }
                
                // Find related products (same category)
                const related = data
                    .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 4);
                
                setProduct(foundProduct);
                setRelatedProducts(related);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleImageZoom = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPosition({ x, y });
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }

        return stars;
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
                <h2 className="text-xl font-medium text-orange-400">Loading Product</h2>
                <p className="text-gray-400">Getting all the details for you...</p>
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
                    <h3 className="font-bold">Error loading product</h3>
                    <span className="text-sm">{error}</span>
                </div>
                <button
                    className="btn btn-sm btn-ghost hover:bg-red-800/50"
                    onClick={() => navigate('/products')}
                >
                    Back to Products
                </button>
            </motion.div>
        </div>
    );

    return (
        <div className='bg-black text-white min-h-screen'>
            <div className='w-11/12 mx-auto'>
                <ReTitle title={`Digital Xpress | ${product.name}`}></ReTitle>

                {/* Floating Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="fixed top-4 left-4 z-40"
                >
                    <button 
                        onClick={() => navigate(-1)} 
                        className="btn btn-ghost btn-circle bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 border border-gray-700 shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                </motion.div>

                <div className="container mx-auto px-4 py-8 relative">
                    {/* Breadcrumbs */}
                    <div className="text-sm breadcrumbs mb-6 text-gray-400">
                        <ul>
                            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
                            <li><Link to="/products" className="hover:text-orange-400">Products</Link></li>
                            <li><Link to={`/products/${product.category}`} className="hover:text-orange-400 capitalize">
                                {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </Link></li>
                            <li className="text-orange-400">{product.name}</li>
                        </ul>
                    </div>

                    {/* Main Product Section */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Product Images */}
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="relative bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
                                onMouseEnter={() => setZoomImage(true)}
                                onMouseLeave={() => setZoomImage(false)}
                                onMouseMove={handleImageZoom}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={`w-full h-auto ${zoomImage ? 'cursor-zoom-in' : 'cursor-pointer'} transition-transform duration-300`}
                                    style={{
                                        transform: zoomImage ? 'scale(1.5)' : 'scale(1)',
                                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                                    }}
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        SAVE {product.discount}%
                                    </div>
                                )}
                                {new Date(product.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                        NEW ARRIVAL
                                    </div>
                                )}
                            </motion.div>

                            {/* Thumbnail Gallery */}
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                {[product.image, ...(product.additionalImages || [])].map((img, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg border ${selectedImage === index ? 'border-orange-400' : 'border-gray-700'} overflow-hidden cursor-pointer bg-gray-900`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-lg"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                                            {product.name}
                                        </h1>
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-400 flex mr-1">
                                                {renderRatingStars(product.rating)}
                                            </span>
                                            <span className="text-sm text-gray-400 ml-1">
                                                ({product.reviews.toLocaleString()} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="badge badge-outline border-orange-400 text-orange-400">
                                            {product.brand}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                                            ${product.price.toFixed(2)}
                                        </div>
                                        {product.discount > 0 && (
                                            <>
                                                <div className="text-lg text-gray-400 line-through">
                                                    ${(product.price / (1 - product.discount / 100)).toFixed(2)}
                                                </div>
                                                <div className="text-sm bg-orange-600 text-white px-2 py-1 rounded">
                                                    Save ${((product.price / (1 - product.discount / 100)) - product.price).toFixed(2)}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {product.inStock ? (
                                        <div className="mt-2 text-green-400 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            In Stock & Ready to Ship
                                        </div>
                                    ) : (
                                        <div className="mt-2 text-red-400 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            Out of Stock - Preorder Available
                                        </div>
                                    )}

                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Key Features</h3>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <motion.li
                                                    key={index}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: 'spring', stiffness: 300 }}
                                                    className="flex items-start"
                                                >
                                                    <span className="text-orange-400 mr-2">✓</span>
                                                    <span>{feature}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Color Options</h3>
                                        <div className="flex gap-3">
                                            {['Space Black', 'Phantom Silver', 'Burgundy', 'Green'].map(color => (
                                                <motion.div
                                                    key={color}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`w-10 h-10 rounded-full border-2 ${color === 'Space Black' ? 'border-orange-400' : 'border-gray-700'}`}
                                                    style={{
                                                        backgroundColor: color === 'Space Black' ? '#1a1a1a' :
                                                                        color === 'Phantom Silver' ? '#e5e7eb' :
                                                                        color === 'Burgundy' ? '#800020' : '#4CAF50'
                                                    }}
                                                    title={color}
                                                />
                                            ))}
                                        </div>
                                    </div> */}

                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold text-orange-400 mb-2">Quantity</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                                                <button
                                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white"
                                                    onClick={() => handleQuantityChange(-1)}
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 bg-gray-800">{quantity}</span>
                                                <button
                                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white"
                                                    onClick={() => handleQuantityChange(1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {product.inStock ? `${product.stock} available` : 'Preorder item'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <button className="btn bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg flex-1">
                                            Add to Cart
                                        </button>
                                        <button className="btn btn-outline btn-warning flex-1">
                                            Buy Now
                                        </button>
                                        <button className="btn btn-ghost text-orange-400 hover:bg-gray-700/50 w-full mt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Add to Wishlist
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="mt-12">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden"
                        >
                            <div className="tabs tabs-boxed bg-gray-800 border-b border-gray-700">
                                {['description', 'specifications', 'reviews', 'support'].map(tab => (
                                    <button
                                        key={tab}
                                        className={`tab ${selectedTab === tab ? 'tab-active bg-gray-700 text-orange-400' : ''}`}
                                        onClick={() => setSelectedTab(tab)}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {selectedTab === 'description' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-4">
                                            Product Description
                                        </h2>
                                        <div className={`text-gray-300 ${showFullDescription ? '' : 'max-h-96 overflow-hidden'}`}>
                                            <p className="mb-4">
                                                Introducing the revolutionary {product.name} from {product.brand}, designed to redefine your mobile experience. 
                                                With cutting-edge technology and premium craftsmanship, this device sets a new standard in its category.
                                            </p>
                                            <p className="mb-4">
                                                The {product.name} features a stunning {product.features.includes('Foldable') ? 'foldable ' : ''}display that delivers vibrant colors and sharp details, 
                                                perfect for multimedia consumption and productivity. Powered by the latest processor, 
                                                it ensures smooth performance even with the most demanding applications.
                                            </p>
                                            <h3 className="text-lg font-semibold text-orange-400 mt-6 mb-2">Design & Build</h3>
                                            <p className="mb-4">
                                                Crafted with premium materials, the {product.name} boasts an elegant and durable design. 
                                                The ergonomic form factor ensures comfortable handling, while the {product.features.includes('Waterproof') ? 'waterproof ' : ''}construction 
                                                provides peace of mind in various environments.
                                            </p>
                                            <h3 className="text-lg font-semibold text-orange-400 mt-6 mb-2">Performance</h3>
                                            <p className="mb-4">
                                                Experience blazing-fast speeds with the advanced chipset and ample RAM. 
                                                Whether you're gaming, streaming, or multitasking, the {product.name} handles it all with ease.
                                            </p>
                                            <h3 className="text-lg font-semibold text-orange-400 mt-6 mb-2">Camera System</h3>
                                            <p className="mb-4">
                                                Capture stunning photos and videos with the professional-grade camera system. 
                                                Featuring advanced sensors and AI-powered enhancements, every shot is picture-perfect.
                                            </p>
                                            <h3 className="text-lg font-semibold text-orange-400 mt-6 mb-2">Battery Life</h3>
                                            <p>
                                                The high-capacity battery ensures all-day usage, while fast charging technology 
                                                gets you back to full power in no time.
                                            </p>
                                        </div>
                                        <button
                                            className="text-orange-400 hover:text-orange-300 mt-4 flex items-center"
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                        >
                                            {showFullDescription ? 'Show Less' : 'Read More'}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </motion.div>
                                )}

                                {selectedTab === 'specifications' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-6">
                                            Technical Specifications
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">General</h3>
                                                <table className="table-auto w-full text-gray-300">
                                                    <tbody>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Brand</td>
                                                            <td className="py-2 text-right">{product.brand}</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Model</td>
                                                            <td className="py-2 text-right">{product.name}</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Release Date</td>
                                                            <td className="py-2 text-right">{new Date(product.date).toLocaleDateString()}</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Dimensions</td>
                                                            <td className="py-2 text-right">158.2 x 72.6 x 8.9 mm</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Weight</td>
                                                            <td className="py-2 text-right">196g</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Display</h3>
                                                <table className="table-auto w-full text-gray-300">
                                                    <tbody>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Type</td>
                                                            <td className="py-2 text-right">Dynamic AMOLED 2X</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Size</td>
                                                            <td className="py-2 text-right">6.7 inches</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Resolution</td>
                                                            <td className="py-2 text-right">1440 x 3200 pixels</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Refresh Rate</td>
                                                            <td className="py-2 text-right">120Hz</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Performance</h3>
                                                <table className="table-auto w-full text-gray-300">
                                                    <tbody>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Processor</td>
                                                            <td className="py-2 text-right">Octa-core (1x3.2 GHz)</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">RAM</td>
                                                            <td className="py-2 text-right">12GB</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Storage</td>
                                                            <td className="py-2 text-right">{product.features.includes('512GB') ? '512GB' : '256GB'}</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">OS</td>
                                                            <td className="py-2 text-right">Android 13</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Camera</h3>
                                                <table className="table-auto w-full text-gray-300">
                                                    <tbody>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Main Camera</td>
                                                            <td className="py-2 text-right">108MP, f/1.8</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Ultra Wide</td>
                                                            <td className="py-2 text-right">12MP, f/2.2</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Telephoto</td>
                                                            <td className="py-2 text-right">10MP, f/2.4</td>
                                                        </tr>
                                                        <tr className="border-b border-gray-700">
                                                            <td className="py-2 font-medium">Front Camera</td>
                                                            <td className="py-2 text-right">40MP, f/2.2</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {selectedTab === 'reviews' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-6">
                                            Customer Reviews
                                        </h2>
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="md:w-1/3">
                                                <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                                    <div className="text-center">
                                                        <div className="text-5xl font-bold text-orange-400 mb-2">
                                                            {product.rating.toFixed(1)}
                                                        </div>
                                                        <div className="flex justify-center mb-2">
                                                            {renderRatingStars(product.rating)}
                                                        </div>
                                                        <div className="text-gray-400 text-sm">
                                                            Based on {product.reviews.toLocaleString()} reviews
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 space-y-3">
                                                        {[5, 4, 3, 2, 1].map(rating => (
                                                            <div key={rating} className="flex items-center">
                                                                <div className="w-10 text-sm text-gray-400">
                                                                    {rating} star
                                                                </div>
                                                                <div className="flex-1 h-2 bg-gray-600 rounded-full mx-2">
                                                                    <div
                                                                        className="h-full bg-orange-500 rounded-full"
                                                                        style={{ width: `${(Math.random() * 30 + 70 - (5 - rating) * 15)}%` }}
                                                                    ></div>
                                                                </div>
                                                                <div className="w-10 text-sm text-gray-400 text-right">
                                                                    {Math.floor(Math.random() * 30 + 70 - (5 - rating) * 15)}%
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <button className="btn btn-block bg-gradient-to-r from-orange-600 to-amber-600 border-none text-white hover:from-orange-700 hover:to-amber-700 shadow-lg mt-6">
                                                        Write a Review
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="md:w-2/3">
                                                <div className="space-y-6">
                                                    {[1, 2, 3].map(review => (
                                                        <div key={review} className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                                            <div className="flex justify-between items-start mb-3">
                                                                <div>
                                                                    <h4 className="font-medium">Customer {review}</h4>
                                                                    <div className="flex items-center mt-1">
                                                                        <div className="flex text-yellow-400 mr-2">
                                                                            {renderRatingStars(5 - review + 1)}
                                                                        </div>
                                                                        <span className="text-xs text-gray-400">
                                                                            {new Date(Date.now() - review * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="badge badge-outline badge-sm border-gray-600 text-gray-400">
                                                                    Verified Purchase
                                                                </div>
                                                            </div>
                                                            <h5 className="font-semibold text-orange-400 mb-2">
                                                                {review === 1 ? 'Absolutely amazing!' : 
                                                                 review === 2 ? 'Great product with minor issues' : 'Disappointed with performance'}
                                                            </h5>
                                                            <p className="text-gray-300">
                                                                {review === 1 ? 
                                                                    "This is hands down the best phone I've ever owned. The display is stunning, battery life is incredible, and the camera quality exceeds my expectations." :
                                                                    review === 2 ?
                                                                    "Overall a great device, but the battery could last longer. The camera is excellent though, especially in low light conditions." :
                                                                    "Expected better performance for the price. The device heats up during gaming and battery drains faster than advertised."
                                                                }
                                                            </p>
                                                            <div className="flex gap-2 mt-4">
                                                                <button className="text-xs text-orange-400 hover:underline">Helpful</button>
                                                                <button className="text-xs text-gray-400 hover:underline">Report</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-center mt-8">
                                                    <button className="btn btn-outline btn-warning">
                                                        Load More Reviews
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {selectedTab === 'support' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-6">
                                            Support & Warranty
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Warranty Information</h3>
                                                <p className="text-gray-300 mb-4">
                                                    Your {product.brand} {product.name} comes with a standard 1-year manufacturer's warranty covering defects in materials and workmanship.
                                                </p>
                                                <ul className="space-y-2 text-gray-300">
                                                    <li className="flex items-start">
                                                        <span className="text-orange-400 mr-2">•</span>
                                                        <span>Warranty period: 12 months from date of purchase</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-orange-400 mr-2">•</span>
                                                        <span>Covers manufacturing defects only</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-orange-400 mr-2">•</span>
                                                        <span>Does not cover accidental damage or liquid contact</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-orange-400 mr-2">•</span>
                                                        <span>Extended warranty options available at checkout</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600">
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">FAQ</h3>
                                                <div className="space-y-4">
                                                    <div className="collapse collapse-plus bg-gray-800/50 rounded-lg border border-gray-600">
                                                        <input type="checkbox" />
                                                        <div className="collapse-title font-medium">
                                                            How do I activate my warranty?
                                                        </div>
                                                        <div className="collapse-content text-gray-300">
                                                            <p>Your warranty is automatically activated upon purchase. Keep your receipt as proof of purchase for warranty claims.</p>
                                                        </div>
                                                    </div>
                                                    <div className="collapse collapse-plus bg-gray-800/50 rounded-lg border border-gray-600">
                                                        <input type="checkbox" />
                                                        <div className="collapse-title font-medium">
                                                            What should I do if my device stops working?
                                                        </div>
                                                        <div className="collapse-content text-gray-300">
                                                            <p>First, try restarting your device. If the issue persists, contact our support team or visit an authorized service center.</p>
                                                        </div>
                                                    </div>
                                                    <div className="collapse collapse-plus bg-gray-800/50 rounded-lg border border-gray-600">
                                                        <input type="checkbox" />
                                                        <div className="collapse-title font-medium">
                                                            Where can I get software updates?
                                                        </div>
                                                        <div className="collapse-content text-gray-300">
                                                            <p>Software updates are delivered over-the-air (OTA). You'll receive a notification when an update is available, or you can check manually in Settings.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 md:col-span-2">
                                                <h3 className="text-lg font-semibold text-orange-400 mb-3">Contact Support</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                                        <div className="flex items-center mb-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                            <span className="font-medium">Phone</span>
                                                        </div>
                                                        <p className="text-gray-300">1-800-DIGITALX</p>
                                                        <p className="text-sm text-gray-400">Mon-Fri: 8AM-8PM EST</p>
                                                    </div>
                                                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                                        <div className="flex items-center mb-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                            <span className="font-medium">Email</span>
                                                        </div>
                                                        <p className="text-gray-300">support@digitalxpress.com</p>
                                                        <p className="text-sm text-gray-400">Response within 24 hours</p>
                                                    </div>
                                                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                                        <div className="flex items-center mb-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                            </svg>
                                                            <span className="font-medium">Live Chat</span>
                                                        </div>
                                                        <p className="text-gray-300">Available 24/7</p>
                                                        <p className="text-sm text-gray-400">Click the chat icon below</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-6">
                                    You May Also Like
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {relatedProducts.map(relatedProduct => (
                                        <motion.div
                                            key={relatedProduct.id}
                                            whileHover={{ y: -5 }}
                                            className="card bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-900/20 rounded-xl overflow-hidden"
                                        >
                                            <Link to={`/product/${relatedProduct.id}`} className="block">
                                                <figure className="relative bg-black">
                                                    <img
                                                        src={relatedProduct.image}
                                                        alt={relatedProduct.name}
                                                        className="h-48 w-full object-contain"
                                                        loading="lazy"
                                                    />
                                                    {new Date(relatedProduct.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && (
                                                        <span className="absolute top-2 left-2 badge badge-warning badge-sm animate-pulse border-none shadow-md">NEW</span>
                                                    )}
                                                    {relatedProduct.discount > 0 && (
                                                        <span className="absolute top-2 right-2 badge badge-error badge-sm border-none shadow-md">
                                                            -{relatedProduct.discount}%
                                                        </span>
                                                    )}
                                                </figure>
                                                <div className="card-body p-4">
                                                    <h3 className="card-title text-sm hover:text-orange-400 transition-colors line-clamp-2">
                                                        {relatedProduct.name}
                                                    </h3>
                                                    <div className="flex items-center mb-1">
                                                        <div className="rating rating-xs">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <input
                                                                    key={i}
                                                                    type="radio"
                                                                    name={`rating-related-${relatedProduct.id}`}
                                                                    className={`mask mask-star-2 ${i < Math.floor(relatedProduct.rating) ? 'bg-orange-400' : 'bg-gray-700'}`}
                                                                    checked={i === Math.floor(relatedProduct.rating) - 1}
                                                                    readOnly
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs ml-1 text-gray-400">({relatedProduct.reviews})</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className='text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300'>
                                                            ${relatedProduct.price.toFixed(2)}
                                                        </div>
                                                        {relatedProduct.discount > 0 && (
                                                            <div className="text-xs text-gray-400 line-through">
                                                                ${(relatedProduct.price / (1 - relatedProduct.discount / 100)).toFixed(2)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}

                    {/* Recently Viewed (simulated) */}
                    <div className="mt-16">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-6">
                                Recently Viewed
                            </h2>
                            <div className="carousel carousel-center w-full space-x-4">
                                {[...relatedProducts].reverse().slice(0, 3).map((item, index) => (
                                    <div key={index} className="carousel-item w-64">
                                        <div className="card bg-gray-800/80 backdrop-blur-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                                            <Link to={`/product/${item.id}`} className="block">
                                                <figure className="relative bg-black">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-40 w-full object-contain"
                                                        loading="lazy"
                                                    />
                                                </figure>
                                                <div className="card-body p-4">
                                                    <h3 className="card-title text-sm hover:text-orange-400 transition-colors line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <div className='text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300'>
                                                            ${item.price.toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Floating Action Buttons */}
            <div className="fixed bottom-22 right-9 z-40 flex flex-col gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-circle bg-gray-800 border-gray-700 text-orange-400 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </motion.button>
            </div>
        </div>
    );
};

export default ProductDetailsPage;