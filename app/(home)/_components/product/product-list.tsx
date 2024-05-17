import { db } from '@/app/_lib/prisma'
import ProductItem from './product-item'

const ProdcutList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
  })

  return (
    <div className="flex gap-4 overflow-x-scroll pb-6 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProdcutList
