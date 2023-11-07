'use client';

import { useState, useEffect } from 'react';
import { ProductData, cartAtom, productsAtom } from '@/atoms/product';
import { useAtom } from 'jotai';
import { client } from '../../../sanity/sanity';
import { groq } from 'next-sanity';
import { Button, Image, Skeleton } from '@nextui-org/react';
import { useParams } from 'next/navigation';
import product from '../../../sanity/schemas/product';
import ProductCard from '@/components/ProductCard';

export default function Product() {
  const { slug } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<ProductData>();

  const [cart, setCart] = useAtom(cartAtom);
  const [products, setProducts] = useAtom(productsAtom);
  useEffect(() => {
    const getProductById = async () => {
      try {
        const response: ProductData = (
          (await client.fetch(
            groq`*[_type == "product" && id == ${slug}]`
          )) as ProductData[]
        )[0];
        const product: ProductData = {
          id: response.id,
          title: response.title,
          price: response.price,
          image: response.image,
          description: response.description,
        };
        setSelectedProduct(product);
      } catch (error) {
        console.error(error);
      }
    };

    getProductById();
  }, [slug]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response: ProductData[] = await client.fetch(
          groq`*[_type == "product" && id != ${slug}]`
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

    if (products.length === 0) {
      getProducts();
    }
  }, [products, setProducts, slug]);

  if (!selectedProduct) {
    return (
      <div className='grid md:grid-cols-2 grid-cols-1 p-2 min-h-screen max-w-9xl mx-auto gap-4'>
        <Skeleton className='rounded-lg '>
          <div className='w-full h-[40rem]'></div>
        </Skeleton>
      </div>
    );
  }

  if (selectedProduct) {
    return (
      <div className='flex flex-col gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 p-4 min-h-screen max-w-9xl mx-auto gap-4'>
          <Image
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className='max-h-[40rem] rounded-lg object-cover object-top'
          />
          <div className='flex flex-col'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-3xl font-bold'>{selectedProduct.title}</h1>
              <p className='text-2xl font-bold'>PKR {selectedProduct.price}</p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='text-lg'>{selectedProduct.description}</p>
              <Button
                color='primary'
                onClick={() => {
                  if (cart.find((item) => item.id === selectedProduct.id))
                    return;
                  setCart((prev) => [...prev, selectedProduct]);
                }}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4 py-4 px-6'>
          <h1 className='font-bold text-2xl'>Featured Projects</h1>
          <div className='gap-2 grid grid-cols-1 sm:grid-cols-4'>
            {products
              .filter((product) => String(product.id) !== slug)
              .map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
