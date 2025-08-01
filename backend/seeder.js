//admin id password

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const  products = require("./data/products");

dotenv.config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

//function to seed the data
const seedData = async () => {
    try {
        //clear the previous data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        //create a default admin user
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin123@gmail.com",
            password: "admin123",
            role: "admin",
        });

        //assign the default user ID to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return{...product, user: userID};
        });

        //insert the products into the database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully!");
        process.exit();

    } catch (error) {
        console.error("Error seeding the data: ",error);
        process.exit();
    }
};

seedData();