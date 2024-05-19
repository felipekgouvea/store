// import { getProductsByCategories } from '@/api/getProductsByCategory'
import { getProductsDeals } from '@/api/getProductsDeals'
import Category from './_components/category/categories'
import ProductList from '../_components/product-list'
import PromoBanner from './_components/promo-banner'
import SectionTitle from './_components/section-title'
import {
  getProductsByKeyboards,
  getProductsByMouses,
} from '@/api/getProductsByCategories'
import ProductDealsSkeleton from './_components/product/product-deals-skeleton'

const Home = async () => {
  const deals = await getProductsDeals()
  const keyboards = await getProductsByKeyboards()
  const mouses = await getProductsByMouses()

  return (
    <div className="flex flex-col gap-8 px-5 pt-8">
      <PromoBanner
        src="/banner-01.png"
        alt="Até 55% de desconto só esse mês."
      />

      <Category />

      {deals ? (
        <>
          <SectionTitle>OFERTAS</SectionTitle>
          <ProductList products={deals} />
        </>
      ) : (
        <ProductDealsSkeleton />
      )}
      <PromoBanner
        src="/banner-mouses.png"
        alt="Até 55% de desconto em mouses."
      />

      {keyboards && (
        <>
          <SectionTitle>TECLADOS</SectionTitle>
          <ProductList products={keyboards} />
        </>
      )}

      <PromoBanner
        src="/banner-fones.png"
        alt="Até 30% de desconto em pizzas."
      />

      {mouses && (
        <>
          <SectionTitle>MOUSES</SectionTitle>
          <ProductList products={mouses} />
        </>
      )}
    </div>
  )
}

export default Home
