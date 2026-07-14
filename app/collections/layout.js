import Navbar from "@/features/layout/Navbar";


export default function Layout({ children }) {

  return (
    <>
      <Navbar></Navbar>
      {/* <CollectionsHeader></CollectionsHeader> */}

      {children}
    </>
  );
}
