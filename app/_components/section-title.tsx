import { ComponentProps } from 'react'

const SectionTitle = ({ children }: ComponentProps<'p'>) => {
  return <p className="font-bold uppercase">{children}</p>
}

export default SectionTitle
