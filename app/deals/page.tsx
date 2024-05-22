import { getProductsDeals } from '@/api/getProductsDeals'
import TitlePage from '../_components/title-page'
import ProductItem from '../(home)/_components/product/product-item'

const DealsPage = async () => {
  const products = await getProductsDeals()

  return (
    <div className="flex flex-col gap-4 px-5">
      <div className="mt-4">
        <TitlePage title="Ofertas" slug="boxes" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default DealsPage
