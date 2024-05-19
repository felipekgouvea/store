import { getProductsSlug } from '@/api/getProductSlug'
import ProductImagens from '../_components/product-images'

interface ProductDetailsPage {
  params: {
    slug: string
  }
}

const ProductDetailsPage = async ({ params: { slug } }: ProductDetailsPage) => {
  const product = await getProductsSlug(slug)

  if (!product) return null

  return (
    <div>
      {<ProductImagens imageUrls={product.imageUrls} name={product.name} />}
    </div>
  )
}

export default ProductDetailsPage