import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ShoppingBag } from 'lucide-react';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
  if (!isOpen) return null;

  // Calculate calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cartItems.reduce((sum, item) => sum + (item.shippingPrice || 0) * item.quantity, 0);
  const total = subtotal + shipping;

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    onCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Cart Container Slide-Over */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-ebay-blue" />
              <h2 className="text-lg font-bold text-ebay-dark">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-ebay-dark hover:bg-gray-100 p-1.5 rounded-full transition focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 py-6 overflow-y-auto px-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-5xl">🛒</div>
                <h3 className="text-base font-bold text-ebay-dark">Your cart is empty</h3>
                <p className="text-xs text-ebay-textGrey max-w-xs font-normal leading-relaxed">
                  Looks like you haven't added any items to your cart yet. Go back and check out our trending deals!
                </p>
                <button
                  onClick={onClose}
                  className="bg-ebay-blue hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-sm transition cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div key={item._id || idx} className="flex space-x-4 border-b border-gray-100 pb-5 last:border-b-0">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 border border-gray-200 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center p-1.5">
                    <img src={item.imageUrl} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 flex flex-col text-left">
                    <h4 className="text-xs font-semibold text-ebay-dark line-clamp-2 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-ebay-textGrey mt-1 capitalize font-normal">Condition: {item.condition}</p>
                    
                    {/* Price and controls */}
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-ebay-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-500 hover:text-ebay-blue disabled:opacity-30 disabled:hover:text-gray-500 transition focus:outline-none cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-semibold text-ebay-dark select-none">{item.quantity}</span>
                        <button
                          onClick={() => {
                            // Check inventory limit before increasing
                            if (item.quantity >= item.availableStock) {
                              alert(`Cannot add more. Only ${item.availableStock} items left in stock.`);
                              return;
                            }
                            onUpdateQuantity(item._id, item.quantity + 1);
                          }}
                          className="px-2 py-1 text-gray-500 hover:text-ebay-blue transition focus:outline-none cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => onRemoveFromCart(item._id)}
                        className="text-gray-400 hover:text-ebay-red p-1 rounded-full transition focus:outline-none cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing calculations footer details */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50/50 space-y-4">
              <div className="space-y-2 text-sm text-ebay-dark">
                <div className="flex justify-between">
                  <span className="text-ebay-textGrey">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ebay-textGrey">Shipping</span>
                  <span className="font-semibold font-bold">
                    {shipping === 0 ? <span className="text-ebay-green">Free</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-base font-bold text-ebay-dark">
                  <span>Total (USD)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout details */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-ebay-blue hover:bg-blue-700 text-white font-bold py-3 rounded-full text-sm transition shadow-sm cursor-pointer"
                >
                  Go to checkout
                </button>
                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-ebay-textGrey">
                  <ShieldCheck size={14} className="text-ebay-green" />
                  <span>eBay Money Back Guarantee included</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Cart;
