
import { useState } from "react"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const navigation = [
      {
        label: "Clothing",
        children: [
          { label: "Dresses", href: "/women/dresses" },
          { label: "Tops", href: "/women/tops" },
          { label: "T-Shirts", href: "/women/t-shirts" },
          { label: "Shirts", href: "/women/shirts" },
          { label: "Jackets", href: "/women/jackets" },
        ],
      },
      {
        label: "Bottom Wear",
        children: [
          { label: "Jeans", href: "/women/jeans" },
          { label: "Trousers", href: "/women/trousers" },
          { label: "Leggings", href: "/women/leggings" },
          { label: "Skirts", href: "/women/skirts" },
        ],
      },
      {
        label: "Footwear",
        children: [
          { label: "Heels", href: "/women/heels" },
          { label: "Sneakers", href: "/women/sneakers" },
          { label: "Sandals", href: "/women/sandals" },
        ],
      },
      {
        label: "Accessories",
        children: [
          { label: "Handbags", href: "/women/handbags" },
          { label: "Jewelry", href: "/women/jewelry" },
          { label: "Watches", href: "/women/watches" },
          { label: "Sunglasses", href: "/women/sunglasses" },
        ],
      },

];

function NavMenuWomen() {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu  modal={false} open={open} onOpenChange={setOpen} className="">
       <DropdownMenuTrigger asChild>
              <button  className="flex items-center gap-1 outline-none focus:outline-none focus:ring-0" onMouseEnter={() => setOpen(true)}

                >Women{open ? <IoIosArrowUp /> : <IoIosArrowDown />} </button>
            </DropdownMenuTrigger>

<DropdownMenuContent  onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)} className="mt-5 absolute w-48 bg-white shadow-lg rounded-md z-10  ">
  <DropdownMenuGroup>
    {navigation.map((section) => (

 <DropdownMenuSub key={section.label}>
                <DropdownMenuSubTrigger className={"hover:bg-[#00000027]"}>
                  {section.label}
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent className=" ml-1.25 absolute w-48 bg-white shadow-lg rounded-md z-10  ">
                    {section.children.map((item) => (
                      <DropdownMenuItem
                        asChild className={"hover:bg-[#00000027]"}
                        key={item.label}
                      >
                        <Link href={`category${item.href}`}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
    ))}

  </DropdownMenuGroup>
</DropdownMenuContent>

    </DropdownMenu>
  )
}

export default NavMenuWomen






