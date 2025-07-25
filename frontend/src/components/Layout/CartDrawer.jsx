import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({drawerOpen, togglCartDrawer}) => {
    const navigate = useNavigate();

    const {user, guestId} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const handleCheckout = () => {
        togglCartDrawer();  

        if(!user){
            navigate("/login?redirect=checkout");
        }else{
        navigate("/checkout");
        }
    }

    return (
        <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg 
        transform transition-transform duration-300 flex flex-col z-50 
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}>
            {/* close button */}
            <div className="flex justify-end p-4">
                <button onClick={togglCartDrawer}>
                    <IoMdClose className='h-6 w-6 text-gray-600 cursor-pointer' />
                </button>
            </div>
            {/* Cart contents with scrollable area */}
            <div className="flex-grow p-4 overflow-y-auto">
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {/* components for cart contents */}
                {cart && cart?.products?.length > 0 ? (<CartContent cart={cart} userId={userId} guestId={guestId}/>) : (
                    <p>Your cart is empty.</p>
                )}

                
            </div>

            {/* checkout button fixed at bottom */}
            <div className="p-4 bg-white sticky bottom-0">
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button 
                        onClick={handleCheckout}
                        className='w-full bg-black cursor-pointer text-white cursor-pointerc py-3 rounded-lg font-semibold hover:bg-gray-800 transitionn'>
                            CheckOut
                        </button>
                        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'> {/*mt = margin top */}
                            Shipping, taxes and discount codes calculated at checkout.
                        </p>
                    </>
                )}
                
            </div>
        </div>
    );
};

export default CartDrawer;
