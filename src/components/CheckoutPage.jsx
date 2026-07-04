import React, { useState } from 'react';
import { ArrowLeft, CreditCard, DollarSign, ShieldCheck, CheckCircle, Truck } from 'lucide-react';

const CheckoutPage = ({ cartItems, total, subtotal, shipping, onBack, onCompletePurchase }) => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'offline'
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Generate unique order ID
    const generatedOrderId = 'EB-' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderId: generatedOrderId,
      customerName: shippingInfo.fullName,
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: shippingInfo.pincode,
      phone: shippingInfo.phone,
      paymentMethod,
      items: cartItems.map(item => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      })),
      totalAmount: total
    };

    setIsSubmitting(true);
    try {
      // Pass the fully structured orderData payload to App callback
      await onCompletePurchase(orderData);
      setOrderId(generatedOrderId);
      setOrderCompleted(true);
    } catch (err) {
      alert(`Order placement failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order is completed successfully, render a beautiful confirmation screen
  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans text-left">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-xl text-center space-y-6 animate-fadeIn">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-ebay-green">
            <CheckCircle size={40} />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-ebay-dark">Order Confirmed!</h2>
            <p className="text-sm text-ebay-textGrey">Thank you for shopping with eBay.</p>
          </div>

          <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50 text-xs text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Order ID:</span>
              <span className="font-bold text-ebay-dark">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Deliver to:</span>
              <span className="font-bold text-ebay-dark">{shippingInfo.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Address:</span>
              <span className="font-bold text-ebay-dark truncate max-w-[200px]" title={shippingInfo.address}>
                {shippingInfo.address}, {shippingInfo.city} - {shippingInfo.pincode}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Payment:</span>
              <span className="font-bold text-ebay-dark capitalize">{paymentMethod} ({paymentMethod === 'online' ? 'Credit Card' : 'Cash on Delivery'})</span>
            </div>
            <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-sm text-ebay-dark">
              <span>Total Paid:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-2 text-xs text-ebay-green bg-green-50/50 py-2.5 rounded-xl border border-green-100">
            <Truck size={16} />
            <span className="font-bold">Estimated delivery: 3-5 business days</span>
          </div>

          <button
            onClick={() => onBack()}
            className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-full text-sm shadow-md transition cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-left">
      {/* Mini Header */}
      <div className="bg-white border-b border-ebay-borderGrey py-4 px-6 flex justify-between items-center w-full sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex text-2xl font-bold tracking-tighter select-none font-sans mr-2">
            <span className="text-[#e53238]">e</span>
            <span className="text-[#0064d2]">b</span>
            <span className="text-[#f5af02]">a</span>
            <span className="text-[#86b817]">y</span>
          </div>
          <span className="text-sm font-semibold text-ebay-textGrey border-l border-gray-300 pl-3">
            Secure Checkout
          </span>
        </div>

        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold border border-ebay-dark text-ebay-dark px-4 py-2 rounded-full hover:bg-gray-50 transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Return to Cart</span>
        </button>
      </div>

      {/* Main Form content */}
      <div className="max-w-6xl mx-auto w-full px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        
        {/* Left Side: Shipping Address & Payment Selection (Col 8) */}
        <form onSubmit={handleSubmitOrder} className="lg:col-span-8 space-y-6">
          
          {/* Shipping Address Box */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#191919] border-b border-gray-100 pb-3.5 mb-4 flex items-center space-x-2">
              <Truck size={18} className="text-ebay-blue" />
              <span>Shipping Address</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-gray-500">
              <div className="md:col-span-2">
                <label className="block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Street address, P.O. box, company name, c/o"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Mumbai"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1">State / Province / Region *</label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Maharashtra"
                  value={shippingInfo.state}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1">Pincode / Zip Code *</label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="e.g. 400001"
                  value={shippingInfo.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="10-digit mobile number"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-ebay-dark font-normal focus:ring-1 focus:ring-ebay-blue focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Selection Box */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#191919] border-b border-gray-100 pb-3.5 mb-4 flex items-center space-x-2">
              <CreditCard size={18} className="text-ebay-blue" />
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-4">
              {/* Online payment option */}
              <div 
                onClick={() => setPaymentMethod('online')}
                className={`border p-4 rounded-2xl flex items-start space-x-3 cursor-pointer transition ${
                  paymentMethod === 'online' ? 'border-ebay-blue bg-blue-50/10' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="mt-1 cursor-pointer"
                />
                <div className="flex-grow space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ebay-dark">Online Payment</span>
                    {/* Logotypes strip */}
                    <div className="flex space-x-1 select-none">
                      <div className="border border-gray-200 rounded px-1.5 py-0.5 bg-white text-[8px] font-black italic text-[#003087]">PayPal</div>
                      <div className="border border-gray-200 rounded px-1.5 py-0.5 bg-white text-[8px] font-bold text-gray-700">VISA</div>
                      <div className="border border-gray-200 rounded px-1.5 py-0.5 bg-white text-[8px] font-bold text-gray-700">GPay</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-ebay-textGrey font-normal">
                    Pay securely using your Visa, MasterCard, PayPal, or other connected digital services.
                  </p>

                  {/* Mock Credit Card Fields */}
                  {paymentMethod === 'online' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500 animate-fadeIn">
                      <div className="sm:col-span-3">
                        <label className="block mb-1">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          required={paymentMethod === 'online'}
                          placeholder="4111 2222 3333 4444"
                          value={cardInfo.cardNumber}
                          onChange={handleCardChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-ebay-dark font-normal focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block mb-1">Expiration Date *</label>
                        <input
                          type="text"
                          name="expiry"
                          required={paymentMethod === 'online'}
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={handleCardChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-ebay-dark font-normal focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">CVV Security Code *</label>
                        <input
                          type="password"
                          name="cvv"
                          required={paymentMethod === 'online'}
                          placeholder="123"
                          maxLength={3}
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          className="w-full border border-gray-300 rounded-lg p-2 text-ebay-dark font-normal focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Offline / Cash on Delivery option */}
              <div 
                onClick={() => setPaymentMethod('offline')}
                className={`border p-4 rounded-2xl flex items-start space-x-3 cursor-pointer transition ${
                  paymentMethod === 'offline' ? 'border-ebay-blue bg-blue-50/10' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === 'offline'}
                  onChange={() => setPaymentMethod('offline')}
                  className="mt-1 cursor-pointer"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-ebay-dark">Cash on Delivery (COD)</span>
                    <span className="bg-gray-100 text-gray-700 font-bold text-[9px] px-1.5 py-0.5 rounded border border-gray-200">
                      Offline Mode
                    </span>
                  </div>
                  <p className="text-[11px] text-ebay-textGrey font-normal">
                    Pay using cash when the courier delivery boy arrives with your package at your doorstep.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </form>

        {/* Right Side: Order Summary & Placement Button (Col 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#191919] border-b border-gray-100 pb-3 mb-4">
              Order Summary
            </h3>

            {/* Cart Items List */}
            <div className="divide-y divide-gray-100 max-h-[220px] overflow-y-auto pr-1 no-scrollbar mb-4 space-y-2 select-none">
              {cartItems.map((item, idx) => (
                <div key={item._id || idx} className="flex space-x-3 py-2 border-b border-gray-50 last:border-0">
                  <img src={item.imageUrl} className="w-10 h-10 object-contain border border-gray-100 rounded bg-gray-50 p-0.5 flex-shrink-0" alt="" />
                  <div className="flex-grow text-xs text-left">
                    <h4 className="font-semibold text-ebay-dark line-clamp-1 leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-ebay-textGrey mt-0.5">Qty: {item.quantity} · {item.condition}</p>
                  </div>
                  <span className="text-xs font-bold text-ebay-dark flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-ebay-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping fee</span>
                <span className="font-semibold text-ebay-green">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-bold text-ebay-dark">
                <span>Total (USD)</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Submit checkout CTA button */}
            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting || cartItems.length === 0}
              className="w-full bg-[#3665f3] hover:bg-[#2b50c7] text-white font-bold py-3.5 rounded-full text-xs shadow-md mt-6 transition duration-200 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-center"
            >
              {isSubmitting ? 'Processing Order...' : 'Confirm & Place Order'}
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[9px] text-ebay-textGrey mt-4">
              <ShieldCheck size={14} className="text-ebay-green" />
              <span>eBay Money Back Guarantee included</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
