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
import useCartLength from "@/store/cartLength";

function Cart({ setOpenCart }) {
  const setCartLength = useCartLength((state) => state.setCartLength);
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
        setCartLength(data.length);
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
      setCartLength(data.length);
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
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpenCart(false)}
        className="fixed inset-0  overflow-hidden  z-140 bg-black/50 backdrop-blur-sm"
      />
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
        className="fixed top-0 right-0 z-150 flex max-h-screen w-[620px] max-w-full flex-col overflow-x-hidden overflow-y-auto bg-white text-black shadow-2xl lg:h-screen"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-6">
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-sm text-gray-500">
              {cartProductData.length} Products
            </p>
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
            className="btn btn-circle btn-ghost rounded-tl-xl rounded-b-xl rounded-bl-xl border-2 border-black px-2.5 py-1 font-semibold text-black hover:bg-gray-100"
          >
            ✕
          </motion.button>
        </div>

        <div className="scrollbar-hide max-h-85 flex-1 overflow-y-auto px-2 py-2 lg:max-h-full">
          <div className="overflow-hidden rounded-xl border">
            <table className="table w-full">
              <thead className="bg-gray-50">
                <tr className="">
                  <th>Product</th>
                  <th className="py-2 text-center">Qty</th>
                  <th className="px-3 text-center">Price</th>
                  <th className="px-3 text-center">Total</th>
                  <th className="px-3"></th>
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
                            className="h-9 w-9 rounded-xl object-cover md:h-15 md:w-15"
                          />
                          <div>
                            <h2 className="line-clamp-2 text-[12px] font-semibold lg:text-[16px]">
                              {p.name}
                            </h2>
                            <p className="flex items-center text-xs text-gray-500 lg:text-sm">
                              <span
                                className="mr-1 h-3 w-3 rounded-2xl"
                                style={{ background: p.colors }}
                              ></span>{" "}
                              • Size: {p.sizes}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          <span className="flex w-6 items-center justify-center font-semibold md:h-7 md:w-8">
                            {p.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="text-center">
                        <p className="text-base font-bold">
                          {p.discountPercentage ? (
                            <span className="mr-2 text-sm text-gray-400 line-through">
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
                          <MdDeleteForever className="h-5 w-5" />
                        </motion.button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {cartProductData.length === 0 && (
              <div className="my-10 flex flex-col items-center justify-center gap-5">
                <BsCart3 className="text-4xl" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Your cart is empty
                </h2>
              </div>
            )}
          </div>
        </div>

        <div className="border-t bg-white p-6">
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
              className="w-1/2 text-center"
            >
              Continue Shopping
            </button>
            {cartProductData.length === 0 ? (
              <div className="w-1/2 cursor-not-allowed text-center text-gray-200">
                Checkout →
              </div>
            ) : (
              <Link href={"/checkout"} className="w-1/2 text-center">
                Checkout →
              </Link>
            )}
          </div>
        </div>
        <Toaster position="top-left" reverseOrder={false} />
      </motion.aside>
    </div>
  );
}

export default Cart;
