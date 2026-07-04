import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';
import { Upload, Trash2, Home, Package, Sliders, PlusCircle, AlertCircle, MessageSquare, Mail, Clock, Check, ShieldCheck, Globe, ShoppingBag } from 'lucide-react';

const AdminPanel = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [brands, setBrands] = useState([]);
  const [orders, setOrders] = useState([]); // Orders Manager State
  const [isLoading, setIsLoading] = useState(true);
  const [alertMsg, setAlertMsg] = useState({ text: '', type: '' });

  // Product Form State
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    imageUrl: '', 
    img2: '',
    img3: '',
    img4: '',
    img5: '',
    condition: 'New',
    shippingPrice: '0',
    sellerName: '',
    sellerRating: '99.5',
    availableStock: '10'
  });

  // Slider Form State
  const [sliderForm, setSliderForm] = useState({
    title: '',
    subtitle: '',
    badge: '',
    imageUrl: '',
    btnText: 'Shop Now',
    bgColor: '#f7f7f7',
    textColor: 'text-slate-900',
    btnColor: 'bg-ebay-blue hover:bg-blue-700 text-white',
    badgeColor: 'bg-ebay-blue text-white'
  });

  // Brand Form State
  const [brandForm, setBrandForm] = useState({
    name: '',
    websiteUrl: '',
    logoUrl: ''
  });

  const categories = ['Electronics', 'Fashion', 'Motors', 'Collectibles', 'Home & Garden'];

  const triggerAlert = (text, type = 'success') => {
    setAlertMsg({ text, type });
    setTimeout(() => setAlertMsg({ text: '', type: '' }), 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load products
      const pRes = await fetch(`${API_BASE_URL}/api/products`);
      const pData = await pRes.json();
      setProducts(pData);

      // Load sliders
      const sRes = await fetch(`${API_BASE_URL}/api/sliders`);
      const sData = await sRes.json();
      setSliders(sData);

      // Load inquiries
      const iRes = await fetch(`${API_BASE_URL}/api/inquiries`);
      const iData = await iRes.json();
      setInquiries(iData);

      // Load brands
      const bRes = await fetch(`${API_BASE_URL}/api/brands`);
      const bData = await bRes.json();
      setBrands(bData);

      // Load orders
      const oRes = await fetch(`${API_BASE_URL}/api/orders`);
      const oData = await oRes.json();
      setOrders(oData);
    } catch (error) {
      console.error('Error loading admin data:', error);
      triggerAlert('Failed to sync server. Running in mock offline storage.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Convert uploaded product files to Base64
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      triggerAlert('Image file size is too large! Maximum limit is 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm(prev => ({
        ...prev,
        [field]: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Convert slider banner file to Base64
  const handleSliderFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      triggerAlert('Banner file size is too large! Maximum limit is 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSliderForm(prev => ({
        ...prev,
        imageUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Convert brand logo file to Base64
  const handleBrandFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      triggerAlert('Logo file size is too large! Maximum limit is 2MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setBrandForm(prev => ({
        ...prev,
        logoUrl: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  // Submit Product Form
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price || !productForm.imageUrl) {
      triggerAlert('Title, Price, and Main Image File are required!', 'error');
      return;
    }

    const combinedImages = [
      productForm.imageUrl,
      productForm.img2,
      productForm.img3,
      productForm.img4,
      productForm.img5
    ].filter(img => img && img.trim() !== '');

    const payload = {
      ...productForm,
      images: combinedImages,
      availableStock: productForm.availableStock ? Number(productForm.availableStock) : 10
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const newProd = await res.json();
      if (!res.ok) throw new Error(newProd.message || 'Submit error');
      
      setProducts((prev) => [...prev, newProd]);
      setProductForm({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Electronics',
        imageUrl: '',
        img2: '',
        img3: '',
        img4: '',
        img5: '',
        condition: 'New',
        shippingPrice: '0',
        sellerName: '',
        sellerRating: '99.5',
        availableStock: '10'
      });
      triggerAlert('Product with dynamic images and stock uploaded successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Submit Slider Form
  const handleSliderSubmit = async (e) => {
    e.preventDefault();
    if (!sliderForm.title || !sliderForm.subtitle || !sliderForm.imageUrl) {
      triggerAlert('Title, Subtitle, and Banner Image File are required!', 'error');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/sliders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sliderForm)
      });

      const newSlider = await res.json();
      if (!res.ok) throw new Error(newSlider.message || 'Submit error');

      setSliders((prev) => [...prev, newSlider]);
      setSliderForm({
        title: '',
        subtitle: '',
        badge: '',
        imageUrl: '',
        btnText: 'Shop Now',
        bgColor: '#f7f7f7',
        textColor: 'text-slate-900',
        btnColor: 'bg-ebay-blue hover:bg-blue-700 text-white',
        badgeColor: 'bg-ebay-blue text-white'
      });
      triggerAlert('Hero slider banner uploaded successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Submit Brand Form
  const handleBrandSubmit = async (e) => {
    e.preventDefault();
    if (!brandForm.name || !brandForm.websiteUrl || !brandForm.logoUrl) {
      triggerAlert('Brand Name, Website URL, and Logo File are required!', 'error');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/brands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brandForm)
      });

      const newBrand = await res.json();
      if (!res.ok) throw new Error(newBrand.message || 'Submit error');

      setBrands((prev) => [...prev, newBrand]);
      setBrandForm({
        name: '',
        websiteUrl: '',
        logoUrl: ''
      });
      triggerAlert('Brand official logo uploaded successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Update order delivery/shipment status
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message || 'Status update failed');
      setOrders(prev => prev.map(o => o._id === id ? updated : o));
      triggerAlert(`Order status updated to "${status}" successfully!`);
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setProducts((prev) => prev.filter((p) => p._id !== id));
      triggerAlert('Product deleted successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Delete Slider banner
  const handleDeleteSlider = async (id) => {
    if (!window.confirm('Are you sure you want to delete this homepage banner?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/sliders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setSliders((prev) => prev.filter((s) => s._id !== id));
      triggerAlert('Slider banner deleted successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Delete / Resolve Inquiry
  const handleResolveInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to mark this inquiry as resolved?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/inquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      triggerAlert('Inquiry resolved and cleared successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Delete Brand
  const handleDeleteBrand = async (id) => {
    if (!window.confirm('Are you sure you want to delete this brand outlet?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/brands/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setBrands((prev) => prev.filter((b) => b._id !== id));
      triggerAlert('Brand deleted successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  // Cancel / Delete Order
  const handleDeleteOrder = async (id) => {
    if (!window.confirm('Are you sure you want to delete/cancel this order?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setOrders(prev => prev.filter(o => o._id !== id));
      triggerAlert('Order entry deleted from admin successfully!');
    } catch (err) {
      triggerAlert(err.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header bar */}
      <div className="bg-white border-b border-ebay-borderGrey shadow-sm py-4 px-6 flex justify-between items-center w-full">
        <div className="flex items-center space-x-3">
          <div className="flex text-2xl font-bold tracking-tighter select-none font-sans">
            <span className="text-ebay-red">e</span>
            <span className="text-ebay-blue">b</span>
            <span className="text-ebay-yellow">a</span>
            <span className="text-[#86b817]">y</span>
          </div>
          <span className="text-sm font-semibold bg-ebay-dark text-white px-2 py-0.5 rounded uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold border border-ebay-dark text-ebay-dark px-4 py-2 rounded-full hover:bg-gray-50 transition cursor-pointer"
        >
          <Home size={14} />
          <span>Exit to Store</span>
        </button>
      </div>

      {/* Main layout container */}
      <div className="max-w-7xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 flex flex-col space-y-2 text-left">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === 'products'
                ? 'bg-ebay-blue text-white shadow-sm'
                : 'bg-white border border-gray-200 text-ebay-dark hover:bg-gray-50'
            }`}
          >
            <Package size={18} />
            <span>Product Manager</span>
          </button>
          
          <button
            onClick={() => setActiveTab('sliders')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === 'sliders'
                ? 'bg-ebay-blue text-white shadow-sm'
                : 'bg-white border border-gray-200 text-ebay-dark hover:bg-gray-50'
            }`}
          >
            <Sliders size={18} />
            <span>Hero Slider Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('brands')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
              activeTab === 'brands'
                ? 'bg-ebay-blue text-white shadow-sm'
                : 'bg-white border border-gray-200 text-ebay-dark hover:bg-gray-50'
            }`}
          >
            <ShieldCheck size={18} />
            <span>Brand Manager</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition relative ${
              activeTab === 'orders'
                ? 'bg-ebay-blue text-white shadow-sm'
                : 'bg-white border border-gray-200 text-ebay-dark hover:bg-gray-50'
            }`}
          >
            <ShoppingBag size={18} />
            <span>Order Manager</span>
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="absolute right-3 bg-ebay-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition relative ${
              activeTab === 'inquiries'
                ? 'bg-ebay-blue text-white shadow-sm'
                : 'bg-white border border-gray-200 text-ebay-dark hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={18} />
            <span>InQure Inbox</span>
            {inquiries.length > 0 && (
              <span className="absolute right-3 bg-ebay-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                {inquiries.length}
              </span>
            )}
          </button>
        </aside>

        {/* Dynamic content cards */}
        <main className="lg:col-span-9 flex flex-col space-y-6 text-left">
          
          {/* Notification Toast */}
          {alertMsg.text && (
            <div className={`p-4 rounded-xl flex items-center space-x-2.5 text-sm font-medium border animate-fadeIn ${
              alertMsg.type === 'error'
                ? 'bg-red-50 text-red-800 border-red-200'
                : 'bg-green-50 text-green-800 border-green-200'
            }`}>
              <AlertCircle size={18} />
              <span>{alertMsg.text}</span>
            </div>
          )}

          {/* Product Manager Tab */}
          {activeTab === 'products' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Product Form */}
              <div className="xl:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ebay-dark flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                  <PlusCircle size={20} className="text-ebay-blue" />
                  <span>Upload New Product</span>
                </h3>
                
                <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-semibold text-ebay-textGrey">
                  <div>
                    <label className="block mb-1">Product Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple iPad Pro 11-inch M4"
                      value={productForm.title}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Price ($) *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="799.00"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Original Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="999.00"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block mb-1">Category</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none bg-white"
                      >
                        {categories.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1">Stock Qty *</label>
                      <input
                        type="number"
                        required
                        placeholder="10"
                        value={productForm.availableStock}
                        onChange={(e) => setProductForm({ ...productForm, availableStock: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Condition</label>
                    <select
                      value={productForm.condition}
                      onChange={(e) => setProductForm({ ...productForm, condition: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none bg-white"
                    >
                      <option value="New">New</option>
                      <option value="Open box">Open box</option>
                      <option value="Certified Refurbished">Certified Refurbished</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>

                  {/* 5 Images Upload Section */}
                  <div className="border border-gray-200 rounded-xl p-3 bg-gray-50/50 space-y-3">
                    <span className="block font-bold text-[#191919] uppercase tracking-wider text-[10px]">
                      Product Gallery (Upload Files from Device)
                    </span>
                    <div>
                      <label className="block text-[10px] mb-1">Main Product Image *</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'imageUrl')}
                          className="block w-full text-[10px] text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-ebay-blue hover:file:bg-blue-100 cursor-pointer"
                        />
                        {productForm.imageUrl && (
                          <img src={productForm.imageUrl} className="w-10 h-10 object-contain border border-gray-200 rounded bg-white flex-shrink-0" alt="" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-[10px] pt-1">
                      {['img2', 'img3', 'img4', 'img5'].map((field, idx) => (
                        <div key={field} className="space-y-1">
                          <label className="block mb-0.5 font-semibold text-gray-600">Gallery Image {idx + 2}</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, field)}
                              className="block w-full text-[8px] text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                            />
                            {productForm[field] && (
                              <img src={productForm[field]} className="w-6 h-6 object-contain border border-gray-200 rounded bg-white flex-shrink-0" alt="" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Shipping Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00 (Free)"
                        value={productForm.shippingPrice}
                        onChange={(e) => setProductForm({ ...productForm, shippingPrice: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Seller Name</label>
                      <input
                        type="text"
                        placeholder="Deals_Express"
                        value={productForm.sellerName}
                        onChange={(e) => setProductForm({ ...productForm, sellerName: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Product Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Write detailed specifications of the product..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-xs transition duration-200 flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <Upload size={14} />
                    <span>Upload Product</span>
                  </button>
                </form>
              </div>

              {/* Product Inventory Table */}
              <div className="xl:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-ebay-dark border-b border-gray-100 pb-3 mb-4">
                  Active Listings ({products.length})
                </h3>
                
                {isLoading ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center animate-pulse">Syncing catalog details...</p>
                ) : products.length === 0 ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center">No active listings in store.</p>
                ) : (
                  <div className="overflow-x-auto flex-grow max-h-[660px] no-scrollbar">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-ebay-textGrey border-b border-gray-200">
                          <th className="py-2.5 px-3">Item</th>
                          <th className="py-2.5 px-3">Price</th>
                          <th className="py-2.5 px-3">Stock</th>
                          <th className="py-2.5 px-3">Sold</th>
                          <th className="py-2.5 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {products.map((p, idx) => (
                          <tr key={p._id || idx} className="hover:bg-gray-50/50">
                            <td className="py-3 px-3 flex items-center space-x-2">
                              <img src={p.imageUrl} className="w-8 h-8 object-contain bg-gray-50 border border-gray-100 rounded" alt="" />
                              <div className="flex flex-col">
                                <span className="font-semibold text-ebay-dark line-clamp-1 max-w-[150px]">{p.title}</span>
                                <span className="text-[9px] text-ebay-textGrey">
                                  {p.category}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-bold text-ebay-dark">${p.price.toFixed(2)}</td>
                            <td className="py-3 px-3 font-medium">
                              {p.availableStock === 0 ? (
                                <span className="bg-red-50 text-ebay-red text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-200">
                                  Out of Stock
                                </span>
                              ) : (
                                <span className="text-gray-800">{p.availableStock} units</span>
                              )}
                            </td>
                            <td className="py-3 px-3 font-bold text-ebay-green">{p.soldCount || 0} units</td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => handleDeleteProduct(p._id)}
                                className="text-gray-400 hover:text-ebay-red p-1.5 rounded-full transition focus:outline-none"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Hero Slider Manager Tab */}
          {activeTab === 'sliders' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Slider Form */}
              <div className="xl:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ebay-dark flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                  <PlusCircle size={20} className="text-ebay-blue" />
                  <span>Upload Promo Banner</span>
                </h3>

                <form onSubmit={handleSliderSubmit} className="space-y-4 text-xs font-semibold text-ebay-textGrey">
                  <div>
                    <label className="block mb-1">Banner Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Save on Certified Refurbished"
                      value={sliderForm.title}
                      onChange={(e) => setSliderForm({ ...sliderForm, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Subtitle Description *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. All backed by a 2-year warranty details."
                      value={sliderForm.subtitle}
                      onChange={(e) => setSliderForm({ ...sliderForm, subtitle: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1">Badge Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. EBAY MOTORS"
                        value={sliderForm.badge}
                        onChange={(e) => setSliderForm({ ...sliderForm, badge: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1">Button text</label>
                      <input
                        type="text"
                        placeholder="Shop Now"
                        value={sliderForm.btnText}
                        onChange={(e) => setSliderForm({ ...sliderForm, btnText: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Background HEX Color Code</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="#eaf3ff"
                        value={sliderForm.bgColor}
                        onChange={(e) => setSliderForm({ ...sliderForm, bgColor: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                      <input
                        type="color"
                        value={sliderForm.bgColor}
                        onChange={(e) => setSliderForm({ ...sliderForm, bgColor: e.target.value })}
                        className="w-11 h-11 border border-gray-300 rounded bg-white p-1 cursor-pointer focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Banner Image File *</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSliderFileChange}
                        className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-ebay-blue hover:file:bg-blue-100 cursor-pointer"
                      />
                      {sliderForm.imageUrl && (
                        <img
                          src={sliderForm.imageUrl}
                          className="w-12 h-8 object-cover border border-gray-200 rounded bg-white flex-shrink-0"
                          alt="Preview"
                        />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-xs transition duration-200 flex-shrink-0 shadow-sm cursor-pointer"
                  >
                    <span>Upload Banner</span>
                  </button>
                </form>
              </div>

              {/* Slider Inventory List */}
              <div className="xl:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-ebay-dark border-b border-gray-100 pb-3 mb-4">
                  Active Banners ({sliders.length})
                </h3>

                {isLoading ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center animate-pulse">Syncing banner details...</p>
                ) : sliders.length === 0 ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center">No active banners.</p>
                ) : (
                  <div className="space-y-4 overflow-y-auto max-h-[500px] no-scrollbar pr-1">
                    {sliders.map((slide, idx) => (
                      <div
                        key={slide._id || idx}
                        style={{ backgroundColor: slide.bgColor }}
                        className="border border-gray-200 rounded-xl p-4 flex items-center justify-between space-x-4 shadow-sm"
                      >
                        <div className="flex items-center space-x-3 text-left">
                          <img
                            src={slide.imageUrl}
                            className="w-12 h-12 object-cover border border-gray-200 rounded bg-white"
                            alt=""
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold text-ebay-blue bg-blue-50 px-1.5 py-0.5 rounded">
                              {slide.badge || 'PROMO'}
                            </span>
                            <h4 className="text-sm font-bold text-ebay-dark mt-1 line-clamp-1">{slide.title}</h4>
                            <p className="text-xs text-ebay-textGrey line-clamp-1">{slide.subtitle}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteSlider(slide._id)}
                          className="bg-white hover:bg-red-50 text-gray-400 hover:text-ebay-red p-2.5 rounded-full border border-gray-200 transition shadow-sm focus:outline-none flex-shrink-0"
                          title="Delete banner"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Brand Manager Tab */}
          {activeTab === 'brands' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              
              {/* Brand Form */}
              <div className="xl:col-span-5 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-ebay-dark flex items-center space-x-2 border-b border-gray-100 pb-3 mb-4">
                  <PlusCircle size={20} className="text-ebay-blue" />
                  <span>Upload Partner Brand</span>
                </h3>

                <form onSubmit={handleBrandSubmit} className="space-y-4 text-xs font-semibold text-ebay-textGrey font-sans">
                  <div>
                    <label className="block mb-1">Brand Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apple / Samsung / LG"
                      value={brandForm.name}
                      onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Website URL *</label>
                    <div className="relative flex items-center">
                      <Globe size={14} className="absolute left-3 text-gray-400" />
                      <input
                        type="url"
                        required
                        placeholder="https://www.apple.com"
                        value={brandForm.websiteUrl}
                        onChange={(e) => setBrandForm({ ...brandForm, websiteUrl: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-2.5 pl-9 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1">Brand Logo File *</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleBrandFileChange}
                        className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-ebay-blue hover:file:bg-blue-100 cursor-pointer"
                      />
                      {brandForm.logoUrl && (
                        <img
                          src={brandForm.logoUrl}
                          className="w-12 h-12 object-contain border border-gray-200 rounded bg-white p-1 flex-shrink-0"
                          alt="Preview"
                        />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-xs transition duration-200 flex-shrink-0 shadow-sm cursor-pointer"
                  >
                    <span>Upload Brand Outlet</span>
                  </button>
                </form>
              </div>

              {/* Brand Inventory List */}
              <div className="xl:col-span-7 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
                <h3 className="text-lg font-bold text-ebay-dark border-b border-gray-100 pb-3 mb-4">
                  Active Brands ({brands.length})
                </h3>

                {isLoading ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center animate-pulse">Syncing brand lists...</p>
                ) : brands.length === 0 ? (
                  <p className="text-sm text-ebay-textGrey py-8 text-center">No active brands.</p>
                ) : (
                  <div className="overflow-x-auto flex-grow max-h-[500px] no-scrollbar">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-ebay-textGrey border-b border-gray-200">
                          <th className="py-2.5 px-3">Brand</th>
                          <th className="py-2.5 px-3">Official Link</th>
                          <th className="py-2.5 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {brands.map((b, idx) => (
                          <tr key={b._id || idx} className="hover:bg-gray-50/50">
                            <td className="py-3 px-3 flex items-center space-x-2">
                              <img src={b.logoUrl} className="w-10 h-10 object-contain bg-white border border-gray-100 rounded p-1 flex-shrink-0" alt="" />
                              <span className="font-semibold text-ebay-dark">{b.name}</span>
                            </td>
                            <td className="py-3 px-3 text-ebay-link font-medium max-w-[200px] truncate">
                              <a href={b.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {b.websiteUrl}
                              </a>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => handleDeleteBrand(b._id)}
                                className="text-gray-400 hover:text-ebay-red p-1.5 rounded-full transition focus:outline-none"
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Orders Manager Tab (New Feature!) */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-ebay-dark border-b border-gray-100 pb-3 mb-4">
                Incoming Orders ({orders.length})
              </h3>

              {isLoading ? (
                <p className="text-sm text-ebay-textGrey py-8 text-center animate-pulse">Syncing order lists...</p>
              ) : orders.length === 0 ? (
                <p className="text-sm text-ebay-textGrey py-8 text-center">No orders received yet.</p>
              ) : (
                <div className="space-y-6 max-h-[660px] overflow-y-auto pr-1 no-scrollbar text-xs">
                  {orders.map((order, idx) => (
                    <div
                      key={order._id || idx}
                      className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition duration-200 bg-gray-50/10 flex flex-col space-y-4"
                    >
                      {/* Top status bar */}
                      <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-ebay-dark">{order.orderId}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-500 font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 font-semibold">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                            className={`font-bold border rounded px-2.5 py-1 focus:outline-none ${
                              order.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              order.status === 'Shipped' ? 'bg-blue-50 text-ebay-blue border-blue-200' :
                              order.status === 'Delivered' ? 'bg-green-50 text-ebay-green border-green-200' :
                              'bg-red-50 text-ebay-red border-red-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
                        {/* Customer & Shipping info */}
                        <div className="md:col-span-4 space-y-2 border-r border-gray-100 pr-2">
                          <h4 className="font-bold text-[#191919] uppercase tracking-wider text-[10px]">
                            Shipping Details
                          </h4>
                          <div className="space-y-1 text-gray-600 font-medium">
                            <p className="font-bold text-ebay-dark text-xs">{order.customerName}</p>
                            <p>{order.address}</p>
                            <p>{order.city}, {order.state} - {order.pincode}</p>
                            <p className="pt-1">📞 {order.phone}</p>
                            <p className="pt-2 text-[10px]">
                              Payment: <span className="font-bold text-ebay-dark capitalize">{order.paymentMethod}</span>
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="md:col-span-6 space-y-2">
                          <h4 className="font-bold text-[#191919] uppercase tracking-wider text-[10px]">
                            Purchased Items
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex items-center space-x-2.5">
                                <img src={item.imageUrl} className="w-8 h-8 object-contain bg-white border border-gray-100 rounded p-0.5 flex-shrink-0" alt="" />
                                <div className="flex-grow min-w-0">
                                  <p className="font-semibold text-ebay-dark truncate">{item.title}</p>
                                  <p className="text-[10px] text-gray-500 font-medium">
                                    Qty: {item.quantity} x ${item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Totals & quick delete actions */}
                        <div className="md:col-span-2 flex flex-col justify-between items-end border-l border-gray-100 pl-2">
                          <div className="text-right">
                            <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Total Paid</span>
                            <span className="block font-bold text-base text-ebay-dark mt-1">${order.totalAmount.toFixed(2)}</span>
                          </div>

                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-gray-400 hover:text-ebay-red p-1.5 rounded-full transition border border-transparent hover:border-gray-200 mt-4 focus:outline-none"
                            title="Delete Order Record"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* InQure Inbox Manager Tab */}
          {activeTab === 'inquiries' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-ebay-dark border-b border-gray-100 pb-3 mb-4">
                InQure Support Inbox ({inquiries.length})
              </h3>

              {isLoading ? (
                <p className="text-sm text-ebay-textGrey py-8 text-center animate-pulse">Checking inquiry files...</p>
              ) : inquiries.length === 0 ? (
                <div className="py-12 text-center text-ebay-textGrey text-sm">
                  <span className="text-4xl">🎉</span>
                  <p className="font-bold mt-3 text-[#191919]">All caught up!</p>
                  <p className="text-xs mt-1">No pending customer support inquiries.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 no-scrollbar">
                  {inquiries.map((inq, idx) => (
                    <div
                      key={inq._id || idx}
                      className="border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition duration-200 text-left bg-gray-50/30 flex flex-col md:flex-row md:items-start justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-extrabold bg-[#e5e5e5] text-ebay-dark px-2.5 py-0.5 rounded">
                            {inq.subject}
                          </span>
                          <span className="text-[10px] text-ebay-textGrey flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{new Date(inq.createdAt).toLocaleString()}</span>
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-xs font-semibold text-ebay-dark pt-1">
                          <span className="font-bold text-ebay-link">{inq.name}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-ebay-textGrey flex items-center space-x-1 font-normal">
                            <Mail size={12} />
                            <span>{inq.email}</span>
                          </span>
                        </div>

                        <p className="text-xs text-ebay-textGrey leading-relaxed bg-white border border-gray-100 rounded-xl p-3.5 mt-2 font-normal">
                          {inq.message}
                        </p>
                      </div>

                      <button
                        onClick={() => handleResolveInquiry(inq._id)}
                        className="self-start bg-ebay-green hover:bg-[#155a30] text-white text-xs font-bold px-4 py-2 rounded-full flex items-center space-x-1.5 transition shadow-sm cursor-pointer focus:outline-none flex-shrink-0"
                        title="Mark as resolved"
                      >
                        <Check size={14} />
                        <span>Resolve</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
