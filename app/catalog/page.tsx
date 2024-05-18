import { getCategories } from '@/api/getCategories'
import TitlePage from '../_components/title-page'
import CatalogItem from './_components/catalog-item'

const CatalogPage = async () => {
  const categories = await getCategories()

  return (
    <div className="flex flex-col gap-8 px-5">
      <TitlePage title="Catálogo" />
      <div className="grid grid-cols-2 gap-8">
        {categories?.map((category) => (
          <CatalogItem key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default CatalogPage
