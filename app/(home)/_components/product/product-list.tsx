import { Product } from '@prisma/client'
import ProductItem from './product-item'

interface ProductListProps {
  products: Product[]
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <div key={product.id} className="w-[170px] max-w-[170px]">
          <ProductItem product={product} />
        </div>
      ))}
    </div>
  )
}

export default ProductList
