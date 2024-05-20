'use client'

import { MenuIcon, ShoppingCartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useState, useContext } from 'react'
import Link from 'next/link'
import { CartContext } from '@/app/_context/cart'
import TitlePage from '../title-page'
import Cart from '../cart/cart'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenCart, setIsOpenCart] = useState(false)
  const { products } = useContext(CartContext)

  const handleOpenToCartClick = () => {
    setIsOpenCart(true)
  }

  return (
    <>
      <div className="max-h-85px flex min-h-[85px] w-full items-center justify-between border-b border-muted px-5">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon size={16} />
        </Button>
        <Link href="/">
          <Image src="/logo.png" alt="Logo da Loja" width={92} height={27} />
        </Link>
        <Button size="icon" variant="outline" onClick={handleOpenToCartClick}>
          <div className="relative">
            <span className="absolute right-[5px] top-[-25px] h-5 w-5 rounded-full bg-primary ">
              {products.length > 0 ? products.length : 0}
            </span>
          </div>
          <ShoppingCartIcon size={16} />
        </Button>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet open={isOpenCart} onOpenChange={setIsOpenCart}>
        <SheetContent className="w-[90%]">
          <SheetHeader>
            <SheetTitle className="pb-3 text-left text-lg font-semibold">
              <TitlePage title="Carrinho" slug="cart" />
            </SheetTitle>
          </SheetHeader>
          <Cart setIsOpenCart={setIsOpenCart} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Header
