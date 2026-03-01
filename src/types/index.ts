export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  rating: number;
  image: string;
  category: string;
  description: string;
  colors: string[];
  sizes: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
