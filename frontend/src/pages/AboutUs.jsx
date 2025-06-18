import React from "react";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-800 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-red-500"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
        >
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">About <span className="text-red-500">QuickKart</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Empowering your shopping journey — fast, simple, and always reliable.
                </p>
        </motion.h1>

        {/* Intro */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-md mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={1}
        >
          <h2 className="text-2xl font-bold mb-3 text-black">Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            QuickKart is a dynamic and user-friendly e-commerce platform dedicated to making your online shopping experience smooth, secure, and enjoyable. Whether you're shopping for the latest trends, essentials, or electronics, we've got you covered — all at your fingertips.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-md mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={2}
        >
          <h2 className="text-2xl font-bold mb-3 text-black">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a world where online shopping is not only fast and reliable but also deeply personalized. Our mission is to create a platform that anticipates your needs, adapts to your preferences, and delivers joy with every order.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-md mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={3}
        >
          <h2 className="text-2xl font-bold mb-3 text-black">Our Core Values</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li><strong>Customer First:</strong> Every decision revolves around your satisfaction.</li>
            <li><strong>Innovation:</strong> We embrace modern tech to deliver top-tier features and performance.</li>
            <li><strong>Trust:</strong> Secure transactions, timely delivery, and transparent communication.</li>
            <li><strong>Sustainability:</strong> We support ethical brands and reduce environmental impact.</li>
          </ul>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-md mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={4}
        >
          <h2 className="text-2xl font-bold mb-3 text-black">Why Choose QuickKart?</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li>Lightning-fast checkout and seamless user experience.</li>
            <li>AI-driven recommendations and personalized deals.</li>
            <li>Trusted by 10,000+ happy customers across the globe.</li>
            <li>24/7 support and easy returns/refunds.</li>
          </ul>
        </motion.div>

        {/* Our Journey */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-2xl shadow-md"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={5}
        >
          <h2 className="text-2xl font-bold mb-3 text-black">Our Journey</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2024 by a team of passionate developers and entrepreneurs, QuickKart started as a college project and quickly evolved into a full-fledged e-commerce solution. Today, we continue to grow, innovate, and redefine the way people shop online — with speed, trust, and style.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
