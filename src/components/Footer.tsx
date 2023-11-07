import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className='flex flex-col items-center justify-center w-full h-24 border-t dark:border-neutral-800 bg-gradient-to-b from-zinc-200 dark:from-inherit'
      aria-label='Footer'
    >
      <Link
        className='flex items-center justify-center whitespace-nowrap'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        By&nbsp;
        <Image
          src='/vercel.svg'
          alt='Vercel Logo'
          className='dark:invert'
          width={72}
          height={16}
          priority
        />
      </Link>
    </footer>
  );
}
