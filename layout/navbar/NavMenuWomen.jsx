"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import MegaMenu from "./MegaMenu";

export default function NavMenuWomen({ subCategory }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 180);
  };
  const womenNav = subCategory.filter((i) => i.gender === "women");

  return (
    <div className="" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        className={`group flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
          open
            ? "bg-gray-700 text-white"
            : "text-white hover:bg-zinc-100 hover:text-black"
        }`}
      >
        Women
        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      <MegaMenu open={open} sections={womenNav} title="Women's Collection" />
    </div>
  );
}
