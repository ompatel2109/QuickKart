import React, { useEffect, useState } from 'react'
import stylishJacket from "../../assets/stylishjacket.webp"
import best1 from "../../assets/bestseller1.jpg"
import best2 from "../../assets/bestseller2.jpg"
import { toast } from "sonner";
import YouMayLike from './YouMayLike';
import like1 from "../../assets/youmaylike1.jpg";
import like2 from "../../assets/youmaylike2.jpg";
import like3 from "../../assets/youmaylike3.jpg";
import like4 from "../../assets/youmaylike4.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/slice/productsSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import { useParams } from 'react-router-dom';


const ProductDetails = ({productId}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {selectedProduct, loading, error, similarProducts}  = useSelector((state) => state.products);
    const {user, guestId} = useSelector((state) => state.auth);

    const productFetchId = productId || id;

    useEffect(() => {
        if(productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({id: productFetchId}));
        }
    }, [dispatch, productFetchId]);

    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setselectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setquantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
    useEffect(() => {
        if(selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if(action === "plus") setquantity((prev) =>prev+1);
        if(action === "minus" && quantity > 1) setquantity((prev) =>prev-1);        
    };

    const handleAddToCart = () => {
        if  (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color before adding to cart.", {
                duration: 1000,
            });
            return;
        }

        setIsButtonDisabled(true);


        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?.id,
            })
        )
        .then(() => {
            toast.success("Product added to cart!", {
                duration: 1000,
            });
        })
        .finally(() => {
            setIsButtonDisabled(false);
        })
    };

    if(loading){
        return <p>Loading..</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }

    return (
        
            <div className="p-6">
                {selectedProduct && (
                <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                    <div className="flex flex-col md:flex-row">

                    {/* left thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6 ">
                        {selectedProduct.images.map((image, index) => (
                            <img  key={index}
                            src={image.url} alt={image.altText 
                            || `Thumbnail ${index}`} 
                            className={ `h-20 object-cover rounded-lg cursor-pointer border ${mainImage ===
                                image.url ? "border-black" : "border-gray-300"
                            }`}
                            onClick={() => setMainImage(image.url)}/>
                        ))}
                    </div>

                        {/* main image */}
                        <div className="md:w-1/2">
                            <div className="mb-4">
                                {/* <img src={mainImage} alt="Main Product"
                                className=' w-full h-[650px] object-cover rounded-lg'/> */}
                                {mainImage && (
                                <img
                                src={mainImage}
                                alt="Main Product"
                                className="w-full h-[650px] object-cover rounded-lg"/>
                                )}

                            </div>
                        </div>

                        {/* Mobile thumbnail */}
                        <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
                            {selectedProduct.images.map((image, index) => (
                            <img  key={index}
                            src={image.url} alt={image.altText 
                            || `Thumbnail ${index}`} 
                            className={ `h-20 object-cover rounded-lg cursor-pointer border ${mainImage ===
                                image.url ? "border-black" : "border-gray-300"
                            }`}
                            onClick={() => setMainImage(image.url)}/>
                        ))}
                        </div>

                        {/*right section */}
                        <div className="md:w-1/2 md:ml-10">
                            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                                {selectedProduct.name}
                            </h1>
                            <p className='text-lg text-gray-600 mb-1 line-through'>
                                {selectedProduct.originalPrice && `$ ${selectedProduct.originalPrice}`}
                            </p>
                            <p className="text-xl text-gray-500 mb-2">
                                $ {selectedProduct.price}
                            </p>
                            <p className='text-gray-600 mb-4'>
                                {selectedProduct.description}
                            </p>
                            <div className="mb-4">
                                <p className='text-gray-700'>Color:</p>
                                <div className="flex gap-2  mt-2">
                                    {selectedProduct.colors.map((color) => (
                                        <button key={color} 
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color 
                                            ? "border-4 border-black" : "border-2 border-gray-300"}`}
                                        style={{backgroundColor: color.toLocaleLowerCase(),
                                            filter: "brightness(0.5)"
                                        }}>

                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className='text-gray-700'>Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                        <button key={size}
                                        onClick={() => setselectedSize(size)}
                                        className={`px-4  py-2 rounded border cursor-pointer ${selectedSize === size 
                                            ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className='text-gray-700'>Quantity:</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <button 
                                    onClick={() => handleQuantityChange("minus")}
                                    className='px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer'>
                                        -
                                    </button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button 
                                    onClick={() => handleQuantityChange("plus")}
                                    className='px-2 py-1 bg-gray-200 rounded text-lg cursor-pointer'>
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            <button 
                            onClick={handleAddToCart}
                            disabled={isButtonDisabled}
                            className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer
                                ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-900"}`}>
                                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
                            </button>
                            <div className="mt-3 text-gray-700">
                                <h3 className='text-xl font-bold mb-4'>Characteristic:</h3>
                                <table className='w-full text-left  text-sm text-gray-700'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand:</td>
                                            <td className='py-1'>{selectedProduct.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Material:</td>
                                            <td className='py-1'>{selectedProduct.material}</td>
                                        </tr>
                                    </tbody>
                                </table>    
                            </div>

                        </div>
                    </div>

                    <div className="mt-20 ">
                        <h2 className='text-2xl text-center font-bold mb-4'>You May Also Like</h2>
                        <YouMayLike products={similarProducts} loadin={loading} error={error}/>
                    </div>

                </div>
                )}
            </div>

        
    )
}

export default ProductDetails;