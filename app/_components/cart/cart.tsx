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
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import CartItem from './cart-item'

interface CartProps {
  setIsOpenCart: (isOpen: boolean) => void
}

const Cart = ({ setIsOpenCart }: CartProps) => {
  const { products } = useContext(CartContext)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleFinshOrderClick = async () => {
    setIsOpenCart(false)
  }

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem cartProduct={product} key={product.id} />
              ))}
            </div>

            <div className="mb-3 mt-6">
              <Card>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">SubTotal</span>
                    <span></span>
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Taxa de Entrega
                    </span>
                    <span className="uppercase">Grátis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="text-sm font-semibold"></span>
                  </div>
                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span className="font-semibold uppercase text-primary"></span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Total do Pedido com desconto
                    </span>
                    <span className="text-sm font-semibold uppercase"></span>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="mt-6 w-full p-6"
                onClick={() => setIsConfirmDialogOpen(true)}
              >
                {' '}
                Finalizar Pedido
              </Button>
            </div>
          </>
        ) : (
          <h2 className="font-semibold">Sua sacola está vazia.</h2>
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
