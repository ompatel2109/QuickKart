const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/orders/my-orders
//@access Private
//@desc get loggedin user's orders
router.get("/my-orders", protect, async (req, res) => {
    try {
        //find orders for the authenticated user
        const orders = await Order.find({ user: req.user._id}).sort({createdAt: -1,});//sort by mostrecent order
        res.json(orders);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error."});
    }
});

//@route GET /api/orders/:id
//@desc get orders by id
//@access private
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if(!order){
            return res.status(404).json({message: "Order not found."});
        }

        //return the full order deatails
        res.json(order);

    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error."})
    }
});

module.exports = router;