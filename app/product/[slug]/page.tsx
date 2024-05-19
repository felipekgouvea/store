import { getProductsSlug } from '@/api/getProductSlug'
import ProductImagens from '../_components/product-images'
import ProductInfo from '../_components/product-info'
import ProductList from '@/app/_components/product-list'
import SectionTitle from '@/app/_components/section-title'

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
      <div className="mt-16 px-5">
        <div className="mb-5">
          <SectionTitle>Produtos Recomendados</SectionTitle>
        </div>
        <ProductList products={product.category.products} />
      </div>
    </div>
  )
}

export default ProductDetailsPage
