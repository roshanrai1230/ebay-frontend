import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  const {
    title,
    price,
    originalPrice,
    imageUrl,
    condition,
    shippingPrice,
    rating,
    reviewsCount,
    watchersCount = 0,
    sellerRating
  } = product;

  // Calculate discount percentage
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Determine Condition Tag colors
  const getConditionStyle = () => {
    switch (condition) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Certified Refurbished':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Open box':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default: // Used
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition duration-300 flex flex-col h-full cursor-pointer group"
    >
      {/* Product Image Wrapper */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden border-b border-gray-100 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-ebay-red text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm">
            {discount}% OFF
          </div>
        )}
        {condition === 'Certified Refurbished' && (
          <div className="absolute top-2 right-2 bg-ebay-green/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center space-x-0.5 shadow-sm">
            <ShieldCheck size={10} />
            <span>Refurbished</span>
          </div>
        )}
      </div>

      {/* Info Details */}
      <div className="p-4 flex flex-col flex-grow text-left">
        {/* Condition tag */}
        <div className="mb-1.5">
          <span className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded border ${getConditionStyle()}`}>
            {condition}
          </span>
        </div>

        {/* Product Title */}
        <h4 className="text-sm font-medium text-ebay-dark line-clamp-2 min-h-[40px] group-hover:text-ebay-link transition-colors duration-200">
          {title}
        </h4>

        {/* Ratings and Reviews */}
        <div className="flex items-center space-x-1 mt-1 text-[11px] text-ebay-textGrey">
          <div className="flex text-ebay-yellow">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={i < Math.floor(rating) ? 'fill-ebay-yellow' : 'text-gray-300'}
              />
            ))}
          </div>
          <span>({reviewsCount})</span>
          {sellerRating >= 99 && (
            <span className="text-[10px] text-ebay-green bg-green-50 px-1 rounded font-medium">Top Rated</span>
          )}
        </div>

        {/* Pricing & Deals */}
        <div className="mt-3 flex-grow flex flex-col justify-end">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-lg font-bold text-ebay-dark">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs text-ebay-textGrey line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Shipping Cost info */}
          <div className="text-xs text-ebay-textGrey mt-0.5 font-medium">
            {shippingPrice === 0 ? (
              <span className="text-ebay-green font-bold">Free shipping</span>
            ) : (
              <span>+${shippingPrice.toFixed(2)} shipping</span>
            )}
          </div>

          {/* Watching indicator with pulsing red circle - increments dynamically on clicks */}
          {watchersCount > 0 && (
            <div className="text-[10px] text-ebay-red font-semibold mt-2 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ebay-red animate-pulse flex-shrink-0"></span>
              <span>{watchersCount} watching</span>
              {watchersCount > 25 && (
                <span className="font-bold text-[8px] bg-red-50 text-ebay-red px-1 rounded ml-1 border border-red-100">
                  Almost gone
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
