import { Minus, Plus, X } from 'lucide-react';
import React from 'react';

export default function Cart({ data, onRemove, onUpdate, onCheckout }) {
  const items = data.items || [];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-indigo-600 mb-3">Your Cart</h3>
      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">🛍️ Cart is empty</p>
      ) : (
        items.map((it) => (
          <div key={it._id} className="flex items-center justify-between mb-3 border-b pb-2">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{it.product.name}</p>
              <p className="text-xs text-gray-500">${it.product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdate(it._id, it.qty - 1)}
                className="bg-green-500 p-1 text-white rounded-lg active:bg-green-300"
              ><Minus size={20} strokeWidth={4}/></button>
              <span className="w-6 text-center">{it.qty}</span>
              <button
                onClick={() => onUpdate(it._id, it.qty + 1)}
                className="bg-green-500 p-1 text-white rounded-lg active:bg-green-300"
              ><Plus size={20} strokeWidth={4}/></button>
            </div>
            <button
              onClick={() => onRemove(it._id)}
              className="text-white  bg-red-500 p-1  rounded-lg hover:text-red-700 ml-2"
            >
              <X size={20} strokeWidth={4}/>
            </button>
          </div>
        ))
      )}

      <div className="flex justify-between items-center mt-3 font-medium text-gray-800">
        <span>Total:</span>
        <span>${data.total}</span>
      </div>

      <button
        disabled={!items.length}
        onClick={onCheckout}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
