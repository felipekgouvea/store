import { CarrotIcon, MenuIcon, ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return ( 
    <div className="flex items-center justify-around min-h-[85px] max-h-85px border-b border-muted">
      <Button size="icon" variant="outline">
        <MenuIcon size={16}/>
      </Button>
        <Image src="/logo.png" alt="Logo da Loja" width={92} height={27}/>
      <Button size="icon" variant="outline">
        <ShoppingCartIcon size={16}/>
      </Button>
    </div>
   );
}
 
export default Header;