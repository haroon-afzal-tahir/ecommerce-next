import { Card, Skeleton } from '@nextui-org/react';

export default function ProductCardLoader() {
  return (
    <Card className='w-full space-y-3 h-fit' radius='lg'>
      <Skeleton className='rounded-lg'>
        <div className='h-80 rounded-lg bg-default-300'></div>
      </Skeleton>
      <div className='flex justify-between px-4 pb-4'>
        <Skeleton className='w-fit rounded-lg'>
          <div className='h-3 w-24 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='w-fit rounded-lg'>
          <div className='h-3 w-20 rounded-lg bg-default-300'></div>
        </Skeleton>
      </div>
    </Card>
  );
}
