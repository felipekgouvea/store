// import { getProductsByCategories } from '@/api/getProductsByCategory'
import { getProductsDeals } from '@/api/getProductsDeals'
import Category from './_components/category/categories'
import ProductList from '../_components/product-list'
import PromoBanner from './_components/promo-banner'
import SectionTitle from '../_components/section-title'
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
    <div>
      <div className="hidden  lg:inline-flex lg:w-full">
        <PromoBanner
          src="/banner-01-desktop.png"
          alt="Até 55% de desconto só esse mês."
        />
      </div>
      <div className="flex flex-col gap-8 px-5 pt-8">
        <div className="visible lg:hidden">
          <PromoBanner
            src="/banner-01.png"
            alt="Até 55% de desconto só esse mês."
          />
        </div>

        <div className="space-y-5 lg:px-[100px]">
          <Category />

          {deals ? (
            <>
              <SectionTitle>OFERTAS</SectionTitle>
              <ProductList products={deals} />
            </>
          ) : (
            <ProductDealsSkeleton />
          )}

          <div className="space-y-5 lg:flex lg:flex-row-reverse">
            <PromoBanner
              src="/banner-mouses.png"
              alt="Até 55% de desconto em mouses."
            />
            <PromoBanner
              src="/banner-fones.png"
              alt="Até 30% de desconto em fones."
              className="md:invisible"
            />
          </div>

          {keyboards && (
            <>
              <SectionTitle>TECLADOS</SectionTitle>
              <ProductList products={keyboards} />
            </>
          )}

          <div className="lg:hidden">
            <PromoBanner
              src="/banner-fones.png"
              alt="Até 20% de desconto em fones."
            />
          </div>

          {mouses && (
            <>
              <SectionTitle>MOUSES</SectionTitle>
              <ProductList products={mouses} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
