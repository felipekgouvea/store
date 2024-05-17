import Image from 'next/image'
import Header from '../_components/header/header'
import Category from './_components/category/categories'
import { db } from '../_lib/prisma'
import ProductList from './_components/product/product-list'

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
    <>
      <div>
        <div>
          <Header />
        </div>

        <div className="mb-8 mt-8 px-5">
          <Image
            src="/banner-01.png"
            alt="Até 55% de desconto só esse mês."
            width={0}
            height={0}
            sizes="100vh"
            quality={100}
            className="h-auto w-full object-contain"
          />
        </div>
        <div>
          <Category />
        </div>

        <div>
          <h2 className="px-5 pb-4 pt-6 font-bold">OFERTAS</h2>
          <ProductList products={deals} />
        </div>

        <div className="mb-8 mt-8 px-5">
          <Image
            src="/banner-mouses.png"
            alt="Até 55% de desconto em mouses."
            width={0}
            height={0}
            sizes="100vh"
            quality={100}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="">
          <h2 className="px-5 pb-6 pt-6 font-bold">TECLADOS</h2>
          <ProductList products={keyboards} />
        </div>

        <div className="mb-8 mt-8 px-5">
          <Image
            src="/banner-fones.png"
            alt="Até 30% de desconto em pizzas."
            width={0}
            height={0}
            sizes="100vh"
            quality={100}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className=" pb-14">
          <h2 className="px-5 pb-6 pt-6 font-bold">MOUSES</h2>
          <ProductList products={mouses} />
        </div>
      </div>
    </>
  )
}

export default Home
