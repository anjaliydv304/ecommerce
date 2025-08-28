'use client';
import { useStore } from '@/lib/store';
import { useAllCategories } from '@/hooks/useProducts';
import { useEffect } from 'react';

export default function Header() {
  const setSearchTerm = useStore((state) => state.setSearchTerm);
  const setCategoryFilter = useStore((state) => state.setCategoryFilter);
  const selectedCategory = useStore((state) => state.categoryFilter);

  const { data: categories, isLoading, isError } = useAllCategories();

  
  useEffect(() => {
    setCategoryFilter('all');
  }, [setCategoryFilter]);

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Error loading categories.</div>;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-slate-600">ShopHub</h1>
            <nav className="hidden md:flex space-x-8">
              <span className="text-sm font-medium text-gray-700 hover:text-slate-600 cursor-pointer">Men</span>
              <span className="text-sm font-medium text-gray-700 hover:text-slate-600 cursor-pointer">Women</span>
              <span className="text-sm font-medium text-gray-700 hover:text-slate-600 cursor-pointer">Kids</span>
              <span className="text-sm font-medium text-gray-700 hover:text-slate-600 cursor-pointer">Beauty</span>
            </nav>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for products, brands and more"
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 text-black rounded-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-700 hover:text-slate-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Profile</span>
            </div>
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-700 hover:text-slate-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Wishlist</span>
            </div>
          </div>
        </div>

        {/* Category filters */}
        <div className="py-3 border-t border-gray-100">
          <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === 'all' 
                  ? 'bg-slate-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              All Categories
            </button>
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 capitalize ${
                  selectedCategory === category 
                    ? 'bg-slate-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {category.replace("'s", "s")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}