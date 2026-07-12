"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function AllProduct() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data.products);
      });
  }, []);

  return (
    //     <div>
    //       <h1>All Products</h1>
    //       <div className="">
    //         {data.slice(0,1).map((product, i) => (
    //           // <div className="" key={i}>
    //           //   <div>{i+1}{data.name}</div>
    //           //   <Image src={data.variants[0].images} alt="" width={100} height={100}/>
    //           // </div>
    //             <div key={i} className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 antialiased">
    //   {/* Main Product Section */}
    //   <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-8 lg:p-12">

    //     {/* Left Column: Media Gallery */}
    //     <div className="space-y-4 sticky top-8">
    //       <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 aspect-[4/5] relative group">
    //         <Image
    //           src={product.thumbnail}
    //           alt={product.name}
    //           fill
    //           className="object-cover object-center w-full h-full transition duration-500 group-hover:scale-102"
    //           priority
    //         />
    //       </div>

    //       {/* Thumbnail Strips */}
    //       <div className="grid grid-cols-4 gap-3">
    //         {product.images.map((img, index) => (
    //           <button
    //             key={index}
    //             className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50 transition duration-300 hover:ring-2 hover:ring-black/5 active:scale-95 group"
    //           >
    //             <Image
    //               src={img}
    //               alt={`${product.name} gallery ${index + 1}`}
    //               fill
    //               className="object-cover object-center transition duration-300 group-hover:scale-105"
    //             />
    //           </button>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Right Column: Product Info */}
    //     <div className="flex flex-col h-full justify-between pt-2">
    //       <div>
    //         {/* Brand & Meta */}
    //         <div className="flex items-center justify-between gap-4">
    //           <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
    //             {product.brand}
    //           </span>
    //           {/* Stock Tag */}
    //           <div>
    //             {product.stock > 0 ? (
    //               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
    //                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    //                 In Stock ({product.stock})
    //               </span>
    //             ) : (
    //               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
    //                 Out of Stock
    //               </span>
    //             )}
    //           </div>
    //         </div>

    //         {/* Title */}
    //         <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mt-4 leading-[1.15]">
    //           {product.name}
    //         </h1>

    //         {/* Rating Row */}
    //         <div className="flex items-center gap-3 mt-4">
    //           <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-lg text-sm font-semibold border border-amber-100">
    //             <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
    //             {product.ratings.average}
    //           </div>
    //           <span className="text-sm text-gray-500 font-medium">
    //             Based on {product.ratings.count} reviews
    //           </span>
    //         </div>

    //         {/* Pricing Segment */}
    //         <div className="flex items-baseline gap-4 flex-wrap mt-8 pt-6 border-t border-gray-100">
    //           <span className="text-4xl font-extrabold tracking-tight text-gray-900">
    //             ৳{product.price}
    //           </span>
    //           <span className="line-through text-lg text-gray-400 font-medium">
    //             ৳{product.comparePrice}
    //           </span>
    //           <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-md text-xs font-bold border border-rose-100 tracking-wide uppercase">
    //             Save {product.discount || 20}%
    //           </span>
    //         </div>

    //         {/* Option Variant Selection: Colors */}
    //         <div className="mt-8">
    //           <div className="flex justify-between items-center mb-3">
    //             <h3 className="font-semibold text-sm tracking-wide uppercase text-gray-900">
    //               Color
    //             </h3>
    //             <span className="text-xs text-gray-400 font-medium">Select one</span>
    //           </div>
    //           <div className="flex flex-wrap gap-2.5">
    //             {product.attributes.colors.map((color) => (
    //               <button
    //                 key={color}
    //                 className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white hover:border-black active:scale-[0.98] transition-all duration-200 shadow-sm"
    //               >
    //                 {color}
    //               </button>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Option Variant Selection: Sizes */}
    //         <div className="mt-6">
    //           <div className="flex justify-between items-center mb-3">
    //             <h3 className="font-semibold text-sm tracking-wide uppercase text-gray-900">
    //               Size
    //             </h3>
    //             <span className="text-xs text-gray-400 font-medium">Size Guide</span>
    //           </div>
    //           <div className="flex gap-2.5 flex-wrap">
    //             {product.attributes.sizes.map((size) => (
    //               <button
    //                 key={size}
    //                 className="w-12 h-12 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:border-black active:scale-[0.98] transition-all duration-200 flex items-center justify-center shadow-sm"
    //               >
    //                 {size}
    //               </button>
    //             ))}
    //           </div>
    //         </div>

    //         <p className="text-gray-500 mt-8 text-base leading-relaxed line-clamp-3">
    //           {product.shortDescription}
    //         </p>

    //         {/* Action Callouts */}
    //         <div className="flex flex-col sm:flex-row gap-3 mt-8">
    //           <button className="flex-1 bg-black text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-900 active:scale-[0.99] transition duration-200 shadow-lg shadow-black/5">
    //             Add To Cart
    //           </button>
    //           <button className="flex-1 border border-gray-200 bg-white text-gray-900 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 active:scale-[0.99] transition duration-200">
    //             Buy Now
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Description Section */}
    //   <div className="mt-12 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
    //     <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
    //       Product Description
    //     </h2>
    //     <p className="text-gray-600 leading-relaxed text-base sm:text-lg max-w-none">
    //       {product.description}
    //     </p>
    //   </div>

    //   {/* Technical Specifications Section */}
    //   <div className="mt-8 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
    //     <div className="p-6 sm:p-8 border-b border-gray-100 bg-gray-50/50">
    //       <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
    //         Specifications
    //       </h2>
    //     </div>

    //     <div className="divide-y divide-gray-100">
    //       {Object.entries(product.specifications).map(([key, value]) => (
    //         <div
    //           key={key}
    //           className="grid grid-cols-3 p-5 sm:px-8 hover:bg-gray-50/50 transition-colors duration-150"
    //         >
    //           <span className="font-semibold text-sm text-gray-900 col-span-1 self-center">
    //             {key}
    //           </span>
    //           <span className="text-sm text-gray-600 col-span-2 leading-relaxed">
    //             {value}
    //           </span>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    //         ))}
    //       </div>

    //     </div>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.slice(0, 20).map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-500 uppercase">{product.brand}</p>

              <h3 className="font-semibold mt-1 line-clamp-2 min-h-[48px]">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">
                  ⭐ {product.ratings.average}
                </span>

                <span className="text-xs text-gray-500">
                  ({product.ratings.count})
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg font-bold">৳{product.price}</span>

                <span className="text-sm text-gray-400 line-through">
                  ৳{product.comparePrice}
                </span>
              </div>

              <button className="w-full mt-4 bg-black text-white py-2.5 rounded-xl hover:bg-gray-800 transition">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProduct;
