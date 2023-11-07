import { ProductData } from '@/atoms/product';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

export default function ProductCard({ id, image, title, price }: ProductData) {
  return (
    <Card shadow='sm' as={Link} href={`/${id}`}>
      <CardBody className='overflow-visible p-0'>
        <Image
          shadow='sm'
          radius='lg'
          width={'100%'}
          alt={title}
          className='w-full object-cover h-80'
          src={image}
        />
      </CardBody>
      <CardFooter className='text-small justify-between'>
        <b>{title}</b>
        <p className='text-default-500'>PKR {price}</p>
      </CardFooter>
    </Card>
  );
}
