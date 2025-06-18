const express = require("express");
const Product = require("../models/Product");
const  { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route /api/admin/products
//@desc Get all products (Admin only)
//@access Private
router.get("/", protect, admin, async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({messgae: "Server error"});
    }
}); 

module.exports = router;