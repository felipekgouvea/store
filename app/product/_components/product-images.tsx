'use client'

import { Button } from '@/app/_components/ui/button'
import Image from 'next/image'
import { useState } from 'react'

interface ProdcutImagensProps {
  imageUrls: string[]
  name: string
}

const ProductImagens = ({ imageUrls, name }: ProdcutImagensProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  return (
    <div>
      <div className="flex h-[380px] w-full items-center justify-center bg-accent">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="mt-8 flex gap-4 px-5">
        {imageUrls.map((imageUrl) => (
          <Button
            onClick={() => handleImageClick(imageUrl)}
            key={imageUrl}
            className={`h-[80px] bg-accent hover:bg-accent ${imageUrl === currentImage && 'border-2 border-solid border-primary'}`}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[100%] w-auto max-w-[100%]"
              style={{ objectFit: 'contain' }}
            />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ProductImagens
