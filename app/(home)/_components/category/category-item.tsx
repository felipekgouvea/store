import { Badge } from '@/app/_components/ui/badge'
import { CATEGORY_ICON } from '@/app/constants/category-icon'
import { Category } from '@prisma/client'
import Link from 'next/link'

interface CategoryItamProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItamProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="flex items-center justify-center gap-2 rounded-[10px] border border-muted py-3"
      >
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span className="text-xs font-bold">{category.name}</span>
      </Badge>
    </Link>
  )
}

export default CategoryItem
