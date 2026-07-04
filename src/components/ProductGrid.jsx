import React from 'react';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({ products, isLoading, onSelectProduct, resetFilters, activeCategory, activeSearch }) => {
  
  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 mt-8 pb-12">
        <h3 className="text-xl font-bold text-ebay-dark mb-6 text-left">
          {activeCategory !== 'All Categories' ? `${activeCategory} Deals` : 'Trending Deals'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm h-80 flex flex-col p-4 space-y-4 animate-pulse">
              <div className="bg-gray-200 h-40 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mt-auto"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 pb-12">
      {/* Grid title */}
      <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-3">
        <h3 className="text-xl font-bold text-ebay-dark text-left">
          {activeSearch
            ? `Results for "${activeSearch}"`
            : activeCategory !== 'All Categories'
            ? `${activeCategory} Deals`
            : 'Trending Deals on eBay'}
        </h3>
        <span className="text-xs text-ebay-textGrey font-medium">
          {products.length} {products.length === 1 ? 'item' : 'items'} found
        </span>
      </div>

      {products.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <div className="text-4xl mb-4">🔍</div>
          <h4 className="text-lg font-bold text-ebay-dark">No matching items found</h4>
          <p className="text-sm text-ebay-textGrey mt-1 max-w-sm mx-auto">
            We couldn't find anything matching your search. Try checking your spelling or adjusting your filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-6 bg-ebay-blue text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-blue-700 transition"
          >
            Clear Filters & Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, idx) => (
            <ProductCard
              key={product._id || idx}
              product={product}
              onClick={() => onSelectProduct(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
