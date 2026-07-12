// import { Button } from "@/components/ui/button"
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

const navigation = [
  {
    label: "Men",
    children: [
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
    ],
  },

  {
    label: "Women",
    children: [
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
    ],
  },

  {
    label: "Universal",
    children: [
      {
        label: "Fashion",
        children: [
          { label: "Hoodies", href: "/unisex/hoodies" },
          { label: "Sneakers", href: "/unisex/sneakers" },
          { label: "Accessories", href: "/unisex/accessories" },
        ],
      },
    ],
  },
];

function NavMenu({}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button >Shop</button>
      </DropdownMenuTrigger>

<DropdownMenuContent className="mt-5">
  <DropdownMenuGroup>
    {navigation.map((section) => (
      <DropdownMenuSub key={section.label}>
        <DropdownMenuSubTrigger>
          {section.label}
        </DropdownMenuSubTrigger>

        <DropdownMenuPortal>
          <DropdownMenuSubContent className="w-48">
            {section.children.map((group) => (
              <DropdownMenuSub key={group.label}>
                <DropdownMenuSubTrigger>
                  {group.label}
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48">
                    {group.children.map((item) => (
                      <DropdownMenuItem
                        asChild
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
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    ))}
  </DropdownMenuGroup>
</DropdownMenuContent>
      
    </DropdownMenu>
  )
}

export default NavMenu






