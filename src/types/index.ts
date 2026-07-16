export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface ProductAddon {
  id: string;
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  // flat price for products without variants
  price?: number;
  // variants for products that require selection
  variants?: ProductVariant[];
  // optional add-ons
  addons?: ProductAddon[];
  isBestSeller?: boolean;
}

export interface CartItem {
  cartItemId: string;       // unique: productId + variantId + addonIds
  product: Product;
  variantId?: string;
  variantLabel?: string;
  variantPrice?: number;
  selectedAddons: ProductAddon[];
  quantity: number;
  unitPrice: number;        // variantPrice OR product.price
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}
