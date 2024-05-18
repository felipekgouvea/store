import { getProductsBySlug } from '@/api/getProductsByCategories'
import ProductItem from '@/app/(home)/_components/product/product-item'
import TitlePage from '@/app/_components/title-page'
import { Category } from '@prisma/client'

interface CategoryPageProps {
  params: Pick<Category, 'slug'>
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categories = await getProductsBySlug(params.slug)

  return (
    <div className="flex flex-col gap-6 px-5">
      {categories && (
        <TitlePage title={categories.name} slug={categories.slug} />
      )}
      <div className="grid grid-cols-2 gap-8 ">
        {categories &&
          categories.products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </div>
  )
}

export default CategoryPage
