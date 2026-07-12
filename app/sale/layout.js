
import Navbar from "@/features/layout/Navbar";
import SalesBanner from "@/features/sales/SalesBanner";
import SalesCategory from "@/features/sales/SalesCategory";
import SalesHeader from "@/features/sales/SalesHeader";
const C = {
  black: "#080808",
  dark: "#111111",
  card: "#161616",
  border: "#242424",
  mid: "#2e2e2e",
  grey: "#666666",
  light: "#aaaaaa",
  white: "#F5F5F5",
  lime: "#E8FF47",
  limeD: "#c8df20",
  coral: "#FF4D4D",
  coralD: "#cc2222",
  cyan: "#47E8FF",
  fire: "#FF6B00",
  gold: "#FFB800",
  purple: "#9747FF",
  green: "#22c55e",
};

export default function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <SalesHeader C={C}></SalesHeader>
      <SalesCategory C={C}></SalesCategory>
      <SalesBanner C={C}></SalesBanner>
      {children}
    </>
  );
}
