import { useStore } from '@/lib/store';
import { Product } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: Props) {
  const addToCart = useStore((state) => state.addToCart);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  const getDiscountPrice = (price: number) => {
    const discount = Math.floor(Math.random() * 40) + 10; // 10-50% discount
    const discountedPrice = price - (price * discount / 100);
    return { discountedPrice, discount };
  };

  const { discountedPrice, discount } = getDiscountPrice(product.price);

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative w-full h-60 bg-gray-50 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill={true}
          style={{ objectFit: 'contain' }}
          className="p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 80vw, 50vw" 
        />
        
        {/* Wishlist icon */}
        <button 
          className={`absolute top-3 right-3 p-2 rounded-full bg-white shadow-sm border transition-all duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'} hover:bg-slate-50`}
          onClick={(e) => {
            e.stopPropagation();
           
          }}
        >
          <svg className="w-4 h-4 text-gray-600 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Discount badge */}
        <div className="absolute top-3 left-3 bg-slate-600 text-white text-xs font-medium px-2 py-1 rounded">
          {discount}% OFF
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1">
            {truncateTitle(product.title, 50)}
          </h3>
          <p className="text-gray-500 text-xs capitalize">{product.category}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center bg-green-600 text-white text-xs px-1.5 py-0.5 rounded">
            <span>{product.rating.rate}</span>
            <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-gray-400 text-xs ml-1">({product.rating.count})</span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-3 mt-auto">
          <span className="text-lg font-semibold text-gray-900">₹{Math.round(discountedPrice)}</span>
          <span className="text-sm text-gray-400 line-through ml-2">₹{Math.round(product.price)}</span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="w-full bg-slate-600 hover:bg-slate-700 text-white text-sm font-medium py-2.5 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
}