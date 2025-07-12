# 🛒 QuickKart – Full-Stack E-Commerce Web Application

**QuickKart** is a modern, responsive, and fully-featured e-commerce platform built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It allows users to browse, search, and shop for clothing products with a secure login system and online payment integration. The admin dashboard facilitates easy management of products, orders, and users.

## 🚀 Live Demo

👉 https://quick-kart-pliv.vercel.app/

## 📦 Features

- 👥 User registration and secure login (JWT-based)
- 🛍️ Browse products by category, brand, size, color
- 🔍 Advanced filtering and search functionality
- 🛒 Cart management for guests and registered users
- 💳 PayPal payment integration
- 📬 Email confirmation on successful order
- 👑 Admin dashboard: Manage products, users, and orders
- 📱 Responsive design for all screen sizes

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Auth**: JSON Web Tokens (JWT)
- **Payments**: PayPal
- **Cloud**: Vercel (Frontend), Render/Host for Backend

## 🧑‍💻 How to Run Locally
# Clone the repository
git clone https://github.com/ompatel2109/QuickKart.git
cd QuickKart

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Run backend server (in one terminal)
npm start

# Run frontend (in another terminal)
cd ../frontend
npm start


```bash
## 📁 Project Structure
QuickKart/
├── backend/
│   ├── config/              # Database and environment config
│   ├── data/                # Dummy data and seeder scripts
│   ├── middleware/          # Auth, error, and other custom middleware
│   ├── models/              # Mongoose schemas (User, Product, Order)
│   ├── routes/              # API route handlers
│   ├── node_modules/        # Backend dependencies
│   ├── .env                 # Backend environment variables
│   ├── package.json         # Backend dependencies and scripts
│   ├── server.js            # Entry point of the Express server
│   ├── seeder.js            # Script to seed the database
│   └── vercel.json          # Backend Vercel deployment config
│
├── frontend/
│   ├── public/              # Static files and assets
│   ├── src/                 # React components, pages, and routes
│   ├── node_modules/        # Frontend dependencies
│   ├── .env                 # Frontend environment variables
│   ├── .gitignore           # Files to ignore in version control
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Frontend dependencies and scripts
│   ├── index.html           # HTML template
│   ├── README.md            # Project documentation
│   └── vercel.json          # Frontend Vercel deployment config
│
└── .gitignore               # Global ignore file


