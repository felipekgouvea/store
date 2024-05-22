import { CartContext } from '@/app/_context/cart'
import { useContext, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import CartItem from './cart-item'
import { ScrollArea } from '../ui/scroll-area'
import { createOrder } from '@/api/create-order'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import ProductsPriceInfo from '../products-price-infos'

interface CartProps {
  setIsOpenCart: (isOpen: boolean) => void
}

const Cart = ({ setIsOpenCart }: CartProps) => {
  const { products, clearCart } = useContext(CartContext)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const { data } = useSession()
  const router = useRouter()

  const handleFinshOrderClick = async () => {
    if (!data?.user) return

    try {
      await createOrder(products, (data.user as any).id)

      clearCart()
      setIsOpenCart(false)
      router.push('/orders')

      toast('Pedido realizado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto  space-y-4 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-8">
                  {products.map((product) => (
                    <CartItem cartProduct={product} key={product.id} />
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="mb-3 mt-6">
              <Card>
                <CardContent className="space-y-3 p-5">
                  <ProductsPriceInfo />
                </CardContent>
              </Card>
              <Button
                className="mb-4 mt-4 w-full p-4"
                onClick={() => setIsConfirmDialogOpen(true)}
              >
                {' '}
                Finalizar Pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="font-semibold">Seu carrinho está vazio.</h2>
        )}
      </div>
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termo e condições da
              nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="w-full border border-muted-foreground">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full border border-muted-foreground"
              onClick={handleFinshOrderClick}
            >
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Cart
