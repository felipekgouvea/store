import {
  calculeteProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import DiscountBadge from '@/app/_components/discount-badge'

interface ProductItemProps {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-full items-center justify-center rounded-lg bg-accent">
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
            <DiscountBadge className="absolute left-3 top-3">
              <span>{product.discountPercentage}</span>
            </DiscountBadge>
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
    </Link>
  )
}

export default ProductItem
