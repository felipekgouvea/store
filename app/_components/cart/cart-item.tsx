import { CartContext, CartProduct } from '@/app/_context/cart'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'
import { useContext } from 'react'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductToCart,
  } = useContext(CartContext)

  const handleIncreaseProductClick = () => {
    increaseProductQuantity(cartProduct.id)
  }

  const handleDecreaseProductClick = () => {
    decreaseProductQuantity(cartProduct.id)
  }

  const handleRemoveProductToCartClick = () => {
    removeProductToCart(cartProduct.id)
  }

  return (
    <div className=" flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={cartProduct.imageUrls[0]}
            alt={cartProduct.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-xs">{cartProduct.name}</h2>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold">
                {formatCurrency(
                  calculeteProductTotalPrice(cartProduct) *
                    cartProduct.quantity,
                )}
              </h3>
              {cartProduct.discountPercentage > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(
                    Number(cartProduct.basePrice) *
                      Number(cartProduct.quantity),
                  )}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleDecreaseProductClick}
              className="h-6 w-6 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={12} />
            </Button>

            <span className="w-6 text-sm font-normal">
              {cartProduct.quantity}
            </span>

            <Button
              size="icon"
              variant="default"
              onClick={handleIncreaseProductClick}
              className="h-6 w-6"
            >
              <ChevronRightIcon size={12} />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleRemoveProductToCartClick}
          className="h-8 w-8 "
        >
          <Trash2Icon size={14} />
        </Button>
      </div>
    </div>
  )
}

export default CartItem
