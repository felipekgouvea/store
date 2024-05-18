'use client'

import { MenuIcon, ShoppingCartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <div className="max-h-85px flex min-h-[85px] w-full items-center justify-between border-b border-muted px-5">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon size={16} />
        </Button>
        <Link href="/">
          <Image src="/logo.png" alt="Logo da Loja" width={92} height={27} />
        </Link>
        <Button size="icon" variant="outline">
          <ShoppingCartIcon size={16} />
        </Button>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Header
