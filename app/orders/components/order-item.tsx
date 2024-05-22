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
  return (
    <Card>
      <Accordion type="single" collapsible className="px-5 hover:no-underline">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="">
              Pedido com {order.orderProducts.length} produto(s)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-bold">STATUS</p>
                <p className="font-bold text-primary uppercase">{getOrderStatus(order.status)}</p>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export default OrderItem
