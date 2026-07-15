"use client";

import Link from "next/link";

const CATS = [
  { gender: "men" },
  { gender: "women" },
  { gender: "universal" },
  { gender: "couple" },
];

function SalesCategory({ category, subCategory, gender, subCat }) {
  const filterItems = category.filter(
    (item) => !CATS.some((g) => g.gender === item.gender),
  );
  const catGender = [...CATS, ...filterItems];

  return (
    <div className="bg-black pt-5">
      <div className="max-w-full mx-auto bg-black px-10 flex gap-0">
        {catGender.map((c) => (
          <Link
            key={c.gender}
            href={`/sale/${c.gender}/${subCategory.find((items) => items.gender === c.gender)?.slug}/newest`}
            onClick={() => {
              document.getElementById("productScroll")?.scrollIntoView({
                top: 0,
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`px-3 py-3 border-b-2 text-[15px] tracking-widest shrink-0 transition-all font-['Bebas_Neue']
          ${
            gender === c.gender
              ? "border-red-600 text-red-600"
              : "border-black text-white"
          }`}
          >
            {c.gender.toUpperCase()}
          </Link>
        ))}

        <div className="flex-1" />

        <div className="flex gap-0 overflow-x-auto">
          {subCategory
            .filter((item) => item.gender === gender)
            .map((s) => (
              <Link
                href={`/sale/${s.gender}/${s.slug}/newest`}
                key={s.name}
                onClick={() => {
                  document.getElementById("productScroll")?.scrollIntoView({
                    top: 0,
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`px-3 pt-3 border-b-2 text-[10px] tracking-widest shrink-0 transition-all font-mono font-bold
            ${
              subCat === s.slug
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-400"
            }`}
              >
                {s.name.toUpperCase()}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SalesCategory;
