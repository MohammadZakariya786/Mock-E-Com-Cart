const BASE = import.meta.env.VITE_API_URL;

export const api = {
  getProducts: async () => (await fetch(`${BASE}/products`)).json(),
  getCart: async () => (await fetch(`${BASE}/cart`)).json(),
  addToCart: async (productId, qty = 1) =>
    (await fetch(`${BASE}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, qty }),
    })).json(),
  updateCart: async (id, qty) =>
    (await fetch(`${BASE}/cart/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty }),
    })).json(),
  removeFromCart: async (id) => (await fetch(`${BASE}/cart/${id}`, { method: 'DELETE' })).json(),
  checkout: async (name, email) =>
    (await fetch(`${BASE}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })).json(),
};
