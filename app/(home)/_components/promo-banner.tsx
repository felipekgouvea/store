import Image, { ImageProps } from 'next/image'

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      alt={alt}
      width={0}
      height={0}
      sizes="100vh"
      quality={100}
      className="h-auto w-full object-contain"
      {...props}
    />
  )
}

export default PromoBanner
