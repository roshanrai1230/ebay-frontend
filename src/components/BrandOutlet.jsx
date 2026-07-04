import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';
import { ArrowLeft, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

const BrandOutlet = ({ onBack }) => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/brands`);
      if (!res.ok) throw new Error('Failed to load brands.');
      const data = await res.json();
      setBrands(data);
    } catch (error) {
      console.error(error);
      setErrorMsg('Could not fetch brands. Please check back later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleBrandClick = (url) => {
    // Open official site in a new tab
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-left">
      {/* Brand Outlet Header Navbar */}
      <div className="bg-white border-b border-ebay-borderGrey shadow-sm py-4 px-6 flex justify-between items-center w-full sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="flex text-2xl font-bold tracking-tighter select-none font-sans mr-2">
            <span className="text-[#e53238]">e</span>
            <span className="text-[#0064d2]">b</span>
            <span className="text-[#f5af02]">a</span>
            <span className="text-[#86b817]">y</span>
          </div>
          <span className="text-sm font-semibold text-ebay-textGrey border-l border-gray-300 pl-3">
            Official Brand Outlet
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold border border-ebay-dark text-ebay-dark px-4 py-2 rounded-full hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Store</span>
        </button>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto w-full px-4 py-10 flex-grow">
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h2 className="text-2xl font-extrabold text-ebay-dark">Shop Direct from Trusted Brands</h2>
          <p className="text-sm text-ebay-textGrey mt-1">
            Click on any official logo to redirect to the verified manufacturer's storefront.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-sm font-medium flex items-center space-x-2.5 max-w-md mx-auto">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-pulse mt-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl h-44 flex flex-col p-6 items-center justify-between">
                <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : brands.length === 0 ? (
          <div className="text-center py-12 text-ebay-textGrey">
            <p className="font-bold text-lg text-ebay-dark">No brands uploaded yet.</p>
            <p className="text-xs mt-1">Please visit the Admin Panel to upload brand logos and website links.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {brands.map((brand, idx) => (
              <div
                key={brand._id || idx}
                onClick={() => handleBrandClick(brand.websiteUrl)}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition duration-300 flex flex-col items-center justify-between h-48 cursor-pointer group relative"
              >
                {/* Certified Badge */}
                <span className="absolute top-3 right-3 text-ebay-green flex items-center space-x-0.5" title="Verified Brand Logo">
                  <ShieldCheck size={16} />
                </span>

                {/* Brand Logo Wrapper */}
                <div className="flex-1 flex items-center justify-center p-3 select-none w-full max-h-[100px] overflow-hidden">
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Text */}
                <div className="text-center w-full pt-4 border-t border-gray-50 flex items-center justify-center space-x-1">
                  <span className="font-bold text-sm text-ebay-dark group-hover:text-ebay-link transition">
                    {brand.name}
                  </span>
                  <ExternalLink size={12} className="text-gray-400 group-hover:text-ebay-link transition" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandOutlet;
