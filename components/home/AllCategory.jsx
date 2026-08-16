import Image from "next/image";
import Link from "next/link";

export default function AllCategory({ category, subCategory }) {
  return (
    <section id="collections" className="bg-white py-10 lg:py-24 text-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <div className="inline-flex items-center justify-center gap-3 text-[9px] lg:text-xs uppercase tracking-[0.3em] text-[#ff4747]">
            <span className="block h-px w-12 bg-[#ff4747]" />
            Collections
            <span className="block h-px w-12 bg-[#ff4747]" />
          </div>
          <div className="space-y-3  ">
            <h2 className="text-4xl uppercase font-semibold tracking-tight sm:text-5xl mb-5">
              Explore Categories
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Discover curated collections designed to elevate your wardrobe and
              daily essentials.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-2 lg:grid-cols-6 grid-cols-3 lg:grid-rows-[280px_220px]">
          {category.map((category, index) => {
            const categoryByGender = subCategory?.find(
              (item) => item.gender === category.slug,
            );
            const spanClass =
              index === 0
                ? "lg:col-span-2 lg:row-span-2 "
                : index === 1
                  ? "lg:col-span-2 col-span-2"
                  : index === 2
                    ? "lg:col-span-2  col-span-2 lg:row-span-2"
                    : index === 3
                      ? "lg:col-span-2"
                      : index === 4
                        ? "lg:col-span-1 col-span-3"
                        : "lg:col-span-1";

            return (
              <Link
                key={index}
                href={`/shop/${categoryByGender?.gender}/${categoryByGender?.slug}/newest`}
                className={`group relative overflow-hidden  border border-white/10 bg-slate-900/70 shadow-2xl shadow-slate-950/20 transition duration-300 hover:-translate-y-1  h-20 md:h-40 lg:h-full
                  hover:border-2 hover:border-white/30 ${spanClass}`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 lg:p-6">

                  <h3 className="mt-3 text-[10px] md:text-lg lg:text-2xl font-semibold tracking-tight text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
