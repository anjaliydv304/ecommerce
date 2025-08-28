'use client';
import { useProductDetails } from '@/hooks/useProducts';
import { useStore } from '@/lib/store';
import Image from 'next/image';

interface Props {
  productId: number;
  onClose: () => void;
}

export default function ProductDetailsModal({ productId, onClose }: Props) {
  const { data: product, isLoading, isError } = useProductDetails(productId);
  const addToCart = useStore((state) => state.addToCart);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-600 border-t-transparent mx-auto"></div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-red-600 font-medium mb-4">Error loading product</p>
          <button onClick={onClose} className="bg-slate-600 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.floor(Math.random() * 40) + 10;
  const discountedPrice = product.price - (product.price * discount / 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              style={{ objectFit: 'contain' }}
              className="p-8"
              sizes="(max-width: 768px) 80vw, 50vw"
            />
            <div className="absolute top-4 left-4 bg-slate-600 text-white text-sm font-medium px-3 py-1 rounded">
              {discount}% OFF
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 capitalize">{product.category}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-green-600 text-white text-sm px-2 py-1 rounded">
                <span>{product.rating.rate}</span>
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">({product.rating.count} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">₹{Math.round(discountedPrice)}</span>
              <span className="text-xl text-gray-400 line-through">₹{Math.round(product.price)}</span>
              <span className="text-sm font-medium text-green-600">({discount}% OFF)</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">PRODUCT DETAILS</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 rounded transition-colors"
              >
                ADD TO BAG
              </button>
              
              <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded transition-colors">
                WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}