import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      title: "Up to 50% off tech refurbished certified",
      subtitle: "Smartphones, laptops, headphones, and more, all backed by a 2-year warranty.",
      badge: "EBAY REFURBISHED",
      imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop",
      btnText: "Shop Refurbished",
      bgColor: "#eaf3ff",
      textColor: "text-slate-900",
      btnColor: "bg-ebay-blue hover:bg-blue-700 text-white",
      badgeColor: "bg-blue-600 text-white"
    },
    {
      title: "Summer sneaker drops are here",
      subtitle: "Save on top brands like Nike, Adidas, Puma, and Jordan. 100% Authenticity Guaranteed.",
      badge: "AUTHENTICITY GUARANTEED",
      imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop",
      btnText: "Shop Sneaker Deals",
      bgColor: "#fff0eb",
      textColor: "text-slate-900",
      btnColor: "bg-[#e53238] hover:bg-red-700 text-white",
      badgeColor: "bg-[#e53238] text-white"
    },
    {
      title: "Gears, parts, and tools for your ride",
      subtitle: "Find the exact wheels, diagnostic tools, and replacement components for your make and model.",
      badge: "EBAY MOTORS",
      imageUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop",
      btnText: "Find Parts",
      bgColor: "#f2f9f5",
      textColor: "text-slate-900",
      btnColor: "bg-ebay-green hover:bg-[#155a30] text-white",
      badgeColor: "bg-ebay-green text-white"
    }
  ];

  const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === activeSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  // Autoplay
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeSlides]);

  // Reset slide index if activeSlides changes (e.g. admin deletes or adds)
  useEffect(() => {
    setCurrentSlide(0);
  }, [activeSlides.length]);

  return (
    <section className="relative max-w-7xl mx-auto px-4 mt-6 overflow-hidden">
      <div className="relative rounded-2xl overflow-hidden h-[340px] md:h-[400px]">
        {/* Slide Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {activeSlides.map((slide, index) => (
            <div
              key={slide._id || index}
              className="w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-12 flex-shrink-0 relative text-left"
              style={{ backgroundColor: slide.bgColor || '#f7f7f7' }}
            >
              {/* Text Info */}
              <div className="md:w-1/2 space-y-4 z-10">
                {slide.badge && (
                  <span className={`inline-block text-[10px] tracking-wider font-extrabold px-2.5 py-1 rounded-sm uppercase ${
                    slide.badgeColor || 'bg-ebay-blue text-white'
                  }`}>
                    {slide.badge}
                  </span>
                )}
                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight tracking-tight max-w-md text-ebay-dark">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base text-ebay-textGrey max-w-md">
                  {slide.subtitle}
                </p>
                <div className="pt-2">
                  <button className={`font-semibold py-3 px-8 rounded-full shadow-sm text-sm transition duration-200 ${
                    slide.btnColor || 'bg-ebay-blue hover:bg-blue-700 text-white'
                  }`}>
                    {slide.btnText || 'Shop Now'}
                  </button>
                </div>
              </div>

              {/* Graphic/Image */}
              <div className="md:w-1/2 h-full flex items-center justify-center relative mt-6 md:mt-0 select-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-full blur-3xl opacity-30"></div>
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="max-h-[220px] md:max-h-[300px] w-auto object-cover rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Arrow Controls */}
        {activeSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-ebay-dark hover:text-ebay-blue p-2.5 rounded-full shadow-md border border-gray-100 transition z-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-ebay-dark hover:text-ebay-blue p-2.5 rounded-full shadow-md border border-gray-100 transition z-20"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === i ? "w-6 bg-ebay-blue" : "w-2.5 bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSlider;
