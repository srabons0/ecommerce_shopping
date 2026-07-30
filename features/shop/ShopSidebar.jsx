"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { IoFilter } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ShopSidebar({ category, gender, filters }) {
  const [collapsed, setCollapsed] = useState(false);
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
  const [inStock, setInStock] = useState(() =>
    filters.inStock === "true" ? filters.inStock : false,
  );
  const [onSale, setOnSale] = useState(() =>
    filters.onSale === "true" ? filters.onSale : false,
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("cat", subCategories.toString());
    params.set("price", priceValue);
    params.set("size", sizes.toString());
    params.set("colors", colors.toString());
    params.set("ratings", ratings);
    params.set("inStock", inStock);
    params.set("onSale", onSale);
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
    setInStock(false);
    setOnSale(false);
    setPriceValue(9999);

    const params = new URLSearchParams(searchParams);
    params.delete("cat");
    params.delete("price");
    params.delete("size");
    params.delete("colors");
    params.delete("ratings");
    params.delete("inStock");
    params.delete("onSale");
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

  const colorFilter = [...new Set(category.flatMap((i) => i.colors))];

  return (
    <div className={`flex absolute lg:relative ${collapsed ? "w-0" : "w-87"} `}>
      <div className="sticky top-67 left-0 h-screen flex z-50 text-white ">
        <Sidebar
          className={`lg:h-245 pt-10 my-sidebar-scroll z-100`}
          collapsed={collapsed}
          width="350px"
          collapsedWidth="0px"
          rootStyles={{
            backgroundColor: "#000",
            border: "none",
            ".ps-sidebar-container": {
              backgroundColor: "#000",
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
          <div className=" p-4 border-b border-gray-300">
            <div className="flex items-center justify-between gap-2">
              <div className="text-2xl uppercase">Filters</div>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => setCollapsed(!collapsed)}
                className="h-10 rounded text-white border-2 mt-2 ml-1 border-[#ffffff40] px-2 py-1 "
              >
                <MdFilterListOff className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex justify-between items-center gap-2 mt-15 mb-5">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="border bg-[#060606] hover:bg-[#3e3e3e] text-white px-3 py-1 border-white"
                onClick={handleSearch}
              >
                Search
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="border bg-[#FF4D4D] hover:bg-[#cc0000] px-3 py-1 border-red-600"
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
                <div className="w-full max-w-full  pr-2">
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
              label="AVAILABILITY"
              defaultOpen
              className="border-t mt-5 border-gray-300"
            >
              {[
                {
                  item: "In Stock Only",
                  v: inStock,
                  fn: () => setInStock((prev) => !prev),
                },
                {
                  item: "On Sale",
                  v: onSale,
                  fn: () => setOnSale((prev) => !prev),
                },
              ].map((s) => (
                <MenuItem className="menuItem" key={s.item}>
                  <label className="flex  cursor-pointer items-center gap-2">
                    <input type="checkbox" checked={s.v} onChange={s.fn} />
                    <span className="text-lg font-medium">{s.item}</span>
                  </label>
                </MenuItem>
              ))}
            </SubMenu>

            <SubMenu
              label="CATEGORY"
              defaultOpen
              className=" border-t mt-5 border-gray-300"
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
              className="border-t mt-5 border-gray-300"
            >
              <MenuItem className="menuItem py-3  bg-black" component={<div />}>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeChange(size)}
                      className={`rounded border transition py-1 px-2 text-xs
                            ${
                              sizes.includes(size)
                                ? "bg-white text-black border-blue-500"
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
              className="border-t mt-5 border-gray-300"
            >
              <MenuItem
                className="bg-black py-3 menuItem h-15"
                component={<div />}
              >
                <div className="flex flex-wrap gap-2">
                  {colorFilter.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorChange(color)}
                      type="button"
                      value={color}
                      className={`rounded w-5  h-5   border-2 transition
                            ${
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
              className="border-t mt-5 border-gray-300"
            >
              <MenuItem
                className=" py-8 bg-black menuItem h-25"
                component={<div />}
              >
                <div className="flex flex-col gap-2">
                  {[5, 4, 3].map((rating) => (
                    <label
                      key={rating}
                      className="flex cursor-pointer items-center gap-.5"
                    >
                      <input
                        type="checkbox"
                        checked={ratings.includes(rating)}
                        onChange={() => handleRatingChange(rating)}
                        className=" mr-2"
                      />
                      {Array.from({ length: 5 }, (_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-600" : "text-gray-400"}`}
                        />
                      ))}
                      <span className=" ml-2 text-sm font-medium flex items-center gap-1">
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
      <div className="bg-black w-full h-14.5 pt-1 absolute">
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
          className="h-10 rounded text-black bg-white border-2 mt-2 ml-1 border-[#0f0f0f40] px-2 py-1 "
          onClick={() => setCollapsed(!collapsed)}
        >
          <IoFilter className="w-5 h-5" />
        </motion.button>
      </div>{" "}
    </div>
  );
}

export default ShopSidebar;
