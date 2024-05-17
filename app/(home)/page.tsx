import Image from 'next/image'
import Header from '../_components/header/header'
import Category from './_components/category/categories'

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
    </>
  )
}

export default Home
