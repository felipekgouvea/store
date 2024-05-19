import { getProductsSlug } from '@/api/getProductSlug'
import ProductImagens from '../_components/product-images'
import ProductInfo from '../_components/product-info'

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
      <ProductImagens imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={product} />
    </div>
  )
}

export default ProductDetailsPage
