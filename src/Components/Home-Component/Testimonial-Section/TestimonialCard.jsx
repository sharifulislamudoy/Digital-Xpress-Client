import React, { useState } from 'react';

const TestimonialCard = ({ testimonial }) => {
    const [showFullContent, setShowFullContent] = useState(false);

    // Function to truncate text to 10 words
    const truncateText = (text, words = 10) => {
        const wordArray = text.split(' ');
        if (wordArray.length <= words) return text;
        return wordArray.slice(0, words).join(' ') + '...';
    };

    const truncatedContent = truncateText(testimonial.content);
    const shouldTruncate = testimonial.content.split(' ').length > 10;

    return (
        <div className="bg-gray-800 rounded-xl p-8 md:p-10 shadow-xl h-full flex flex-col" style={{ minHeight: '350px' }}>
            <div className="flex items-center mb-6">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-orange-500"
                />
                <div className="ml-4">
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
            </div>

            <div className="flex-grow mb-4">
                <p className="text-gray-300 italic mb-2">
                    {showFullContent ? `"${testimonial.content}"` : `"${truncatedContent}"`}
                </p>
                {shouldTruncate && (
                    <button
                        onClick={() => setShowFullContent(!showFullContent)}
                        className="text-orange-500 text-sm hover:underline focus:outline-none"
                    >
                        {showFullContent ? 'Read Less' : 'Read More'}
                    </button>
                )}
            </div>

            <div className="mt-auto pt-4">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;