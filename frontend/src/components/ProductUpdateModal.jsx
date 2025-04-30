import React, { useState } from "react";
import axios from "axios";
import config from '../config/config';

const ProductUpdateModal = ({ product, isOpen, onClose, onUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        title: product.title,
        description: product.description,
        category: product.category,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
    });
    const [errors, setErrors] = useState({}); // State to track validation errors

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent negative values for price and stock
        if ((name === "price" || name === "stock") && value < 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be negative`,
            }));
            return;
        }

        // Clear error when value is valid
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation before submission
        if (updatedProduct.price < 0 || updatedProduct.stock < 0) {
            setErrors({
                price: updatedProduct.price < 0 ? "Price cannot be negative" : "",
                stock: updatedProduct.stock < 0 ? "Stock cannot be negative" : "",
            });
            return;
        }

        try {
            await axios.put(`${config.API_URL}/product/${product._id}`, updatedProduct);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center transition-opacity duration-300 bg-black bg-opacity-50">
            <div className="p-6 transition-transform duration-300 transform scale-100 bg-white rounded-lg shadow-lg w-96 hover:scale-105">
                <h2 className="mb-4 text-xl font-semibold text-cyan-600">Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">
                        Title
                        <input
                            type="text"
                            name="title"
                            value={updatedProduct.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-400"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Description
                        <textarea
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-400"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Category
                        <input
                            type="text"
                            name="category"
                            value={updatedProduct.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-400"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        SKU
                        <input
                            type="text"
                            name="sku"
                            value={updatedProduct.sku}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-cyan-400"
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Price
                        <input
                            type="number"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleChange}
                            min="0" // HTML5 min attribute for basic browser validation
                            className={`w-full p-2 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring focus:ring-cyan-400`}
                            required
                        />
                        {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
                    </label>
                    <label className="block mb-2">
                        Stock
                        <input
                            type="number"
                            name="stock"
                            value={updatedProduct.stock}
                            onChange={handleChange}
                            min="0" // HTML5 min attribute for basic browser validation
                            className={`w-full p-2 border ${errors.stock ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring focus:ring-cyan-400`}
                            required
                        />
                        {errors.stock && <span className="text-sm text-red-500">{errors.stock}</span>}
                    </label>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-white transition duration-200 bg-gray-500 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white transition duration-200 rounded bg-cyan-600 hover:bg-cyan-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductUpdateModal;