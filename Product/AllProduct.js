"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function AllProduct() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data.slice(0, 20).map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            <div className="overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.name}
                width={400}
                height={500}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

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
