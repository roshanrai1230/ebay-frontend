import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from './config.js';
import Navbar from './components/Navbar.jsx';
import HeroSlider from './components/HeroSlider.jsx';
import CategoryCircleList from './components/CategoryCircleList.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Cart from './components/Cart.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import HelpContact from './components/HelpContact.jsx';
import BrandOutlet from './components/BrandOutlet.jsx';
import GiftCardFAQ from './components/GiftCardFAQ.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';

// Inline mock data to serve as direct fallback if backend fetch fails
import mockProducts from './data/mockProducts.js';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState(['Electronics', 'Fashion', 'Motors', 'Collectibles', 'Home & Garden']);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Loading & Connectivity States
  const [isLoading, setIsLoading] = useState(true);
  const [isDbOffline, setIsDbOffline] = useState(false);

  // Path change listener (simple router)
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    // Reset views when navigating
    setSelectedProduct(null);
  };

  // Fetch products based on category and search query
  const fetchProducts = async (query = '', category = 'All Categories') => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/api/products`;
      const params = [];
      
      if (query) params.push(`q=${encodeURIComponent(query)}`);
      if (category && category !== 'All Categories') params.push(`category=${encodeURIComponent(category)}`);
      
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Backend failed');
      const data = await response.json();
      setProducts(data);
      setIsDbOffline(false);
    } catch (error) {
      console.warn('Backend connection failed. Using frontend local mock fallback...', error);
      setIsDbOffline(true);
      
      let localData = [...mockProducts];
      
      if (category && category !== 'All Categories') {
        localData = localData.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      
      if (query) {
        const terms = query.toLowerCase().split(/\s+/);
        localData = localData.filter(p => {
          const title = p.title.toLowerCase();
          const desc = p.description.toLowerCase();
          return terms.every(term => title.includes(term) || desc.includes(term));
        });
      }
      
      const mappedData = localData.map((p, idx) => ({
        ...p,
        _id: p._id || idx.toString()
      }));
      
      setProducts(mappedData);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch sliders from API
  const fetchSliders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/sliders`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setSliders(data);
    } catch (e) {
      console.log('Using default local slider banners');
    }
  };

  // Fetch categories, products, sliders on start
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/categories`);
        if (!response.ok) throw new Error('API error');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      } catch (e) {
        console.log('Using default local category tabs');
      }
    };

    fetchCategories();
    fetchSliders();
    fetchProducts(searchQuery, selectedCategory);
  }, [currentPath]);

  // Handle Search Trigger
  const handleSearch = (query, category) => {
    setSelectedProduct(null);
    fetchProducts(query, category);
  };

  // Handle Category Filter change
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
    fetchProducts(searchQuery, category);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedProduct(null);
    fetchProducts('', 'All Categories');
  };

  // Fetch product detail by ID (increments watchers count dynamically on click!)
  const handleSelectProduct = async (product) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${product._id}`);
      if (!res.ok) throw new Error('Details fetch failed');
      const updatedProduct = await res.json();
      
      // Open PDP detail view
      setSelectedProduct(updatedProduct);
      
      // Update watchersCount in products list grid dynamically
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? updatedProduct : p))
      );
    } catch (err) {
      console.warn('Backend details sync failed. Using local grid variables.', err);
      // Increment locally in case backend is offline
      const offlineUpdated = {
        ...product,
        watchersCount: (product.watchersCount || 0) + 1
      };
      setSelectedProduct(offlineUpdated);
      setProducts((prev) =>
        prev.map((p) => (p._id === product._id ? offlineUpdated : p))
      );
    }
  };

  // Cart operations
  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item._id === product._id);
      if (existing) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Buy It Now Transaction Callback (Immediate Stock Deduction - redirects directly to checkout!)
  const handleBuyItNow = async (product, quantity) => {
    // Add to cart first, then open checkout route
    setCartItems([{ ...product, quantity }]);
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  // Checkout Shopping Cart items in batch (Deducts stock on server and creates an Order entry)
  const handleCompletePurchase = async (orderData) => {
    try {
      // 1. Process inventory stock decrement first
      for (const item of cartItems) {
        const res = await fetch(`${API_BASE_URL}/api/products/${item._id}/purchase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: item.quantity })
        });
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(`Stock error for "${item.title}": ${errData.message}`);
        }
      }

      // 2. Submit order details to backend orders route
      const orderRes = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(`Order save error: ${errData.message}`);
      }

      // 3. Clear cart items state on success
      setCartItems([]);
      // Reload products list
      fetchProducts(searchQuery, selectedCategory);
    } catch (err) {
      console.error('Purchase failed:', err);
      throw new Error(err.message);
    }
  };

  // Redirect from Cart Sidebar to Checkout Page
  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('/checkout');
  };

  // ROUTE RENDER SWITCH
  if (currentPath === '/admin') {
    return <AdminPanel onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/help') {
    return <HelpContact onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/brands') {
    return <BrandOutlet onBack={() => navigateTo('/')} />;
  }

  if (currentPath === '/checkout') {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.reduce((sum, item) => sum + (item.shippingPrice || 0) * item.quantity, 0);
    const total = subtotal + shipping;

    return (
      <CheckoutPage
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onBack={() => navigateTo('/')}
        onCompletePurchase={handleCompletePurchase}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={handleSearch}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        categories={categories}
        onNavigate={navigateTo}
      />

      {/* Main Content Body */}
      <div className="flex-grow">
        {selectedProduct ? (
          // Product detail screen with buy it now hook
          <ProductDetail
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            inCart={cartItems.some((item) => item._id === selectedProduct._id)}
            onBuyItNow={handleBuyItNow}
          />
        ) : (
          // Homepage landing screen
          <>
            <HeroSlider slides={sliders} />
            <CategoryCircleList
              onSelectCategory={handleSelectCategory}
              selectedCategory={selectedCategory}
            />
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onSelectProduct={handleSelectProduct}
              resetFilters={handleResetFilters}
              activeCategory={selectedCategory}
              activeSearch={searchQuery}
            />
            {/* FAQ and Scam warnings */}
            <GiftCardFAQ />
          </>
        )}
      </div>

      {/* Cart Drawer Panel with checkout integration */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleGoToCheckout}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-ebay-borderGrey mt-auto py-10 text-xs text-ebay-textGrey">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
          <div className="space-y-2">
            <h5 className="font-bold text-[#191919] text-sm">Buy</h5>
            <p className="hover:underline cursor-pointer">Registration</p>
            <p className="hover:underline cursor-pointer">eBay Money Back Guarantee</p>
            <p className="hover:underline cursor-pointer">Bidding & buying help</p>
            <p className="hover:underline cursor-pointer">Stores</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#191919] text-sm">Sell</h5>
            <button onClick={() => navigateTo('/admin')} className="hover:underline cursor-pointer text-left block focus:outline-none">
              Admin Portal
            </button>
            <p className="hover:underline cursor-pointer">Start selling</p>
            <p className="hover:underline cursor-pointer">How to sell</p>
            <p className="hover:underline cursor-pointer">Business sellers</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#191919] text-sm">Stay Connected</h5>
            <p className="hover:underline cursor-pointer">eBay's Blogs</p>
            <p className="hover:underline cursor-pointer">Facebook</p>
            <p className="hover:underline cursor-pointer">Twitter</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#191919] text-sm">About eBay</h5>
            <p className="hover:underline cursor-pointer">Company info</p>
            <p className="hover:underline cursor-pointer">News</p>
            <p className="hover:underline cursor-pointer">Investors</p>
            <p className="hover:underline cursor-pointer">Careers</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-[#191919] text-sm">Help & Contact</h5>
            <button onClick={() => navigateTo('/help')} className="hover:underline cursor-pointer text-left block focus:outline-none">
              Contact Us
            </button>
            <button onClick={() => navigateTo('/help')} className="hover:underline cursor-pointer text-left block focus:outline-none">
              eBay Returns Help
            </button>
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-1.5">
              <div>
                <p className="font-semibold text-ebay-dark">Connection Status:</p>
                <div className="flex items-center space-x-1.5 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDbOffline ? 'bg-amber-500' : 'bg-ebay-green'}`}></span>
                  <span className="font-medium text-[10px]">
                    {isDbOffline ? 'Mock Offline Mode' : 'Backend Connected'}
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => navigateTo('/admin')}
                  className="bg-ebay-dark hover:bg-ebay-blue text-white text-[10px] font-bold px-3 py-1 rounded transition w-full text-center cursor-pointer shadow-sm"
                >
                  Open Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[11px]">
          <p>© 2026 eBay Inc. All Rights Reserved. Custom built with React & Tailwind CSS.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <span className="hover:underline cursor-pointer">Accessibility</span>
            <span className="hover:underline cursor-pointer">User Agreement</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
