import productsData from '../data/data.json';

// Use local data instead of a backend
export const api = {
  getProducts: async (params?: { search?: string; category?: string; sort?: string }) => {
    let products = [...productsData.products];

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    if (params?.category) {
      products = products.filter((p) => p.category === params.category);
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'price-low-high':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          products.sort((a, b) => b.id.localeCompare(a.id));
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return products;
  },

  getProductById: async (id: string) => {
    const product = productsData.products.find((p) => p.id === id);
    return product || null;
  },
  getCategories: async () => {
    return productsData.categories;
  },
  getReviewsByProduct: async (productId: string) => {
    return productsData.reviews.filter((r) => r.productId === productId);
  },
};

