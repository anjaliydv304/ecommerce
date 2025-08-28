'use client';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function CartIcon() {
  const cartItemCount = useStore((state) => state.cart.length);
  const cart = useStore((state) => state.cart);
  const [showMiniCart, setShowMiniCart] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      {/* Cart Icon */}
      <div 
        className="fixed bottom-6 right-6 z-40"
        onMouseEnter={() => setShowMiniCart(true)}
        onMouseLeave={() => setShowMiniCart(false)}
      >
        <button className="bg-slate-600 hover:bg-slate-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 relative group">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
          </svg>
          
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
              {cartItemCount}
            </span>
          )}
        </button>

        {/* Mini Cart Preview */}
        {showMiniCart && cartItemCount > 0 && (
          <div className="absolute bottom-full right-0 mb-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Shopping Bag ({cartItemCount})</h3>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {cart.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-12 h-12 object-contain bg-gray-50 rounded"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title.substring(0, 40)}...
                    </p>
                    <p className="text-sm text-slate-600 font-semibold">₹{Math.round(item.price)}</p>
                  </div>
                </div>
              ))}
              
              {cart.length > 3 && (
                <div className="p-3 text-center text-sm text-gray-500">
                  +{cart.length - 3} more items
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-gray-900">Total:</span>
                <span className="font-bold text-lg text-slate-600">₹{Math.round(getTotalPrice())}</span>
              </div>
              <button className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 rounded transition-colors">
                VIEW BAG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty Cart Message */}
      {showMiniCart && cartItemCount === 0 && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
          </svg>
          <p className="text-gray-500 text-sm">Your bag is empty</p>
          <p className="text-gray-400 text-xs mt-1">Add some items to get started!</p>
        </div>
      )}
    </>
  );
}