import { db } from '@/app/_lib/prisma'
import CategoryItem from './category-item'

const Category = async () => {
  const categories = await db.category.findMany({
    take: 6,
  })

  return (
    <div className="grid w-full grid-cols-2 gap-4 px-5">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default Category
