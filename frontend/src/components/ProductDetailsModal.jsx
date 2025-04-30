import React from "react";
import { motion } from "framer-motion";

const ProductDetailsModal = ({ product, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl"
            >
                <h2 className="mb-4 text-2xl font-bold text-teal-600">Product Details</h2>
                <div className="space-y-3">
                    {/* Product Image */}
                    {product.imageUrl ? (
                        <div className="flex justify-center">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="object-cover w-full h-48 rounded-lg"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=No+Image")}
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <img
                                src="https://via.placeholder.com/150?text=No+Image"
                                alt="No Image"
                                className="object-cover w-full h-48 rounded-lg"
                            />
                        </div>
                    )}
                    <p><span className="font-semibold text-gray-700">Title:</span> {product.title}</p>
                    <p><span className="font-semibold text-gray-700">Category:</span> {product.category}</p>
                    <p><span className="font-semibold text-gray-700">SKU:</span> {product.sku}</p>
                    <p><span className="font-semibold text-gray-700">Price:</span> ${product.price.toFixed(2)}</p>
                    <p>
                        <span className="font-semibold text-gray-700">Stock:</span>{" "}
                        <span className={product.stock === 0 ? "text-red-600 font-bold" : "text-gray-600"}>
                            {product.stock === 0 ? "Out of Stock" : product.stock}
                        </span>
                    </p>
                </div>
                <div className="flex justify-end mt-6">
                    <motion.button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-teal-600 rounded-full hover:bg-teal-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetailsModal;