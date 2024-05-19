import { Badge } from '@/app/_components/ui/badge'
import { CATEGORY_ICON } from '../constants/category-icon'

interface TitlePage {
  title: string
  slug?: string
}

const TitlePage = ({ title, slug }: TitlePage) => {
  return (
    <Badge
      variant="outline"
      className="w-fit gap-1 border-2 border-primary px-3 py-1 text-base font-bold uppercase"
    >
      {CATEGORY_ICON[slug as keyof typeof CATEGORY_ICON]}
      {title}
    </Badge>
  )
}

export default TitlePage
