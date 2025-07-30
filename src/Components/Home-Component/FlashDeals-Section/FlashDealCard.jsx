import React, { useState, useEffect } from 'react';

const FlashDealCard = ({ deal, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const end = new Date(deal.endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        clearInterval(interval);
        onExpire(deal.id);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition duration-300 flex flex-col justify-between h-full">
      <div className="relative group">
        <img 
          src={deal.image} 
          alt={deal.name} 
          className="w-full h-48 object-contain bg-white p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
          -{deal.discount}%
        </div>
      </div>

      <div className="p-5 flex flex-col h-full">
        <h3 className="font-semibold text-base md:text-lg mb-3 line-clamp-2">{deal.name}</h3>

        <div className="flex items-center mb-4">
          <span className="text-orange-500 font-bold text-xl">${deal.discountPrice}</span>
          <span className="text-gray-400 line-through ml-2 text-sm">${deal.originalPrice}</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Sold: {deal.sold}/{deal.total}</span>
            <span>{Math.round((deal.sold / deal.total) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(deal.sold / deal.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Individual Timer */}
        <div className="flex space-x-2 text-center mb-4">
          {["hours", "minutes", "seconds"].map((unit, index) => (
            <div key={index} className="bg-gray-800 px-3 py-1 rounded-lg border border-gray-700">
              <span className="block text-sm font-bold text-orange-400">
                {timeLeft[unit].toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-gray-400 uppercase">{unit.slice(0, 3)}</span>
            </div>
          ))}
        </div>

        <button className="mt-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FlashDealCard;
