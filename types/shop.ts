export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'gems' | 'psychological' | 'physiological';
  image: string;
  inStock: boolean;
}

export interface CartItem extends ShopItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  userId: string;
}