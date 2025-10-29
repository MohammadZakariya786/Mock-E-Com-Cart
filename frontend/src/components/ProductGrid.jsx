import React from 'react';

export default function ProductGrid({ products, onAdd }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p._id} className="bg-white rounded-xl justify-between shadow-md p-4 flex flex-col hover:scale-[1.02] transition">
          <img src={p.image} alt={p.name} className="md:h-40 h-25 w-full object-contain mb-3" />
          <h4 className="font-semibold text-gray-800 mb-1 text-sm md:line-clamp-2">{p.name}</h4>
          <p className="text-indigo-600 font-bold mb-2">${p.price}</p>
          <button
            onClick={() => onAdd(p._id)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
