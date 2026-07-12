import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ShopCategory from "@/features/shop/ShopCategory";
import ShopHeader from "@/features/shop/ShopHeader";
import Navbar from "@/features/layout/Navbar";

export default function Layout({ children }) {

  return <>
          <Navbar></Navbar>
      {/* <ShopPage></ShopPage> */}
      <ShopHeader></ShopHeader>
   {children}

    </>;
}
