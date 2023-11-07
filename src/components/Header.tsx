'use client';
import { SearchIcon } from '@/assets/SearchIcon';
import { AcmeLogo } from '@/assets/AcmeLogo';
import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
} from '@nextui-org/react';
import Link from 'next/link';
import { CartIcon } from '@/assets/CartIcon';
import { useAtom } from 'jotai';
import { cartAtom, searchAtom } from '@/atoms/product';
import { useEffect } from 'react';

export default function Header() {
  const [, setSearch] = useAtom(searchAtom);
  const [cart, setCart] = useAtom(cartAtom);

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <div className='w-full flex flex-col'>
      <div className='h-14 bg-[#0070F0] text-center flex items-center justify-center'>
        Get 20% off on all products. Use code&nbsp;
        <span className='font-bold'>ACME20</span>
      </div>
      <Navbar shouldHideOnScroll isBordered isBlurred>
        <NavbarBrand as={Link} href={'/'}>
          <AcmeLogo />
          <p className='font-bold text-inherit sm:block hidden'>ACME</p>
        </NavbarBrand>
        <NavbarContent justify='center'>
          <Input
            classNames={{
              base: 'max-w-full sm:max-w-[40rem] h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
            }}
            placeholder='Type to search...'
            size='sm'
            startContent={<SearchIcon size={18} />}
            type='search'
            onChange={(e) => setSearch(e.target.value)}
          />
        </NavbarContent>
        <NavbarContent justify='end'>
          <Badge content={cart.length} color='primary'>
            <Dropdown
              backdrop='blur'
              className='bg-default-900 dark:bg-default-50 rounded-lg shadow-medium'
            >
              <DropdownTrigger>
                <Button isIconOnly variant='light' disableRipple>
                  <CartIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                itemClasses={{
                  base: [
                    'rounded-md',
                    'bg-default-900',
                    'text-default-300',
                    'transition-opacity',
                    'data-[hover=true]:text-default-300',
                    'data-[hover=true]:bg-default-800',
                    'dark:data-[hover=true]:bg-default-50',
                    'data-[selectable=true]:focus:bg-default-50',
                    'data-[pressed=true]:opacity-70',
                    'data-[focus-visible=true]:ring-default-500',
                  ],
                }}
              >
                <DropdownSection aria-label='Cart' showDivider>
                  <DropdownItem key={'new'}>Cart</DropdownItem>
                  {cart.map((product, index) => (
                    <DropdownItem key={index}>
                      <div className='flex justify-between items-center sm:min-w-[20rem] gap-2'>
                        <div className='flex gap-2'>
                          <Image
                            src={product.image}
                            alt={product.title}
                            className='w-10 h-10 rounded-lg object-cover object-top'
                          />
                          <div className='flex flex-col gap-1'>
                            <p className='text-sm'>{product.title}</p>
                            <p className='text-sm'>PKR {product.price}</p>
                          </div>
                        </div>
                        <Button
                          variant='light'
                          color='danger'
                          className='self-end'
                          onClick={() => {
                            const newCart = cart.filter(
                              (item) => item.id !== product.id
                            );
                            setCart(newCart);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownSection aria-label='Proceed To Checkout'>
                  <DropdownItem
                    key={'checkout'}
                    as={Link}
                    className='text-center p-2 bg-default-800 hover:shadow-xl transition-all duration-300'
                    href='#'
                  >
                    Proceed To Checkout
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </Badge>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
