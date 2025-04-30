import React from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaShoppingCart, FaWarehouse, FaDollarSign } from "react-icons/fa";
import { motion } from "framer-motion";

const ItemsCard = ({ totalItems, totalValue, order, outOfStockItems }) => {
    return (
        <div className="flex flex-col gap-5 p-4 sm:flex-row sm:justify-around md:gap-4 lg:gap-5">
            {/* Products Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row items-center justify-center w-full p-6 text-white rounded-lg shadow-md bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-r hover:from-cyan-400 hover:via-cyan-500 hover:to-cyan-600 sm:w-auto sm:flex-1"
            >
                <AiOutlineProduct className="text-3xl" />
                <p className="ml-3 text-lg font-semibold">Products :</p>
                <p className="ml-3 text-2xl font-bold">{totalItems}</p>
            </motion.div>

            {/* Orders Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-row items-center justify-center w-full p-6 text-white rounded-lg shadow-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 sm:w-auto sm:flex-1"
            >
                <FaDollarSign className="text-3xl " />
                <p className="ml-3 text-lg font-semibold">Value :</p>
                <p className="ml-3 text-2xl font-bold">${totalValue}</p>
            </motion.div>

            {/* Cart Card */}
         {/**    <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-row items-center justify-center w-full p-6 text-white rounded-lg shadow-md bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-r hover:from-green-500 hover:via-green-600 hover:to-green-700 sm:w-auto sm:flex-1"
            >
                <FaShoppingCart className="text-3xl " />
                <p className="ml-3 text-lg font-semibold">Orders :</p>
                <p className="ml-3 text-2xl font-bold">{order}</p>
            </motion.div>
*/}
            {/* Warehouse Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-row items-center justify-center w-full p-6 text-white rounded-lg shadow-md bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-r hover:from-red-600 hover:via-red-700 hover:to-red-800 sm:w-auto sm:flex-1"
            >
                <FaWarehouse className="text-3xl " />
                <p className="ml-3 text-lg font-semibold">Out Of Stock :</p>
                <p className="ml-3 text-2xl font-bold">{outOfStockItems}</p>
            </motion.div>
        </div>
    );
};

export default ItemsCard;
