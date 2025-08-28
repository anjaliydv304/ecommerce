import { Product } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get(`${API_URL}/products`);
  return data;
};

const fetchCategories = async (): Promise<string[]> => {
  const { data } = await axios.get(`${API_URL}/products/categories`);
  return data;
};

const fetchProductById = async (id: number): Promise<Product> => {
  const { data } = await axios.get(`${API_URL}/products/${id}`);
  return data;
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};

export const useAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useProductDetails = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};