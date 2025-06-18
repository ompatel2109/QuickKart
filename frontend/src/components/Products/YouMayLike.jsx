// Also top wear for women

import React from 'react'
import { Link } from "react-router-dom";

const YouMayLike = ({ products, loading, error }) => {
    if(loading) {
        return <p>Loading...</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className='block'>
            <div className="rounded-lg p-3 overflow-hidden bg-white">
                <div className="w-full h-[450px] mb-4">
                    <img 
                    src={product.images[0].url || product} 
                    alt={product.images[0].alText || product.name}
                    className="w-full h-full object-cover  rounded-lg"
                    />
                </div>
            {/* <div className=""> */}
                <h3 className="text-sm mb-2">{product.name}</h3>
                <p className="text-gray-500 font-medium tracking-tighter">$ {product.price}</p>
            {/* </div> */}
            </div>
        </Link>
    ))}
</div>

    );
};

export default YouMayLike;
