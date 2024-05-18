import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CatalogItem {
  category: Category
}

const CatalogItem = ({ category }: CatalogItem) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        {/* IMAGEM */}
        <div className="flex h-[160px] min-h-[160px] w-full items-center justify-center rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-[#5033C3] to-[rgba(80,51,195,0.20)]">
          <Image
            src={category.imageUrl}
            alt={category.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* TITULO */}
        <div className="rounded-bl-lg rounded-br-lg bg-accent py-3">
          <p className="text-center text-sm font-bold">{category.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default CatalogItem
