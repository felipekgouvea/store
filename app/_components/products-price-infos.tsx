import { useContext } from 'react'
import { formatCurrency } from '../_helpers/price'
import { Separator } from './ui/separator'
import { CartContext } from '@/app/_context/cart'

const ProductsPriceInfo = () => {
  const { subtotal, totalDiscount, total } = useContext(CartContext)
  return (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">SubTotal</span>
        <span>{formatCurrency(Number(subtotal))}</span>
      </div>
      <Separator />

      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Taxa de Entrega</span>
        <span className="uppercase">Grátis</span>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Descontos</span>
        <span className="font-semibold uppercase text-primary">
          - {formatCurrency(totalDiscount)}
        </span>
      </div>
      <Separator />
      <div className="flex justify-between">
        <span className="text-sm font-semibold">Total</span>
        <span className="text-sm font-semibold">{formatCurrency(total)}</span>
      </div>
    </>
  )
}

export default ProductsPriceInfo
