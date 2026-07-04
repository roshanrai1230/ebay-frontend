import React from 'react';

const CategoryCircleList = ({ onSelectCategory, selectedCategory }) => {
  const categoriesList = [
    {
      name: "Motors",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=150&auto=format&fit=crop"
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop"
    },
    {
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&auto=format&fit=crop"
    },
    {
      name: "Collectibles",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop"
    },
    {
      name: "Home & Garden",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=150&auto=format&fit=crop"
    },
    {
      name: "All Categories",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&auto=format&fit=crop",
      label: "Show All"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 mt-8">
      <h3 className="text-xl font-bold tracking-tight text-ebay-dark mb-4 text-left">
        Shop by Category
      </h3>
      <div className="flex items-center justify-start space-x-6 overflow-x-auto no-scrollbar py-2">
        {categoriesList.map((cat, i) => {
          const isActive = selectedCategory === cat.name;
          return (
            <button
              key={i}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center group focus:outline-none flex-shrink-0 cursor-pointer"
            >
              {/* Circular Thumbnail container */}
              <div className={`w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-2 transition duration-300 relative shadow-sm ${
                isActive ? 'border-ebay-blue ring-2 ring-ebay-blue/20 transform scale-105' : 'border-transparent group-hover:border-gray-300 group-hover:scale-105'
              }`}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition duration-200"></div>
              </div>
              
              {/* Category Label */}
              <span className={`mt-2 text-xs font-semibold text-center transition duration-200 ${
                isActive ? 'text-ebay-blue font-bold' : 'text-ebay-dark group-hover:text-ebay-blue'
              }`}>
                {cat.label || cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryCircleList;
