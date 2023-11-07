import { atom } from 'jotai';
export interface ProductData {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
}

export const cartAtom = atom<ProductData[]>([]);
export const productsAtom = atom<ProductData[]>([]);
export const searchAtom = atom<string>('');
