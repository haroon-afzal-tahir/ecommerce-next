'use client';
import { ProductData, productsAtom, searchAtom } from '@/atoms/product';
import ProductCard from '@/components/ProductCard';
import ProductCardLoader from '@/components/ProductCardLoader';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { client } from '../../sanity/sanity';
import { groq } from 'next-sanity';
export default function Home() {
  const [products, setProducts] = useAtom(productsAtom);
  const [search] = useAtom(searchAtom);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response: ProductData[] = await client.fetch(
          groq`*[_type == "product"]`
        );
        // Remove other fields that are not needed
        const products = response.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          description: product.description,
        }));
        setProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    getProducts();
  }, [setProducts]);

  const searchProducts = () => {
    if (search === '') return products;
    return products.filter((product) => product.title.includes(search));
  };

  if (products.length === 0) {
    return (
      <div className='grid grid-cols-1 sm:grid-cols-4 p-2 min-h-screen gap-x-2 gap-y-6'>
        {[...Array(10)].map((_, i) => (
          <ProductCardLoader key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 min-h-screen py-4 px-6'>
      <h1 className='font-bold text-2xl'>Featured Projects</h1>
      <div className='gap-2 grid grid-cols-1 sm:grid-cols-4'>
        {searchProducts().map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
