import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import ShopCategory from "@/features/shop/ShopCategory";
import ShopHeader from "@/features/shop/ShopHeader";
import Navbar from "@/features/layout/Navbar";
import CollectionsHeader from "@/features/collection/CollectionsHeader";
import CollectionIndex from "@/features/collection/CollectionIndex";
import CollectionShowcase from "@/features/collection/CollectionShowcase";
import CollectionBody from "@/features/collection/CollectionBody";
import CollectionNews from "@/features/collection/CollectionNews";

export default function Layout({ children }) {

  return (
    <>
      <Navbar></Navbar>
      {/* <CollectionsHeader></CollectionsHeader> */}
<CollectionIndex></CollectionIndex>
<CollectionBody></CollectionBody>
<CollectionShowcase></CollectionShowcase>
<CollectionNews></CollectionNews>
      {children}
    </>
  );
}
