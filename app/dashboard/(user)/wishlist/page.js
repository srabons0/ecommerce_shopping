"use client";
import ProductModal from "@/components/shared/ProductModal";
import DashboardNavbar from "@/features/user/DashboardNavbar/DashboardNavbar";
import WishlistPage from "@/features/user/wishlist/WishlistPage";
import { useState } from "react";

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openView = (product) => {
    setSelectedProduct(product);
  };
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <div className="min-h-screen bg-zinc-50">
      <DashboardNavbar
        path="Wishlist"
        name="Wishlist"
        desc="Save your favorites and revisit them anytime"
      />
      <WishlistPage openView={openView}></WishlistPage>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}
