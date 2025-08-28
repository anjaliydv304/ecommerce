import { Product } from '@/types';
import { create } from 'zustand';

interface AppState {
  searchTerm: string;
  categoryFilter: string;
  cart: Product[];
  isModalOpen: boolean; 
  selectedProductId: number | null; 
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (category: string) => void;
  addToCart: (product: Product) => void;
  openModal: (id: number) => void; 
  closeModal: () => void; 
}

export const useStore = create<AppState>((set) => ({
  searchTerm: '',
  categoryFilter: 'all',
  cart: [],
  isModalOpen: false, 
  selectedProductId: null, 
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  addToCart: (product) => set((state) => {
    const isProductInCart = state.cart.find((item) => item.id === product.id);
    if (!isProductInCart) {
      return { cart: [...state.cart, { ...product }] };
    }
    return state;
  }),
  openModal: (id) => set({ isModalOpen: true, selectedProductId: id }),
  closeModal: () => set({ isModalOpen: false, selectedProductId: null }), 
}));