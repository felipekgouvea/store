import { Badge } from '@/app/_components/ui/badge'
import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import Image from 'next/image'

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true
    }
  }>
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex h-[80px] w-[90px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Badge
          variant="secondary"
          className="justify-center rounded-[5px] px-1"
        >
          <p className="text-xs font-normal">
            Vendido e entregue por:
            <span className="text-xs font-semibold"> Store</span>
          </p>
        </Badge>
        <h3>{orderProduct.product.name}</h3>
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold">
              {formatCurrency(
                calculeteProductTotalPrice(orderProduct.product) *
                  orderProduct.quantity,
              )}
            </span>
            <span className="text-xs text-[#676767] line-through ">
              {formatCurrency(
                Number(orderProduct.basePrice) * orderProduct.quantity,
              )}
            </span>
          </div>
          <span className="text-xs text-[#676767]">
            Qts: {orderProduct.quantity}
          </span>
        </div>
      </div>
    </div>
  )
}

export default OrderProductItem
