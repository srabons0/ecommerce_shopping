"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const CATS = [
  { gender: "men" },
  { gender: "women" },
  { gender: "universal" },
  { gender: "couple" },
];

function SalesCategory({ category, subCategory, gender, subCat }) {
  const router = useRouter();
  const filterItems = category.filter(
    (item) => !CATS.some((g) => g.gender === item.gender),
  );
  const catGender = [...CATS, ...filterItems];

  return (
    <div className="bg-black">
      <div className="flex gap-3 border-b border-zinc-800 bg-black px-4 py-3 lg:hidden">
        <div className="flex-1">
          <label className="mb-1 block text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            Category
          </label>

          <select
            value={gender}
            onChange={(e) => {
              const selectedGender = e.target.value;

              const firstSubCategory = subCategory.find(
                (item) => item.gender === selectedGender,
              );

              if (firstSubCategory) {
                router.push(
                  `/shop/${selectedGender}/${firstSubCategory.slug}/newest`,
                );
              }
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold tracking-widest text-white uppercase transition outline-none focus:border-red-500 lg:hidden"
          >
            {catGender.map((c) => (
              <option
                key={c.gender}
                value={c.gender}
                className="bg-zinc-900 text-white"
              >
                {c.gender.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="mb-1 block text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            Sub Category
          </label>

          <select
            value={subCat}
            onChange={(e) => {
              const selected = subCategory.find(
                (item) => item.slug === e.target.value,
              );

              if (selected) {
                router.push(`/shop/${selected.gender}/${selected.slug}/newest`);
              }
            }}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-3 text-sm font-medium text-white transition outline-none focus:border-red-500"
          >
            {subCategory
              .filter((item) => item.gender === gender)
              .map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="hidden flex-1 border-b border-zinc-800 bg-black/95 px-5 pb-2 backdrop-blur-md lg:block">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="scrollbar-hide flex overflow-x-auto px-2 whitespace-nowrap lg:px-0">
            {catGender.map((c) => (
              <Link
                key={c.gender}
                href={`/shop/${
                  c.gender
                }/${subCategory.find((items) => items.gender === c.gender)?.slug}/newest`}
                className={`shrink-0 border-b-2 px-3 pt-3 pb-1 font-['Bebas_Neue'] text-sm text-[15px] tracking-[0.15em] transition-all duration-300 ${
                  gender === c.gender
                    ? "border-red-600 text-red-500"
                    : "border-transparent text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {c.gender.toUpperCase()}
              </Link>
            ))}
          </div>
          <div className="hidden flex-1 lg:block" />

          <div className="scrollbar-hide flex overflow-x-auto border-t border-zinc-800 px-2 whitespace-nowrap lg:border-0 lg:px-0">
            {subCategory
              .filter((item) => item.gender === gender)
              .map((s) => (
                <Link
                  href={`/shop/${s.gender}/${s.slug}/newest`}
                  key={s.name}
                  onClick={() => toggleSub(s.name)}
                  className={`shrink-0 border-b-2 px-3 pt-3 pb-1 font-mono text-xs text-[10px] font-bold tracking-[0.18em] transition-all duration-300 ${
                    subCat === s.slug
                      ? "border-red-600 text-red-500"
                      : "border-transparent text-zinc-400 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {s.name.toUpperCase()}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesCategory;
