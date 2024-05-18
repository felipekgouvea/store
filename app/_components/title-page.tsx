import { Badge } from '@/app/_components/ui/badge'
import { ShapesIcon } from 'lucide-react'

interface TitlePage {
  title: string
}

const TitlePage = ({ title }: TitlePage) => {
  return (
    <Badge
      variant="outline"
      className="w-fit gap-1 border-2 border-primary px-3 py-1 text-base font-bold uppercase"
    >
      <ShapesIcon size={16} />
      {title}
    </Badge>
  )
}

export default TitlePage
