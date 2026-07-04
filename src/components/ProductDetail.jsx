import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Info, ChevronRight as ChevronRightIcon } from 'lucide-react';

const ProductDetail = ({ product, onBack, onAddToCart, inCart, onBuyItNow }) => {
  const [isWatched, setIsWatched] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    // Reset selected quantity to 1 or 0 if out of stock
    setSelectedQuantity(product && product.availableStock > 0 ? 1 : 0);
  }, [product]);

  if (!product) return null;

  const {
    title,
    price,
    originalPrice,
    imageUrl,
    images = [],
    condition,
    shippingPrice,
    description,
    sellerName,
    sellerRating,
    rating,
    reviewsCount,
    watchersCount,
    availableStock = 10,
    soldCount = 0
  } = product;

  const galleryImages = images && images.length > 0 ? images : [imageUrl];
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCartClick = () => {
    if (availableStock === 0) return;
    onAddToCart(product, selectedQuantity);
  };

  const handleBuyNowClick = () => {
    if (availableStock === 0) return;
    onBuyItNow(product, selectedQuantity);
  };

  // Limit purchase quantity options up to remaining stock, max 5 items
  const maxQtyOptions = Math.min(5, availableStock);

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 text-left">
      {/* Back Link */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-sm text-ebay-link hover:underline font-medium mb-6 focus:outline-none cursor-pointer"
      >
        <ArrowLeft size={16} />
        <span>Back to listings</span>
      </button>

      {/* Main PDP Grid */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Side: Product Gallery (Col 7) */}
        <div className="lg:col-span-7 flex space-x-4">
          {/* Vertical Thumbnail Strip */}
          <div className="flex flex-col space-y-2 flex-shrink-0 max-h-[480px] overflow-y-auto no-scrollbar pr-1 select-none">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-14 h-14 border rounded-md overflow-hidden flex items-center justify-center p-1 bg-white cursor-pointer transition ${
                  activeImageIndex === idx 
                    ? 'border-ebay-dark ring-1 ring-ebay-dark shadow-sm' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={img} className="max-h-full max-w-full object-contain" alt="" />
              </button>
            ))}
          </div>

          {/* Large Main Image Preview */}
          <div className="relative border border-gray-100 rounded-xl bg-gray-50/20 p-4 flex-grow flex items-center justify-center h-[340px] md:h-[480px] overflow-hidden select-none group shadow-inner">
            <img
              src={galleryImages[activeImageIndex]}
              alt={title}
              className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300 ease-out"
            />

            {/* Left/Right Overlaid Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ebay-dark hover:text-ebay-blue p-2.5 rounded-full shadow-md border border-gray-100 transition opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setActiveImageIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ebay-dark hover:text-ebay-blue p-2.5 rounded-full shadow-md border border-gray-100 transition opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}

            {/* Top-Left Overlays: Discount % and "IN CARTS" Red Tag */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2 select-none">
              {discount > 0 && (
                <span className="bg-ebay-red text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm self-start">
                  {discount}% OFF
                </span>
              )}
              {availableStock > 0 && (
                <span className="bg-[#e53238] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm self-start uppercase tracking-wider">
                  IN {Math.max(3, (watchersCount % 12) + 2)} CARTS
                </span>
              )}
            </div>

            {/* Top-Right Overlays: Watchers counter bubble */}
            <div className="absolute top-4 right-4 flex items-center space-x-1.5 select-none">
              <button 
                onClick={() => setIsWatched(!isWatched)}
                className="bg-white/90 hover:bg-white border border-gray-200 rounded-full px-2.5 py-1 text-[11px] font-bold text-ebay-dark shadow-sm flex items-center space-x-1.5 transition cursor-pointer"
              >
                <span>{watchersCount + (isWatched ? 1 : 0) || 53}</span>
                <Heart size={12} className={isWatched ? 'fill-ebay-red text-ebay-red' : 'text-ebay-textGrey'} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Card (Col 5) */}
        <div className="lg:col-span-5 flex flex-col font-sans">
          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-ebay-dark leading-snug">
            {title}
          </h1>

          <div className="border-b border-gray-200 my-4"></div>

          {/* Seller Information Row */}
          <div className="flex items-center justify-between bg-white hover:bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 transition cursor-pointer mb-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-ebay-blue text-white font-bold flex items-center justify-center border border-gray-200 flex-shrink-0 text-sm capitalize">
                {sellerName ? sellerName[0] : 'S'}
              </div>
              <div className="text-left text-xs">
                <div className="flex items-baseline space-x-1">
                  <span className="font-bold text-ebay-dark hover:underline text-sm">{sellerName}</span>
                  <span className="text-ebay-textGrey">({Math.floor(sellerRating * 13)})</span>
                </div>
                <div className="flex items-center space-x-2 text-ebay-textGrey mt-0.5">
                  <span className="hover:underline text-ebay-link font-medium">{sellerRating}% positive</span>
                  <span>·</span>
                  <span className="hover:underline text-ebay-link font-medium">Seller's other items</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="border border-gray-300 hover:border-ebay-blue text-ebay-dark hover:text-ebay-blue text-xs font-semibold px-4 py-1.5 rounded-full bg-white transition focus:outline-none">
                Message
              </button>
              <ChevronRightIcon size={16} className="text-gray-400" />
            </div>
          </div>

          {/* PRICING BLOCK */}
          <div className="space-y-1 mb-5">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold text-ebay-dark">
                US ${price.toFixed(2)}/ea
              </span>
              {availableStock > 0 && <span className="text-xs text-ebay-textGrey font-medium">or Best Offer</span>}
            </div>
            
            {originalPrice && (
              <div className="text-xs text-ebay-textGrey font-medium flex items-center space-x-1">
                <span>(US ${(originalPrice / 2).toFixed(2)} / unit)</span>
              </div>
            )}

            {originalPrice && (
              <div className="flex items-center space-x-1.5 text-xs text-ebay-textGrey pt-1">
                <span>Was:</span>
                <span className="line-through">US ${originalPrice.toFixed(2)}</span>
                <Info size={13} className="text-gray-400 cursor-pointer" />
              </div>
            )}

            {originalPrice && (
              <div className="text-xs text-ebay-textGrey font-medium mt-1">
                Save US ${(originalPrice - price).toFixed(2)} ({discount}% off)
              </div>
            )}
          </div>

          <div className="border-b border-gray-200 my-4"></div>

          {/* ATTRIBUTES LIST (Condition, Stock Alert, Quantity) */}
          <div className="space-y-4 text-sm mb-6">
            {/* Condition */}
            <div className="flex items-center">
              <span className="text-ebay-textGrey w-28 text-left">Condition:</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-ebay-dark">{condition}</span>
                <Info size={14} className="text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* Sale ends in */}
            {availableStock > 0 && (
              <div className="flex items-center">
                <span className="text-ebay-textGrey w-28 text-left">Sale ends in:</span>
                <span className="font-bold text-ebay-dark">5d 17h</span>
              </div>
            )}

            {/* Quantity Selector & Real Inventory count */}
            <div className="flex items-center">
              <span className="text-ebay-textGrey w-28 text-left">Quantity:</span>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedQuantity}
                  disabled={availableStock === 0}
                  onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1.5 text-sm bg-white font-semibold focus:ring-1 focus:ring-ebay-blue focus:outline-none disabled:bg-gray-100 disabled:text-gray-400"
                >
                  {availableStock === 0 ? (
                    <option value={0}>0</option>
                  ) : (
                    [...Array(maxQtyOptions)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))
                  )}
                </select>

                {/* Stock alert formatting */}
                {availableStock === 0 ? (
                  <span className="text-xs text-ebay-red font-bold">
                    Out of stock · <span className="text-gray-500 font-medium">{soldCount} sold</span>
                  </span>
                ) : availableStock <= 3 ? (
                  <span className="text-xs text-ebay-red font-bold animate-pulse">
                    Only {availableStock} left · <span className="text-gray-500 font-medium">{soldCount} sold · Almost gone</span>
                  </span>
                ) : (
                  <span className="text-xs text-ebay-textGrey font-medium">
                    {availableStock} available · <span className="font-bold">{soldCount} sold</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS (Vibrant Pill buttons - disabled if out of stock) */}
          <div className="space-y-3">
            {/* Buy It Now */}
            {availableStock === 0 ? (
              <div className="w-full bg-gray-200 text-gray-500 py-3 rounded-full font-bold text-sm text-center select-none cursor-not-allowed">
                Out of Stock
              </div>
            ) : (
              <button
                onClick={handleBuyNowClick}
                className="w-full bg-[#3665f3] hover:bg-[#2b50c7] text-white py-3 rounded-full font-bold text-sm transition duration-200 cursor-pointer text-center shadow-sm"
              >
                Buy It Now
              </button>
            )}

            {/* Add to cart */}
            <button
              onClick={handleAddToCartClick}
              disabled={availableStock === 0}
              className={`w-full py-3 rounded-full font-bold text-sm transition duration-200 text-center bg-white ${
                availableStock === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed border' 
                  : 'border-[#3665f3] hover:bg-blue-50 text-[#3665f3] border cursor-pointer'
              }`}
            >
              {inCart ? 'Add More to Cart' : 'Add to cart'}
            </button>

            {/* Make offer */}
            {availableStock > 0 && (
              <button
                onClick={() => alert("Make Offer dialog initialized for " + title)}
                className="w-full border border-[#3665f3] hover:bg-blue-50 text-[#3665f3] py-3 rounded-full font-bold text-sm transition duration-200 cursor-pointer text-center bg-white"
              >
                Make offer
              </button>
            )}

            {/* Add to Watchlist */}
            <button
              onClick={() => setIsWatched(!isWatched)}
              className={`w-full border py-3 rounded-full text-sm font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer bg-white ${
                isWatched
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-[#3665f3] hover:bg-blue-50 text-[#3665f3]'
              }`}
            >
              <Heart size={16} className={isWatched ? 'fill-ebay-red text-ebay-red' : 'text-[#3665f3]'} />
              <span>{isWatched ? 'Watching' : 'Add to Watchlist'}</span>
            </button>
          </div>

          <div className="border-b border-gray-200 my-6"></div>

          {/* Shipping, Returns, Warranty & Payments Footer */}
          <div className="space-y-4 text-xs text-ebay-textGrey">
            {/* Shipping row */}
            <div className="flex items-start space-x-3">
              <Truck size={16} className="text-ebay-textGrey mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-ebay-dark">
                  Shipping: {shippingPrice === 0 ? <span className="text-ebay-green font-bold">FREE Economy Shipping</span> : `+$${shippingPrice.toFixed(2)} Standard Shipping`}
                </p>
                <p className="mt-0.5 text-gray-500">Est. delivery within 3-5 business days.</p>
              </div>
            </div>

            {/* Returns row */}
            <div className="flex items-start space-x-3">
              <RotateCcw size={16} className="text-ebay-textGrey mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-ebay-dark">Returns:</p>
                <p className="mt-0.5 text-gray-500">30-day seller returns. Buyer pays for return shipping.</p>
              </div>
            </div>

            {/* Warranty row */}
            <div className="flex items-start space-x-3">
              <ShieldCheck size={16} className="text-ebay-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-ebay-dark">eBay Refurbished Warranty:</p>
                <p className="mt-0.5 text-gray-500">2-year warranty included. 100% satisfaction guaranteed.</p>
              </div>
            </div>

            {/* PAYMENTS ROW */}
            <div className="flex items-start space-x-3 pt-1 border-t border-gray-100 pt-3">
              <span className="font-semibold text-ebay-dark w-28 text-left flex-shrink-0">Payments:</span>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5 items-center select-none">
                  <div className="border border-gray-300 rounded px-2 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm">
                    <span className="text-[#003087] font-extrabold italic text-[9px] tracking-tighter">Pay<span className="text-[#0079c1]">Pal</span></span>
                  </div>
                  <div className="border border-gray-300 rounded px-2 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm space-x-0.5">
                    <span className="font-extrabold text-[9px]"><span className="text-[#4285F4]">G</span> <span className="text-gray-700">Pay</span></span>
                  </div>
                  <div className="border border-gray-300 rounded px-2 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm">
                    <span className="text-[#1A1F71] font-black italic text-[10px] tracking-tight">VISA</span>
                  </div>
                  <div className="border border-gray-300 rounded px-2 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm">
                    <div className="flex -space-x-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#EB001B] opacity-90"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FF5F00] opacity-80"></div>
                    </div>
                  </div>
                  <div className="border border-gray-300 rounded px-1 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm">
                    <span className="text-black font-extrabold text-[7px] tracking-tighter leading-none text-center">DISCOVER</span>
                  </div>
                  <div className="border border-gray-300 rounded px-2 py-0.5 bg-white flex items-center justify-center h-6 w-12 shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full border-2 border-[#0079C1] flex items-center justify-center">
                      <div className="w-0.5 h-0.5 bg-[#0079C1] rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <a href="#payment-details" className="text-ebay-link hover:underline text-[10px] font-semibold block">
                    See details
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-b border-gray-200 my-6"></div>

          {/* Description Block */}
          <div>
            <h3 className="text-sm font-bold text-ebay-dark uppercase tracking-wider border-b border-gray-200 pb-2">
              Product Description
            </h3>
            <p className="text-sm text-ebay-textGrey leading-relaxed mt-3 whitespace-pre-line font-normal">
              {description}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
