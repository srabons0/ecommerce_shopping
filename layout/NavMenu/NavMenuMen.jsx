
import * as React from "react"
import { useState } from "react"
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
        label: "Top Wear",
        children: [
          { label: "T-Shirts", href: "/men/t-shirts" },
          { label: "Shirts", href: "/men/shirts" },
          { label: "Polo Shirts", href: "/men/polo-shirts" },
          { label: "Hoodies", href: "/men/hoodies" },
          { label: "Jackets", href: "/men/jackets" },
        ],
      },
      {
        label: "Bottom Wear",
        children: [
          { label: "Jeans", href: "/men/jeans" },
          { label: "Trousers", href: "/men/trousers" },
          { label: "Joggers", href: "/men/joggers" },
          { label: "Shorts", href: "/men/shorts" },
        ],
      },
      {
        label: "Footwear",
        children: [
          { label: "Sneakers", href: "/men/sneakers" },
          { label: "Casual Shoes", href: "/men/casual-shoes" },
          { label: "Sandals", href: "/men/sandals" },
        ],
      },
      {
        label: "Accessories",
        children: [
          { label: "Watches", href: "/men/watches" },
          { label: "Caps", href: "/men/caps" },
          { label: "Belts", href: "/men/belts" },
          { label: "Bags", href: "/men/bags" },
        ],
      },
];

function NavMenuMen() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu  modal={false}  open={open} onOpenChange={setOpen} className="">
 <DropdownMenuTrigger asChild>
        <button  className="flex items-center gap-1 outline-none focus:outline-none focus:ring-0" onMouseEnter={() => setOpen(true)}

          >Men{open ? <IoIosArrowUp /> : <IoIosArrowDown />} </button>
      </DropdownMenuTrigger>

<DropdownMenuContent  onMouseEnter={() => setOpen(true)}
    onMouseLeave={() => setOpen(false)} className="mt-5 absolute w-100 bg-white shadow-lg rounded-md z-10  ">
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

export default NavMenuMen






