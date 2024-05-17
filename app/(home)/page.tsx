import Image from 'next/image'
import Header from '../_components/header/header'
import Category from './_components/category/categories'
import ProdcutList from './_components/product/product-list'

const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>

      <div className="mb-8 mt-8 px-5">
        <Image
          src="/banner-01.png"
          alt="Até 30% de desconto em pizzas."
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

      <div className="px-5">
        <h2 className="pb-6 pt-6 font-bold">Ofertas</h2>
        <ProdcutList />
      </div>
    </>
  )
}

export default Home
