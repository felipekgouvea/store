'use client'

import Cart from '@/app/_components/cart/cart'
import DiscountBadge from '@/app/_components/discount-badge'
import TitlePage from '@/app/_components/title-page'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { CartContext } from '@/app/_context/cart'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Product } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon, TruckIcon } from 'lucide-react'
import { useContext, useState } from 'react'

interface ProductInfoProsp {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProsp) => {
  const [quantity, setQuantity] = useState(1)
  const [isOpenCart, setIsOpenCart] = useState(false)
  const { addProductToCart } = useContext(CartContext)

  const handleAddToCartClick = () => {
    addProductToCart({ ...product, quantity })
    setIsOpenCart(true)
  }

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1

      return currentState - 1
    })

  return (
    <>
      <div className="mt-8 px-5">
        <div className="flex flex-col gap-4">
          <h2>{product.name}</h2>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">
                {formatCurrency(calculeteProductTotalPrice(product))}
              </h3>
              {product.discountPercentage > 0 && (
                <DiscountBadge>
                  <span>{product.discountPercentage}</span>
                </DiscountBadge>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-[#676767]">De: </span>
                <span className="text-sm text-[#676767] line-through ">
                  {formatCurrency(Number(product.basePrice))}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-center">
            <Button
              onClick={handleDecreaseQuantityClick}
              size="icon"
              variant="ghost"
              className="h-[32px] w-[32px] border border-solid border-muted"
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="w-4 text-sm">{quantity}</span>
            <Button
              size="icon"
              variant="ghost"
              className="h-[32px] w-[32px] border border-solid border-muted"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>

          <div className="mt-7">
            <h3 className="mb-2 text-sm font-bold">Descrição</h3>
            <p className="text-justify text-xs text-[#A1A1A1]">
              {product.description}
            </p>
          </div>
          <div className="mb-5">
            <Button
              onClick={handleAddToCartClick}
              className="w-full text-sm font-bold text-white"
            >
              Adiconar ao Carrinho
            </Button>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-accent px-6 py-4">
            <div className="flex items-center gap-3">
              <TruckIcon size={32} />
              <div>
                <p className="text-sm">
                  Entrega grátis via <span className="font-bold">FSPacket</span>
                </p>
                <p className="text-sm text-primary">
                  Envio para <span className=" font-bold">todo Brasil</span>
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold">Frete Grátis</p>
            </div>
          </div>
        </div>
      </div>
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

export default ProductInfo
