"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import Image from "next/image";
import useCartData from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Link from "next/link";
import CartTableSkeleton from "@/components/ui/loadingSkeleton/CartTableSkeleton";
import { BsCart3 } from "react-icons/bs";

function Cart({ setOpenCart }) {
  const cartData = useCartData((state) => state.cartData);
  const removeCartData = useCartData((state) => state.removeCartData);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        setLoading(true);
        const res = await fetch(
          `/api/products/userCart?email=${session.user.email}`,
        );
        const data = await res.json();
        setCartProduct(data);
        setLoading(false);
      };
      fetchData();

      return;
    }
    const itemsId = cartData.map((i) => i._id);
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/products/cart?ids=${itemsId.join(",")}`);
      const data = await res.json();
      setCart(data);
      setLoading(false);
    };
    fetchData();
    return;
  }, [cartData, session]);

  const cartProductData = !session
    ? cartData.map((item) => {
        const Product = cart.find(
          (p) => p._id.toString() === item._id.toString(),
        );
        return {
          ...Product,
          sizes: item.sizes,
          colors: item.colors,
          quantity: item.quantity,
        };
      })
    : cartProduct;



  const handleCartDelete = async (p) => {
    if (session) {
      const req = await fetch(`/api/products/userCart/${p._id}`, {
        method: "DELETE",
      });
      if (req.ok) {
        toast.success("Successfully Delete!");
        setCartProduct((pre) => pre.filter((i) => i._id !== p._id));
      }
    }
    removeCartData(p._id, p.sizes, p.colors);
  };


  const { totalPrice } = useMemo(() => {
    const totalPrice = cartProductData.reduce(
      (acc, item) =>
        acc +
        Math.ceil(
          (item.price - (item.price * item.discountPercentage) / 100) *
            item.quantity,
        ),
      0,
    );
    return {
      totalPrice,
    };
  }, [cartProductData]);
  return (
    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{
        x: "100%",
        opacity: 0,
        transition: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 right-0 z-150 h-screen max-w-full text-black bg-white shadow-2xl
      flex w-[620px] flex-col overflow-hidden "
    >
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-gray-500">{cartProduct.length} Products</p>
        </div>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={() => setOpenCart(false)}
          className="btn text-black font-semibold btn-circle btn-ghost hover:bg-gray-100 py-1 border-2 border-black px-2.5 rounded-bl-xl rounded-b-xl rounded-tl-xl "
        >
          ✕
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-2 py-2">
        <div className="overflow-hidden rounded-xl border">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr className="">
                <th>Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-center px-3">Price</th>
                <th className="text-center px-3">Total</th>
                <th className=" px-3"></th>
              </tr>
            </thead>
            <tbody className="">
              {loading ? (
                <CartTableSkeleton></CartTableSkeleton>
              ) : (
                cartProductData.map((p, i) => (
                  <tr key={i} className="hover">
                    <td className="w-2/5 py-2.5">
                      <div className="flex items-center gap-4 px-2">
                        <Image
                          src={p.images}
                          alt={p.name}
                          width={300}
                          height={300}
                          className="w-9 h-9 md:w-15 md:h-15 rounded-xl object-cover"
                        />
                        <div>
                          <h2 className="font-semibold text-[12px] lg:text-[16px]">
                            {p.name}
                          </h2>
                          <p className="text-xs lg:text-sm text-gray-500 flex items-center">
                            <div
                              className="w-3 h-3 mr-1 rounded-2xl"
                              style={{ background: p.colors }}
                            ></div>{" "}
                            • Size: {p.sizes}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <span className="flex md:h-7 md:w-8 w-6 items-center justify-center font-semibold">
                          {p.quantity}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      <p className="text-base font-bold">
                        {p.discountPercentage ? (
                          <span className="text-sm text-gray-400 mr-2 line-through">
                            ${p.price}
                          </span>
                        ) : (
                          ""
                        )}
                        $
                        {Math.ceil(
                          p.price - (p.price * p.discountPercentage) / 100,
                        )}
                      </p>
                    </td>
                    <td className="text-center font-bold">
                      $
                      {Math.ceil(
                        p.price - (p.price * p.discountPercentage) / 100,
                      ) * p.quantity}
                    </td>
                    <td>
                      <motion.button
                        onClick={() => handleCartDelete(p)}
                        whileHover={{
                          scale: 1.1,
                        }}
                        whileTap={{
                          scale: 0.9,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        className="text-red-500"
                      >
                        <MdDeleteForever className="w-5 h-5" />
                      </motion.button>
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
          {cartProductData.length === 0 && (

                <div className="flex flex-col justify-center items-center gap-5 my-10">
                    <BsCart3 className="text-4xl"/>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your cart is empty
                  </h2>
                </div>
             )}
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-white p-6">
        <div className="mb-5 flex gap-3">
          <input
            className="input input-bordered flex-1"
            placeholder="Coupon code"
          />
          <button className="btn">Apply</button>
        </div>
        <div className="mb-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$100</span>
          </div>
          <div className="flex justify-between text-2xl font-bold">
            <span>Total</span>
            <span>$ {totalPrice + 100}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenCart(false)}
            className="w-1/2  text-center"
          >
            Continue Shopping
          </button>
          <Link href={"/checkout"} className="w-1/2 text-center ">
            Checkout →
          </Link>
        </div>
      </div>
      <Toaster position="top-left" reverseOrder={false} />
    </motion.aside>
  );
}

export default Cart;
