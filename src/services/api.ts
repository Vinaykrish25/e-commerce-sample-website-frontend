const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return response.json();
  },
  getProductById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return response.json();
  },
  getCategories: async () => {
    const response = await fetch(`${BASE_URL}/categories`);
    return response.json();
  },
  getReviewsByProduct: async (productId: string) => {
    const response = await fetch(`${BASE_URL}/reviews/product/${productId}`);
    return response.json();
  },
};
