import React from 'react'
import { motion } from 'framer-motion';
import { MdDeleteForever } from "react-icons/md";
import Image from 'next/image';
function Cart({ openCart, setOpenCart }) {
  
  return (


    <motion.aside
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{
        x: "100%", opacity: 0, transition: {
          duration: .75,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={(e) => e.stopPropagation()}
      className="fixed top-0 right-0 z-50 h-screen max-w-full text-black bg-white shadow-2xl
      flex w-[620px] flex-col overflow-hidden "
    >


      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-6">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <p className="text-sm text-gray-500">{products.length} Products</p>
        </div>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={() => setOpenCart(false)} className="btn text-black font-semibold btn-circle btn-ghost hover:bg-gray-100 py-1 border-2 border-black px-2.5 rounded-bl-xl rounded-b-xl rounded-tl-xl ">✕</motion.button>
      </div>


      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="overflow-hidden rounded-xl border">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr className=''>
                <th>Product</th>
                <th className="text-center py-2">Qty</th>
                <th className="text-center px-3">Price</th>
                <th className="text-center px-3">Total</th>
                <th className=" px-3"></th>
              </tr>
            </thead>
            <tbody className=''>
              {products.map(p => (
                <tr key={p.id} className="hover">
                  <td className='w-2/5 py-2.5'>
                    <div className="flex items-center gap-4 px-2">
                      <Image  src={p.img} alt={p.name}  width={300}
  height={300}
  className="w-9 h-9 md:w-15 md:h-15 rounded-xl object-cover" />
                      <div>
                        <h2 className="font-semibold text-[12px] lg:text-[16px]">{p.name}</h2>
                        <p className="text-xs lg:text-sm text-gray-500">{p.color} • Size {p.size}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      <div className="flex  items-center overflow-hidden rounded-xl border">
                        <motion.button whileHover={{
                          scale: 1.1,
                        }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }} className="md:h-7 md:w-7 ml-2 text-lg transition hover:bg-black hover:text-white">
                          −
                        </motion.button>

                        <span className="flex md:h-7 md:w-8 w-6 items-center justify-center font-semibold">
                          2
                        </span>

                        <motion.button whileHover={{
                          scale: 1.1,
                        }}
                          whileTap={{
                            scale: 0.9,
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 15 }} className="md:h-7 md:w-7 mr-2 text-lg transition hover:bg-black hover:text-white">
                          +
                        </motion.button>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <p className="text-xs line-through text-gray-400">${p.oldPrice}</p>
                    <p className="font-bold">${p.price}</p>
                  </td>
                  <td className="text-center font-bold">${p.price * p.qty}</td>
                  <td><motion.button whileHover={{
                    scale: 1.1,
                  }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }} className="text-red-500"><MdDeleteForever className='w-5 h-5' /></motion.button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="sticky bottom-0 border-t bg-white p-6">
        <div className="mb-5 flex gap-3">
          <input className="input input-bordered flex-1" placeholder="Coupon code" />
          <button className="btn">Apply</button>
        </div>
        <div className="mb-6 space-y-2">
          <div className="flex justify-between"><span>Subtotal</span><span>$1000</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          <div className="flex justify-between text-2xl font-bold"><span>Total</span><span>$100</span></div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-outline flex-1">Continue Shopping</button>
          <button className="btn btn-neutral flex-1">Checkout →</button>
        </div>
      </div>


    </motion.aside>



  )
}

export default Cart
