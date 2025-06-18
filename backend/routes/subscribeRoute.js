const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

//@route POST /api/subscribe
//@desc Subscribe to newsletter
//@access public
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if(!email) {
        return res.status(400).json({message: "Email is required."});
    }

    try {
        //check if already subscribe
        let subscriber = await Subscriber.findOne({ email });

        if(subscriber){
            res.status(400).json({message: "Email is already subscribe."})
        }

        //create a nre subscriber 
        subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({message: "Successfully subscribe to newsletter."})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "server error."});
    }
});

module.exports = router;