"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoFilter } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SalesSidebar({ category, gender, filters }) {
  const [collapsed, setCollapsed] = useState(true);
  const [priceValue, setPriceValue] = useState(9999);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [subCategories, setSubCategories] = useState(() =>
    filters.cat ? filters.cat.split(",") : [],
  );
  const [sizes, setSizes] = useState(() =>
    filters.size ? filters.size.split(",") : [],
  );
  const [colors, setColors] = useState(() =>
    filters.colors ? filters.colors.split(",") : [],
  );
  const [ratings, setRatings] = useState(() =>
    filters.ratings ? filters.ratings : [],
  );
  const [discount, setDiscount] = useState(() =>
    filters.discount ? filters.discount : [],
  );
  useEffect(() => {
    const checkScreen = () => {
      setCollapsed(!(window.innerWidth >= 1024));
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("cat", subCategories.toString());
    params.set("price", priceValue);
    params.set("size", sizes.toString());
    params.set("colors", colors.toString());
    params.set("ratings", ratings);
    params.set("discount", discount);
    params.set("page", 1);
    router.push(`${pathname}?${params}`);
    document.getElementById("productScroll")?.scrollIntoView({
      top: 0,
      behavior: "smooth",
      block: "start",
    });
  };

  const handleClearFilters = async () => {
    setSubCategories([]);
    setSizes([]);
    setColors([]);
    setRatings([]);
    setDiscount([]);
    setPriceValue(9999);

    const params = new URLSearchParams(searchParams);
    params.delete("cat");
    params.delete("price");
    params.delete("size");
    params.delete("colors");
    params.delete("ratings");
    params.delete("discount");
    params.set("page", 1);
    router.push(`${pathname}?${params}`);
    document.getElementById("productScroll")?.scrollIntoView({
      top: 0,
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubCategoriesChange = (value) => {
    setSubCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSizeChange = (value) => {
    setSizes((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };
  const handleColorChange = (value) => {
    setColors((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };
  const handleRatingChange = (value) => {
    setRatings((prev) => (prev.includes(value) ? [] : [value]));
  };

  const handleDiscountChange = (value) => {
    setDiscount((prev) => (prev.includes(value) ? [] : [value]));
  };
  const colorFilter = [...new Set(category.flatMap((i) => i.colors))];

  return (
    <div className="relative">
      <div
        className={`absolute flex lg:relative ${collapsed ? "w-0" : "w-87"} `}
      >
        <div className="fixed top-0 left-0 z-160 flex h-dvh text-white lg:sticky lg:top-67 lg:h-auto">
          <Sidebar
            className="my-sidebar-scroll z-150 h-full max-h-dvh overflow-y-auto pt-10 lg:max-h-245"
            collapsed={collapsed}
            width="350px"
            collapsedWidth="0px"
            rootStyles={{
              backgroundColor: "#000",
              border: "none",
              ".ps-sidebar-container": {
                backgroundColor: "#000",
                height: "100%",
                overflowY: "auto",
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              },
              ".menuItem .ps-menu-button": {
                minHeight: "28px",
                height: "28px",
                padding: "2px 12px",
                backgroundColor: "#000",
              },
              ".ps-menu-button": {
                backgroundColor: "#000",
              },
            }}
          >
            <div className="border-b border-gray-300 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="text-2xl uppercase">Filters</div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onClick={() => setCollapsed(!collapsed)}
                  className="mt-2 ml-1 h-10 rounded border-2 border-[#ffffff40] px-2 py-1 text-white"
                >
                  <MdFilterListOff className="h-5 w-5" />
                </motion.button>
              </div>
              <div className="mt-15 mb-5 flex items-center justify-between gap-2">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="border border-white bg-[#060606] px-3 py-1 text-white hover:bg-[#3e3e3e]"
                  onClick={handleSearch}
                >
                  Search
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="border border-red-600 bg-[#FF4D4D] px-3 py-1 hover:bg-[#cc0000]"
                  onClick={handleClearFilters}
                >
                  Clear All
                </motion.button>
              </div>
            </div>
            <Menu
              menuItemStyles={{
                button: {
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                },
              }}
            >
              <SubMenu label="Price" defaultOpen>
                <MenuItem>
                  <div className="w-full max-w-full pr-2">
                    <input
                      type="range"
                      min={0}
                      max="9999"
                      value={priceValue}
                      className="range w-full accent-white"
                      step="25"
                      onChange={(e) => setPriceValue(e.target.value)}
                    />
                    <div>TK: 0 - {priceValue}</div>
                  </div>
                </MenuItem>
              </SubMenu>

              <SubMenu
                label="DISCOUNT %"
                defaultOpen
                className="mt-5 border-t border-gray-300"
              >
                {[
                  {
                    discount: "10%+ off",
                    v: 10,
                  },
                  {
                    discount: "20%+ off",
                    v: 20,
                  },
                  {
                    discount: "30%+ off",
                    v: 30,
                  },
                  {
                    discount: "40%+ off",
                    v: 40,
                  },
                  {
                    discount: "50%+ off",
                    v: 50,
                  },
                ].map((s) => (
                  <MenuItem className="menuItem" key={s.discount}>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={discount.includes(s.v)}
                        onChange={() => handleDiscountChange(s.v)}
                      />
                      <span className="text-lg font-medium">{s.discount}</span>
                    </label>
                  </MenuItem>
                ))}
              </SubMenu>

              <SubMenu
                label="CATEGORY"
                defaultOpen
                className="mt-5 border-t border-gray-300"
              >
                <div className="grid grid-cols-2 bg-black">
                  {category
                    .filter((item) => item.gender === gender)
                    .map((s, i) => (
                      <MenuItem key={i} className="menuItem">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={subCategories.includes(s.slug)}
                            onChange={() => handleSubCategoriesChange(s.slug)}
                          />
                          <span className="text-lg font-medium wrap-break-word whitespace-normal">
                            {s.name}
                          </span>
                        </label>
                      </MenuItem>
                    ))}
                </div>
              </SubMenu>
              <SubMenu
                label="SIZE"
                defaultOpen
                className="mt-5 border-t border-gray-300"
              >
                <MenuItem
                  className="menuItem bg-black py-3"
                  component={<div />}
                >
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeChange(size)}
                        className={`rounded border px-2 py-1 text-xs transition ${
                          sizes.includes(size)
                            ? "border-blue-500 bg-white text-black"
                            : "border-gray-300 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="COLOR"
                defaultOpen
                className="mt-5 border-t border-gray-300"
              >
                <MenuItem
                  className="menuItem h-15 bg-black py-3"
                  component={<div />}
                >
                  <div className="flex flex-wrap gap-2">
                    {colorFilter.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => handleColorChange(color)}
                        type="button"
                        value={color}
                        className={`h-5 w-5 rounded border-2 transition ${
                          colors.includes(color)
                            ? "border-white outline-2 outline-offset-2 outline-white"
                            : "border-neutral-600"
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </MenuItem>
              </SubMenu>
              <SubMenu
                label="RATING"
                defaultOpen
                className="mt-5 border-t border-gray-300"
              >
                <MenuItem
                  className="menuItem h-25 bg-black py-8"
                  component={<div />}
                >
                  <div className="flex flex-col gap-2">
                    {[5, 4, 3].map((rating) => (
                      <label
                        key={rating}
                        className="gap-.5 flex cursor-pointer items-center"
                      >
                        <input
                          type="checkbox"
                          checked={ratings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                          className="mr-2"
                        />
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={`h-3.5 w-3.5 ${i < rating ? "text-yellow-600" : "text-gray-400"}`}
                          />
                        ))}
                        <span className="ml-2 flex items-center gap-1 text-sm font-medium">
                          {" "}
                          {rating}
                        </span>
                      </label>
                    ))}
                  </div>
                </MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
        </div>
        <div className="absolute h-14.5 w-full bg-black pt-1">
          {" "}
          <motion.button
            initial={{ x: -400 }}
            animate={{
              x: collapsed ? 0 : -400,
            }}
            transition={
              collapsed
                ? {
                    type: "spring",
                    stiffness: 220,
                    damping: 25,
                    delay: 0.5,
                    duration: 0.5,
                  }
                : {
                    duration: 0.2,
                  }
            }
            exit={{ opacity: 0 }}
            className="mt-2 ml-1 h-10 rounded border-2 border-[#0f0f0f40] bg-white px-2 py-1 text-black"
            onClick={() => setCollapsed(!collapsed)}
          >
            <IoFilter className="h-5 w-5" />
          </motion.button>
        </div>{" "}
      </div>
    </div>
  );
}

export default SalesSidebar;
