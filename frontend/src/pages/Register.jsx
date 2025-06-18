import React, { useState } from 'react'
import { Link} from "react-router-dom";
import login from "../assets/login1.webp";
import register from "../assets/register.jpg";
import { registerUser } from '../redux/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { mergeCart } from '../redux/slice/cartSlice';
import { toast } from 'sonner';


const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerAttempted, setRegisterAttempted] = useState(false);

    
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
    // const {user, guestId, loading} = useSelector((state) => state.auth);
    const { user, guestId, loading, error } = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => state.cart);
    
    //fet redirect parameter and check if it's checkout or something
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (registerAttempted && error) {
            toast.error("❌ User already exist.", {
                style: {
                    color: 'black',
                    backgroundColor: 'white'
                }
            });
            setRegisterAttempted(false);
        }
    }, [error, registerAttempted]);


    useEffect(() => {
        if(user){
            if(cart?.products.length > 0 && guestId){
                dispatch(mergeCart({guestId, user})).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                })
            } else{
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("❌ Please fill all fields", {
                style: {
                    color: 'black',
                    backgroundColor: 'white'
                }
            });
            return;
        }

        if (password.length < 6) {
        toast.error("❌ Password must be at least 6 characters", {
            style: {
                color: 'black',
                backgroundColor: 'white'
            }
        });
        return;
    }

        setRegisterAttempted(true);
        dispatch(registerUser({name, email ,password}));
    };

    return (
        <div className='flex'>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form 
                onSubmit={handleSubmit}
                className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>
                    <div className="flex justify-center mb-6">
                        <h2 className='text-xl font-medium '>
                            QuickKart
                        </h2>
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
                    <p className="text-center mb-6">Enter your username and password to Login</p>

                    <div className="mb-4">
                        <label htmlFor="" className="block text-sm font-semibold mb-2">Name</label>
                        <input type="text" value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className='w-full p-2 border rounded'
                        placeholder='Enter your name'/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="" className="block text-sm font-semibold mb-2">Email</label>
                        <input type="email" value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border rounded'
                        placeholder='Enter your email address'/>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="" className="block text-sm font-semibold mb-2">Password</label>
                        <input type="password" value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 border rounded'
                        placeholder='Enter your password'/>
                    </div>

                    <button type="submit" className="w-full cursor-pointer bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition">
                        {loading ? "loading..." : "Sign Up"}
                    </button>

                    <p className="mt-6 text-center text-sm">
                        Already have an account?{" "}
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500 ">
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            <div className="hidden md:block w-1/2 bg-gray-800">
                <div className="h-full flex flex-col justify-center items-center">
                    <img src={register} alt="Register to Account"
                    className='h-full w-full object-cover' />
                </div>
            </div>
        </div>
    )
}

export default Register;
