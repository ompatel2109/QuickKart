const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
//@route POST /api/checkout
//@desc Create a new checkout
//@access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({ message: "No items in checkout." });
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
        
        
    } catch (error) {
        console.error("error creating checkout sessionStorage", error);
        res.status(500).json({ message: "Server error." });
    }
});

//@route PUT /api/checkout/:id/pay
//@desc Update a checkout to paid
//@access private
router.put("/:id/pay", protect, async (req, res) => {
    const {paymentStatus, paymentDetails} = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message: "Checkout not found."});
        }

        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        }else{
            res.status(400).json({message: "Invalid payment status."})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
});

//@route POST /api/checkout/:id/finalize
//@desc Finalize a checkout and convert to order after payment
//@access private
router.post("/:id/finalize", protect, async (req, res) => {

    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout) {
            return res.status(404).json({message: "Checkout not found."});
        }

        if(checkout.isPaid && !checkout.isFinalized) {
            //create final order based on the details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            //mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            //delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        }else if(checkout.isFinalized) {
            res.status(400).json({message: "Checkout already finalized."});
        }else{
            res.status(400).json({message: "Checkout is not paid."});
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error."});
    }
});

module.exports = router;