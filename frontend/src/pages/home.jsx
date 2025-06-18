// import React from 'react'
import axios from 'axios';
import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import YouMayLike from '../components/Products/YouMayLike';
import women1 from "../assets/women1.jpg";
import women2 from "../assets/women2.jpg"
import women3 from "../assets/women3.jpg"
import women4 from "../assets/women4.jpg"
import women5 from "../assets/women5.jpg"
import women6 from "../assets/women6.jpg"
import women7 from "../assets/women7.jpg"
import women8 from "../assets/women8.jpg"
import FeatureCollection from '../components/Products/FeatureCollection';
import FeatureSection from '../components/Products/FeatureSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchProductsByFilters } from '../redux/slice/productsSlice';
import React, { useState } from 'react';


// const placeholderProducts = [
//     {
//             _id: 1,
//             name: "Pleated Midi Skirt",
//             price: 1599,
//             images: [{url: women1}],
//         },
    
//         {
//             _id: 2,
//             name: "Baggy Jeans",
//             price: 1999,
//             images: [{url: women2}],
//         },
    
//         {
//             _id: 3,
//             name: "Flared Palazzo Pants",
//             price: 1399,
//             images: [{url: women3}],
//         },
    
//         {
//             _id: 4,
//             name: "Classic Trouser",
//             price: 1799,
//             images: [{url: women4}],
//         },
//         {
//             _id: 5,
//             name: "Wide-Leg Trouser",
//             price: 1299,
//             images: [{url: women5}],
//         },
        
//         {
//             _id: 6,
//             name: "High-Rise Joggers",
//             price: 999,
//             images: [{url: women6}],
//         },
    
//         {
//             _id: 7,
//             name: "Classic Jeans",
//             price: 1399,
//             images: [{url: women7}],
//         },
        
//         {
//             _id: 8,
//             name: "Strech Denim Shirt",
//             price: 1199,
//             images: [{url: women8}],
//         },
// ];

const home = () => {
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        //fetch products for specific collection
        dispatch(fetchProductsByFilters({
            gender: "Women",
            category: "Top Wear",
            limit: 8,
        }));
        //fetch best seller
        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);
                
            }
        };
        fetchBestSeller();
    }, [dispatch])

    return (
        <div>
            <Hero/>
            <GenderCollection />
            <NewArrivals />

            {/* best seller */}
            <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
            {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id} />) : (
                <p className='text-center'>Loading best seller products...</p>
            )}
            {/* <ProductDetails /> */}

            <div className="container mx-auto ">
                <h2 className='text-3xl text-center font-bold mb-4'>
                        Top Wear For Women
                </h2>
                <YouMayLike products={products} loading={loading} error={error} />
            </div>

            <FeatureCollection /> 
            <FeatureSection />
        </div>
    );
};

export default home;
