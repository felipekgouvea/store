'use client'

import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Product } from '@prisma/client'
import {
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TruckIcon,
} from 'lucide-react'
import { useState } from 'react'

interface ProductInfoProsp {
  product: Product
}

const ProductInfo = ({ product }: ProductInfoProsp) => {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1

      return currentState - 1
    })
  return (
    <div className="mt-8 px-5">
      <div className="flex flex-col gap-4">
        <h2>{product.name}</h2>

        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">
              {formatCurrency(calculeteProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <Badge
                variant="default"
                className="flex items-center justify-center rounded-full px-2 text-white hover:bg-primary"
              >
                <ArrowDownIcon size={14} />
                <span>{`${product.discountPercentage}%`}</span>
              </Badge>
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
          <Button className="w-full text-sm font-bold text-white">
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
  )
}

export default ProductInfo
