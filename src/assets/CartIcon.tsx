interface Props {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const CartIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
}: Props) => {
  return (
    <svg
      className='text-gray-800 dark:text-white'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      viewBox='0 0 18 21'
      focusable='false'
      width={width || size}
      height={height || size}
    >
      <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
    </svg>
  );
};
