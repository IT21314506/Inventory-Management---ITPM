import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import image from "../assets/stockMaster.png"; // Your image path

const AnimatedImage = () => {
    // Define animation variants
    const variants = {
        hidden: { opacity: 0, scale: 0.8 }, // Initial state
        visible: { opacity: 1, scale: 1 },   // Final state
        hover: { scale: 1.1 },               // Scale up on hover
        tap: { scale: 0.95 }                  // Scale down on click
    };

    return (
        <div className="flex items-center justify-center">
            <motion.img 
                src={image} 
                alt="Stock Master" 
                initial="hidden" // Set initial state
                animate="visible" // Animate to visible state
                variants={variants} // Apply the defined variants
                transition={{ duration: 0.5 }} // Duration of the animation
                whileHover="hover" // Trigger hover animation
                whileTap="tap"     // Trigger tap animation on click
                className="rounded-lg shadow-lg cursor-pointer" // Tailwind CSS classes for styling
            />
        </div>
    );
};

export default AnimatedImage;