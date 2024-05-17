import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Badge } from '@/components/ui/badge'
import { Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="flex max-w-[156px] flex-col gap-4">
      <div className="relative flex h-[170px] w-[156px]  items-center justify-center rounded-lg bg-accent">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: 'contain' }}
        />
        {product.discountPercentage > 0 && (
          <Badge
            variant="default"
            className="absolute left-3 top-3 flex items-center justify-center rounded-full px-2 text-white hover:bg-primary"
          >
            <ArrowDownIcon size={8} />
            <span>{`${product.discountPercentage}%`}</span>
          </Badge>
        )}
      </div>

      <div className="space-y-1">
        <h2 className="overflow-hidden text-ellipsis text-nowrap text-xs">
          {product.name}
        </h2>
        <div className="flex items-center gap-1 text-sm">
          <h3 className="font-bold">
            {formatCurrency(calculeteProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-[#676767] line-through ">
              {formatCurrency(Number(product.basePrice))}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductItem
