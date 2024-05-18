import Category from './_components/category/categories'
import { db } from '../_lib/prisma'
import ProductList from './_components/product/product-list'
import PromoBanner from './_components/promo-banner'
import SectionTitle from './_components/section-title'

const Home = async () => {
  const deals = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
  })

  const keyboards = await db.product.findMany({
    where: {
      category: {
        slug: 'keyboards',
      },
    },
  })

  const mouses = await db.product.findMany({
    where: {
      category: {
        slug: 'mouses',
      },
    },
  })
  return (
    <div className="flex flex-col gap-8 px-5">
      <PromoBanner
        src="/banner-01.png"
        alt="Até 55% de desconto só esse mês."
      />

      <Category />

      <SectionTitle>OFERTAS</SectionTitle>
      <ProductList products={deals} />

      <PromoBanner
        src="/banner-mouses.png"
        alt="Até 55% de desconto em mouses."
      />

      <SectionTitle>TECLADOS</SectionTitle>
      <ProductList products={keyboards} />

      <PromoBanner
        src="/banner-fones.png"
        alt="Até 30% de desconto em pizzas."
      />

      <SectionTitle>MOUSES</SectionTitle>
      <ProductList products={mouses} />
    </div>
  )
}

export default Home
