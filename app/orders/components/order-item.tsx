import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/_components/ui/accordion'
import { Card } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import OrderProductItem from './order.product-item'
import { getOrderStatus } from '@/app/_helpers/order-status'
import { formatCurrency } from '@/app/_helpers/price'
import { useMemo } from 'react'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  }>
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      )
    }, 0)
  }, [order.orderProducts])

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc +
        (Number(orderProduct.product.basePrice) -
          (Number(orderProduct.product.basePrice) *
            Number(orderProduct.product.discountPercentage)) /
            100) *
          orderProduct.quantity
      )
    }, 0)
  }, [order.orderProducts])

  const totalDiscount = subtotal - total

  return (
    <Card>
      <Accordion type="single" collapsible className="px-5 hover:no-underline">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="">
              <h2 className="text-left text-xs">
                Pedido com {order.orderProducts.length} produto(s)
              </h2>
              <span className="text-xs opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold">STATUS</p>
                <p className="font-bold uppercase text-primary">
                  {getOrderStatus(order.status)}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold ">Data</p>
                <p className="opacity-60">
                  {format(order.createdAt, 'd/MM/y')}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold">Pagamento</p>
                <p className="opacity-60">Cartão</p>
              </div>
            </div>
            <div className="mb-5 mt-5">
              <Separator />
            </div>
            <div className="flex flex-col gap-5">
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  orderProduct={orderProduct}
                  key={orderProduct.id}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
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
                <span className="text-sm font-semibold">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem
