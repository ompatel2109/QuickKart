    import React from 'react'
    import { RiDeleteBin3Line } from 'react-icons/ri';
    import { useDispatch } from 'react-redux';
    import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice';

    const CartContent = ({cart, userId, guestId}) => {
        // const cartProducts = [
        //     { 
        //         ProductId: 1,
        //         name: 'T-shirt', 
        //         size: "M",
        //         color: "Red",
        //         Quantity: 1,
        //         price: 499 ,
        //         image: "https://picsum.photos/200?random=1", //Random => gievs random pic 
        //     },

        //     { 
        //         ProductId: 2,
        //         name: 'Jeans', 
        //         size: "L",
        //         color: "Blue",
        //         Quantity: 1,
        //         price: 699 ,
        //         image: "https://picsum.photos/200?random=2", //Random => gievs random pic 
        //     },
        // ];

        const dispatch = useDispatch();
        //handle adding or subscribinh=g to cart
        const handleAddToCart = (productId, delta, quantity, size, color) => { //delta is for add or minus product quantity
            const newQuantity = quantity + delta;
            if(newQuantity >= 1){
                dispatch(updateCartItemQuantity({
                    productId, 
                    quantity: newQuantity,
                    guestId,
                    userId,
                    size,
                    color,
                }));
            }
        };

        const handleRemoveFromCart = (productId, size, color) => {
            dispatch(removeFromCart({productId, guestId, userId, size, color}));
        };

        

        return (
            <div>
                {cart.products.map((product, index) => (
                    <div key = {index} className='flex items-start justify-between py-4 border-b'>
                        <div className='flex items-center'>
                            <img src={product.image} alt={product.name} 
                            className='w-20 h-24 object-cover mr-4 rounded'/>
                            <div>
                                <h3>{product.name}</h3>
                                <p className='text-sm text-gray-500'>
                                    Size: {product.size} | Color: {product.color}
                                </p>
                                <div className="flex items-center mt-2">
                                    <button  onClick={() => handleAddToCart(
                                        product.productId, 
                                        -1, 
                                        product.quantity,
                                        product.size,
                                        product.color
                                    )}
                                    className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>
                                        -
                                    </button>
                                    <span className="mx-4 ">{product.quantity}</span>
                                    <button onClick={() => handleAddToCart(
                                        product.productId, 
                                        1, 
                                        product.quantity,
                                        product.size,
                                        product.color
                                    )}
                                    className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="div">
                            <p>${product.price.toLocaleString()}</p>
                            <button onClick={() => handleRemoveFromCart(
                                product.productId,
                                product.size,
                                product.color,
                            )}>
                                <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600 cursor-pointer'/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    export default CartContent;
