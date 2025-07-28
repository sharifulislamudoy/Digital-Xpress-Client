import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
            {/* Image Section */}
            <div className="relative overflow-hidden flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                    </span>
                )}
                {product.discount && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {product.discount}% OFF
                    </span>
                )}
            </div>

            {/* Content Section - flex-grow makes this section expand */}
            <div className="p-4 flex flex-col flex-grow">
                {/* Title and Category */}
                <div className="mb-3">
                    <h3 className="text-lg font-semibold line-clamp-2" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between mt-auto mb-3">
                    <div>
                        <span className="text-orange-500 font-bold text-lg">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-gray-500 text-sm line-through ml-2">${product.originalPrice}</span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-300 ml-1">{product.rating}</span>
                    </div>
                </div>

                {/* Add to Cart Button - This will now stay at the bottom consistently */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;