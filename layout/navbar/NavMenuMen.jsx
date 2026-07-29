"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import MegaMenu from "./MegaMenu";

export default function NavMenuMen({ subCategory }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };


  const menNav = subCategory.filter((i)=> i.gender === "men")

  return (
    <div className="" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        className={`
          group
          flex
          items-center
          gap-1
          rounded-full
          px-4
          py-2
          text-sm
          font-medium
          transition-all
          duration-300
          ${
            open
              ? "bg-gray-700 text-white"
              : "text-white hover:bg-zinc-100 hover:text-black"
          }
        `}
      >
        Men
        <ChevronDown
          size={16}
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      <MegaMenu open={open} sections={menNav} title="Men's Collection" />
    </div>
  );
}
