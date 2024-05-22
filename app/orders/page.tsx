import TitlePage from '../_components/title-page'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import OrderItem from './components/order-item'

const OrdersPage = async () => {
  const user = getServerSession(authOptions)

  if (!user) {
    return <p>Acess Denied</p>
  }

  const orders = await db.order.findMany({
    where: {
      userId: (user as any).id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })

  return (
    <div className="flex flex-col gap-4 px-5">
      <div className="mt-4">
        <TitlePage title="Página de Pedidos" slug="orders" />
      </div>

      <div className="mb-20 flex flex-col gap-4">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order}></OrderItem>
        ))}
      </div>
    </div>
  )
}

export default OrdersPage
