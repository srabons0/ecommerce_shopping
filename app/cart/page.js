import Navbar from "@/layout/Navbar";
import React from "react";

const items = [{ id: 1, name: "Nike Air Max 270", color: "Black", size: "42", qty: 2, price: 149, img: "https://img.daisyui.com/images/profile/demo/2@94.webp" }, { id: 2, name: "Adidas Ultraboost", color: "White", size: "41", qty: 1, price: 169, img: "https://img.daisyui.com/images/profile/demo/3@94.webp" }];
function Cart() {
 const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0); const shipping = 15; const tax = Math.round(subtotal * 0.08); const total = subtotal + shipping + tax;
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-black  h-14 ">
        <Navbar></Navbar>
      </div>
     
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_420px]">
                <div className="rounded-3xl bg-white p-8 shadow-sm">
                    <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
                    <div className="grid gap-4 md:grid-cols-2">
                        <input className="input input-bordered" placeholder="First name" />
                        <input className="input input-bordered" placeholder="Last name" />
                        <input className="input input-bordered md:col-span-2" placeholder="Email" />
                        <input className="input input-bordered md:col-span-2" placeholder="Address" />
                    </div>
                    <h2 className="mt-8 mb-4 text-xl font-semibold">Payment</h2>
                    <label className="flex gap-3 border rounded-xl p-4">
                        <input type="radio" name="p" defaultChecked />Card</label>
                    <label className="mt-3 flex gap-3 border rounded-xl p-4">
                        <input type="radio" name="p" />PayPal</label>
                </div>
                <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    {items.map(i =>
                        <div key={i.id} className="flex gap-3 border-b py-3">
                            <img src={i.img} className="h-16 w-16 rounded-xl" />
                            <div className="flex-1">
                                <p className="font-semibold">{i.name}</p>
                                <p className="text-sm text-gray-500">{i.color} • {i.size}</p>
                            </div>
                            <b>${i.price * i.qty}</b>
                        </div>)}
                    <div className="mt-5 space-y-2">
                        <div className="flex justify-between"><span>Subtotal</span>
                            <span>${subtotal}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>${shipping}</span>
                        </div>
                        <div className="flex justify-between"><span>Tax</span><span>${tax}</span></div>
                        <div className="flex justify-between border-t pt-3 text-xl font-bold"><span>Total</span><span>${total}</span></div>
                    </div>
                    <button className="btn btn-neutral w-full mt-6">Place Order</button></aside>
            </div>
        </div>
    
     
    </div>
  );
}

export default Cart;
