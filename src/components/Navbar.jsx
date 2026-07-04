import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ShoppingCart, ChevronDown, ChevronUp, Heart, Menu, Camera } from 'lucide-react';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSearch,
  cartCount,
  onOpenCart,
  categories,
  onNavigate
}) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    onSearch(localSearch, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    onSearch(localSearch, val);
  };

  const handleSubnavClick = (category) => {
    setSelectedCategory(category);
    onSearch(localSearch, category);
  };

  const handleCategoryMenuClick = (categoryName) => {
    setIsCategoryMenuOpen(false);
    setSelectedCategory(categoryName);
    onSearch(localSearch, categoryName);
  };

  // Close Category Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        triggerRef.current && !triggerRef.current.contains(event.target)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-ebay-borderGrey w-full sticky top-0 z-50 shadow-sm font-sans relative">
      {/* Top Bar Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-xs text-ebay-textGrey border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span>Hi!</span>
            <span className="text-ebay-link font-medium cursor-pointer hover:underline">Sign in</span>
            <span>or</span>
            <span className="text-ebay-link font-medium cursor-pointer hover:underline">register</span>
          </span>
          <button onClick={() => onNavigate('/help')} className="hover:underline cursor-pointer hidden md:inline focus:outline-none">Deals</button>
          <button onClick={() => onNavigate('/brands')} className="hover:underline cursor-pointer hidden md:inline focus:outline-none">Brand Outlet</button>
          <button onClick={() => onNavigate('/help')} className="hover:underline cursor-pointer hidden md:inline focus:outline-none">Gift Cards</button>
          <button onClick={() => onNavigate('/help')} className="hover:underline cursor-pointer hidden md:inline font-semibold text-ebay-dark hover:text-ebay-blue focus:outline-none">Help & Contact</button>
        </div>

        <div className="flex items-center space-x-5">
          <span className="hover:underline cursor-pointer">Sell</span>
          <span className="hover:underline cursor-pointer flex items-center space-x-1 group">
            <span className="group-hover:text-ebay-blue transition">Watchlist</span>
            <Heart size={12} className="group-hover:fill-red-500 group-hover:text-red-500 transition" />
          </span>
          <span className="hover:underline cursor-pointer flex items-center space-x-1">
            <span>My eBay</span>
            <ChevronDown size={12} />
          </span>
          <button className="hover:text-ebay-blue transition relative p-1">
            <Bell size={16} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-ebay-red rounded-full"></span>
          </button>
          <button onClick={onOpenCart} className="hover:text-ebay-blue transition relative p-1 flex items-center">
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-ebay-red text-white rounded-full text-[10px] font-bold w-4 h-4 flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Bar: Logo, Category Select, Search input box, Search Button, Advanced link */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between space-x-3 md:space-x-4 relative">
        {/* eBay Logo - ENLARGED to text-4xl lg:text-[44px] */}
        <div 
          className="flex items-baseline font-extrabold select-none cursor-pointer flex-shrink-0 tracking-tighter text-4xl lg:text-[44px] font-sans mr-1 pb-1"
          onClick={() => handleSubnavClick('All Categories')}
        >
          <span className="text-[#e53238] lowercase mr-[-0.05em]">e</span>
          <span className="text-[#0064d2] lowercase mr-[-0.04em] font-[650]">b</span>
          <span className="text-[#f5af02] lowercase mr-[-0.03em] font-[650]">a</span>
          <span className="text-[#86b817] lowercase font-[550]">y</span>
        </div>

        {/* Shop by Category Trigger */}
        <div 
          ref={triggerRef}
          onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
          className="hidden lg:flex items-center text-xs text-ebay-textGrey hover:text-ebay-link cursor-pointer pl-1 select-none flex-shrink-0 pr-2 py-2"
        >
          <div className="text-left leading-tight mr-1 text-[11px]">
            <span className="block text-gray-400 text-[9px] font-semibold leading-none">Shop by</span>
            <span className="block text-gray-700 font-semibold leading-none mt-1">category</span>
          </div>
          {isCategoryMenuOpen ? (
            <ChevronUp size={14} className="text-gray-500" />
          ) : (
            <ChevronDown size={14} className="text-gray-500" />
          )}
        </div>

        {/* Large "Shop by Category" Dropdown Popover */}
        {isCategoryMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-[54px] left-[120px] w-[900px] bg-white border border-gray-300 rounded-3xl shadow-2xl p-8 z-50 text-left grid grid-cols-3 gap-10 text-[14px] leading-relaxed text-gray-600 font-normal animate-fadeIn select-none"
          >
            {/* Column 1 */}
            <div className="space-y-6">
              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Motors')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Motors
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Motors')} className="hover:text-ebay-link hover:underline cursor-pointer">Parts & accessories</p>
                  <p onClick={() => handleCategoryMenuClick('Motors')} className="hover:text-ebay-link hover:underline cursor-pointer">Cars & trucks</p>
                  <p onClick={() => handleCategoryMenuClick('Motors')} className="hover:text-ebay-link hover:underline cursor-pointer">Motorcycles</p>
                  <p onClick={() => handleCategoryMenuClick('Motors')} className="hover:text-ebay-link hover:underline cursor-pointer">Other vehicles</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Fashion')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Clothing & Accessories
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Fashion')} className="hover:text-ebay-link hover:underline cursor-pointer">Women</p>
                  <p onClick={() => handleCategoryMenuClick('Fashion')} className="hover:text-ebay-link hover:underline cursor-pointer">Men</p>
                  <p onClick={() => handleCategoryMenuClick('Fashion')} className="hover:text-ebay-link hover:underline cursor-pointer">Handbags</p>
                  <p onClick={() => handleCategoryMenuClick('Fashion')} className="hover:text-ebay-link hover:underline cursor-pointer">Collectible Sneakers</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('All Categories')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Sporting goods
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Hunting Equipment</p>
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Golf Equipment</p>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Electronics')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Electronics
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Electronics')} className="hover:text-ebay-link hover:underline cursor-pointer">Computers, Tablets & Hardware</p>
                  <p onClick={() => handleCategoryMenuClick('Electronics')} className="hover:text-ebay-link hover:underline cursor-pointer">Cell Phones & Smart Watches</p>
                  <p onClick={() => handleCategoryMenuClick('Electronics')} className="hover:text-ebay-link hover:underline cursor-pointer">Video Games & Consoles</p>
                  <p onClick={() => handleCategoryMenuClick('Electronics')} className="hover:text-ebay-link hover:underline cursor-pointer">Cameras & Photo</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('All Categories')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Business & Industrial
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Modular Buildings</p>
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Test & Inspection Tools</p>
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Heavy Equipment Parts</p>
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Restaurant & Food Service</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Fashion')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Jewelry & Watches
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Fashion')} className="hover:text-ebay-link hover:underline cursor-pointer">Luxury Watches</p>
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-6">
              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Collectibles')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Collectibles & Art
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Collectibles')} className="hover:text-ebay-link hover:underline cursor-pointer">Trading Cards</p>
                  <p onClick={() => handleCategoryMenuClick('Collectibles')} className="hover:text-ebay-link hover:underline cursor-pointer">Collectibles</p>
                  <p onClick={() => handleCategoryMenuClick('Collectibles')} className="hover:text-ebay-link hover:underline cursor-pointer">Coins & Paper Money</p>
                  <p onClick={() => handleCategoryMenuClick('Collectibles')} className="hover:text-ebay-link hover:underline cursor-pointer">Sports Memorabilia</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('Home & Garden')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Home & garden
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('Home & Garden')} className="hover:text-ebay-link hover:underline cursor-pointer">Yard & Outdoor Living</p>
                  <p onClick={() => handleCategoryMenuClick('Home & Garden')} className="hover:text-ebay-link hover:underline cursor-pointer">Tools & Workshop Gear</p>
                  <p onClick={() => handleCategoryMenuClick('Home & Garden')} className="hover:text-ebay-link hover:underline cursor-pointer">Home Improvement</p>
                  <p onClick={() => handleCategoryMenuClick('Home & Garden')} className="hover:text-ebay-link hover:underline cursor-pointer">Kitchen & Dining Supplies</p>
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => handleCategoryMenuClick('All Categories')}
                  className="font-bold text-[#191919] text-[16px] mb-3 hover:text-ebay-link hover:underline cursor-pointer"
                >
                  Other categories
                </h4>
                <div className="space-y-2 pl-0.5 text-gray-500 font-medium">
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Books, Movies & Music</p>
                  <p onClick={() => handleCategoryMenuClick('All Categories')} className="hover:text-ebay-link hover:underline cursor-pointer">Toys & Hobbies</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search & Categories Form Layout */}
        <form onSubmit={handleSearchSubmit} className="flex flex-grow items-center space-x-3">
          <div className="flex-grow flex items-center border border-gray-400 rounded-full h-10 px-3 bg-white focus-within:border-black focus-within:ring-1 focus-within:ring-black/20 transition shadow-sm">
            <Search className="text-gray-400 ml-1 mr-2 flex-shrink-0" size={16} />
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search for anything"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full py-1 text-sm text-[#191919] placeholder-gray-400 focus:outline-none bg-transparent"
            />

            {/* Camera Icon */}
            <button type="button" className="p-1 hover:bg-gray-100 rounded-full transition flex items-center justify-center flex-shrink-0 mr-3 text-gray-500" title="Search using camera">
              <Camera size={16} />
            </button>

            {/* Vertical Divider */}
            <div className="border-l border-gray-300 h-5 flex-shrink-0 mr-3 hidden md:block"></div>

            {/* Shop Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="text-xs text-gray-600 pr-8 pl-1 py-1 font-medium bg-transparent focus:outline-none cursor-pointer hidden md:block appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23707070%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_8px_center] bg-no-repeat w-36"
            >
              <option value="All Categories">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-ebay-blue hover:bg-[#2b50c7] text-white font-bold px-7 h-10 rounded-full text-sm transition duration-200 flex-shrink-0 shadow-sm cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* Advanced link */}
        <span className="text-[11px] text-ebay-textGrey hover:text-ebay-link hover:underline cursor-pointer flex-shrink-0 hidden sm:inline">
          Advanced
        </span>

        {/* Category menu icon for mobile */}
        <button className="lg:hidden p-2 text-ebay-dark border border-ebay-borderGrey rounded-full hover:bg-gray-100 transition flex-shrink-0">
          <Menu size={18} />
        </button>
      </div>

      {/* Sub Navigation Bar: Categories list */}
      <nav className="border-t border-gray-100 bg-white overflow-x-auto no-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 flex items-center space-x-6 text-sm text-ebay-dark py-2.5 min-w-max">
          <button
            onClick={() => handleSubnavClick('All Categories')}
            className={`hover:text-ebay-blue transition pb-0.5 whitespace-nowrap ${
              selectedCategory === 'All Categories' ? 'border-b-2 border-ebay-blue font-semibold text-ebay-blue' : 'text-ebay-textGrey font-normal'
            }`}
          >
            Home
          </button>
          
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleSubnavClick(cat)}
              className={`hover:text-ebay-blue transition pb-0.5 whitespace-nowrap capitalize ${
                selectedCategory === cat ? 'border-b-2 border-ebay-blue font-semibold text-ebay-blue' : 'text-ebay-textGrey font-normal'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Static Extra Links */}
          <span className="text-gray-200">|</span>
          <button onClick={() => handleSubnavClick('Fashion')} className="text-ebay-textGrey hover:text-ebay-blue transition whitespace-nowrap">Saved</button>
          <button onClick={() => handleSubnavClick('Electronics')} className="text-ebay-textGrey hover:text-ebay-blue transition whitespace-nowrap">Daily Deals</button>
          <button className="text-ebay-red font-medium hover:text-red-700 transition whitespace-nowrap">Clearance</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
