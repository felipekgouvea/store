import Image from 'next/image'
import Header from '../_components/header/header'
import Category from './_components/category/categories'
import ProdcutList from './_components/product/product-list'

const Home = () => {
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
          <h2 className="px-5 pb-6 pt-6 font-bold">Ofertas</h2>
          <ProdcutList />
        </div>

        <div className="mb-8 mt-8 px-5">
          <Image
            src="/banner-mouses.png"
            alt="Até 30% de desconto em pizzas."
            width={0}
            height={0}
            sizes="100vh"
            quality={100}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="">
          <h2 className="px-5 pb-6 pt-6 font-bold">Ofertas</h2>
          <ProdcutList />
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
          <h2 className="px-5 pb-6 pt-6 font-bold">Ofertas</h2>
          <ProdcutList />
        </div>
      </div>
    </>
  )
}

export default Home
