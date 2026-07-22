
import * as React from "react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
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
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const navigation = [
  {
    label: "Fashion",
    children: [
      { label: "Hoodies", href: "/unisex/hoodies" },
      { label: "Sneakers", href: "/unisex/sneakers" },
      { label: "Accessories", href: "/unisex/accessories" },
    ],
  },
  {
    label: "Lifestyle",
    children: [
      { label: "Travel Essentials", href: "/lifestyle/travel-essentials" },
      { label: "Gym Essentials", href: "/lifestyle/gym-essentials" },
      { label: "Everyday Wear", href: "/lifestyle/everyday-wear" },
    ],
  },
  {
    label: "Couples",
    children: [
      {
        label: "T-Shirts",
        href: "/couples/t-shirts",
      },
      {
        label: "Hoodies",
        href: "/couples/hoodies",
      },
      {
        label: "Shirts",
        href: "/couples/shirts",
      },
    ],
  },
];

function NavMenuUniversal() {
   const [open, setOpen] = useState(false);
  return (
    <DropdownMenu  modal={false} open={open} onOpenChange={setOpen} className="">
      <DropdownMenuTrigger asChild>
        <button  className="flex items-center gap-1 outline-none focus:outline-none focus:ring-0" onMouseEnter={() => setOpen(true)}

          >Universal{open ? <IoIosArrowUp /> : <IoIosArrowDown />} </button>
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
                  <DropdownMenuSubContent className=" ml-1.25 absolute w-48 bg-white shadow-lg rounded-md z-10 -top-1 ">
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

export default NavMenuUniversal;
