import React, { useEffect,useRef,useState } from 'react';
import { api } from './api';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [toast, setToast] = useState({ message: '', show: false });
  const [selectedReceipt, setSelectedReceipt] = useState(null); // for details modal

  const cartRef = useRef(null);

  const loadData = async () => {
    setProducts(await api.getProducts());
    setCart(await api.getCart());
  };

  useEffect(() => {
    loadData();
  }, []);

  const add = async (id) => {
    await api.addToCart(id);
    loadData();

    // 🔹 Scroll to cart if on mobile
    if (window.innerWidth < 768 && cartRef.current) {
      setTimeout(() => {
        cartRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };
  
  
  const remove = async (id) => {
    await api.removeFromCart(id);
    loadData();
  };

  const update = async (id, qty) => {
    await api.updateCart(id, qty);
    loadData();
  };

  const handleCheckout = async ({ name, email }) => {
    const res = await api.checkout(name, email);
    if (res.receipt) {
      setReceipts((prev) => [res.receipt, ...prev]);
      setShowCheckout(false);
      loadData();
      showToast('✅ Checkout successful!');
    } else alert(res.error || 'Checkout failed');
  };

  const clearReceipts = () => {
    const confirmClear = window.confirm('Are you sure you want to clear all receipts?');
    if (confirmClear) {
      setReceipts([]);
      showToast('🧾 All receipts cleared');
    }
  };

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 p-6 relative">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8 tracking-tight">
        🛒 Vibe Commerce Mock Cart
      </h1>

      <main className="grid md:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="md:col-span-2">
          <ProductGrid products={products} onAdd={add} />
        </div>

        {/* Cart + Receipts Sidebar */}
        <div ref={cartRef} className="md:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Cart
              data={cart}
              onRemove={remove}
              onUpdate={update}
              onCheckout={() => setShowCheckout(true)}
            />

            {/* Receipts Section */}
            {receipts.length > 0 && (
              <div className="p-3 rounded-2xl bg-white border border-gray-200 shadow-inner">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-indigo-700">🧾 Receipts</h2>
                  <button
                    onClick={clearReceipts}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                  >
                    Clear All
                  </button>
                </div>

                {/* Scrollable receipts list */}
                <div className="max-h-96 overflow-y-auto space-y-3 pr-1">
                  {receipts.map((receipt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl shadow-md bg-gray-50 border border-gray-100 animate-fadeIn"
                    >
                      <h3 className="text-sm font-semibold text-green-600 mb-1">
                        ✅ Checkout #{receipts.length - idx}
                      </h3>
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Customer:</span>{' '}
                        {receipt.customer || receipt.customerName}
                      </p>
                      <p className="text-xs text-gray-700">
                        <span className="font-medium">Total:</span> ${receipt.total}
                      </p>
                      <p className="text-xs text-gray-700 mb-2">
                        <span className="font-medium">Date:</span>{' '}
                        {new Date(receipt.createdAt || receipt.timestamp).toLocaleString()}
                      </p>
                      <button
                        onClick={() => setSelectedReceipt(receipt)}
                        className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md transition"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        visible={showCheckout}
        onClose={() => setShowCheckout(false)}
        onConfirm={handleCheckout}
      />

      {/* Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 animate-fadeIn">
            <h2 className="text-xl font-semibold text-indigo-700 mb-3">
              🧾 Receipt Summary
            </h2>
            <p className="text-sm mb-1">
              <strong>Customer:</strong>{' '}
              {selectedReceipt.customer || selectedReceipt.customerName}
            </p>
            <p className="text-sm mb-1">
              <strong>Email:</strong> {selectedReceipt.email || selectedReceipt.customerEmail}
            </p>
            <p className="text-sm mb-3">
              <strong>Date:</strong>{' '}
              {new Date(selectedReceipt.createdAt || selectedReceipt.timestamp).toLocaleString()}
            </p>

            <div className="border-t border-gray-200 my-2"></div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedReceipt.items?.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg border"
                >
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-3 pt-2 text-right">
              <strong className="text-lg text-green-600">
                Total: ${selectedReceipt.total}
              </strong>
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fadeInOut z-50">
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
