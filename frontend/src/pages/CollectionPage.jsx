import React, { useEffect, useState, useRef } from 'react'
import like4 from "../assets/youmaylike4.jpg"
import new3 from "../assets/new3.jpg"
import men1 from "../assets/men1.jpg"
import men2 from "../assets/men2.jpg"
import like2 from "../assets/youmaylike2.jpg"
import men3 from "../assets/men3.jpg"
import best1 from "../assets/bestseller1.jpg"
import men4 from "../assets/men4.jpg"
import men5 from "../assets/men5.jpg"
import men6 from "../assets/men6.jpg"
import like1 from "../assets/youmaylike1.jpg"
import new1 from "../assets/new1.webp"
import { FaFilter } from "react-icons/fa"
import FilterSideBar from '../components/Products/FilterSideBar';
import SortOptions from '../components/Products/SortOptions';
import YouMayLike from '../components/Products/YouMayLike';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slice/productsSlice'

const CollectionPage = () => {
    const {collection}  = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {products, loading, error} = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams]);


    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({collection, ...queryParams}));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); 
    };

    const handleClickOutSide = (e) => {
        //close slidebar if cliked outside
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
        document.removeEventListener("mousedown", handleClickOutSide);
    };
}, []);


    // useEffect(() => {
    //     setTimeout(() => {
    //         const fetchedProducts = [
    //             {
    //                     _id: 1,
    //                     name: "Printed Resort Shirt",
    //                     price: 1199,
    //                     images: [{url:like4}],
    //                 },
                
    //                 {
    //                     _id: 2,
    //                     name: "Classic Chino Pants",
    //                     price: 1599,
    //                     images: [{url: new3}],
    //                 },
                
    //                 {
    //                     _id: 3,
    //                     name: "Cargo Pants",
    //                     price: 1299,
    //                     images: [{url: men1}],
    //                 },
                
    //                 {
    //                     _id: 4,
    //                     name: "Long-Sleeve Thermal Tee",
    //                     price: 1799,
    //                     images: [{url: men2}],
    //                 },
    //                 {
    //                     _id: 5,
    //                     name: "Slim-Fit Stretch Shirt",
    //                     price: 1999,
    //                     images: [{url: like2}],
    //                 },
                    
    //                 {
    //                     _id: 6,
    //                     name: "Cargo Joggers",
    //                     price: 999,
    //                     images: [{url: men3}],
    //                 },
                
    //                 {
    //                     _id: 7,
    //                     name: "Slim-Fit Easy-Iron Shirt",
    //                     price: 1399,
    //                     images: [{url: best1}],
    //                 },
                    
    //                 {
    //                     _id: 8,
    //                     name: "Track Pants",
    //                     price: 899,
    //                     images: [{url: men4}],
    //                 },
    //                 {
    //                     _id: 9,
    //                     name: "Relaxed Seat Shirt",
    //                     price: 1099,
    //                     images: [{url: men5}],
    //                 },
                    
    //                 {
    //                     _id: 10,
    //                     name: "Classic Oxford Button Shirt",
    //                     price: 999,
    //                     images: [{url: like1}],
    //                 },
                
    //                 {
    //                     _id: 11,
    //                     name: "Oversized Graphic T-Shirt",
    //                     price: 1299,
    //                     images: [{url: men6}],
    //                 },
                    
    //                 {
    //                     _id: 12,
    //                     name: "Slim Fit Denim Jacket",
    //                     price: 1999,
    //                     images: [{url: new1}],
    //                 },
    //         ];setProducts(fetchedProducts);
    //     }, 1000);
    // }, []);

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* mobile filter button */}
            <button
            onClick={toggleSidebar}
            className="lg:hidden border border-gray-300 p-2 flex justify-center items-center cursor-pointer">
                <FaFilter className='mr-2 '/> Filter
            </button>

            {/* filter sidebar */}
            <div ref={sidebarRef}
            className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform 
            duration-300 lg:static lg:translate-x-0`}>
                <FilterSideBar />
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">
                    All Collection
                </h2>

                {/* sort option */}
                <SortOptions />

                {/* product grid */}
                <YouMayLike products={products} loading={loading} error={error}/>
            </div>
        </div>
    );
};

export default CollectionPage;
