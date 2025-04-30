import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
import ItemsCard from '../components/items-card';
import ProductUpdateModal from "../components/ProductUpdateModal";
import ProductDetailsModal from "../components/ProductDetailsModal";
import axios from "axios";
import { motion } from "framer-motion";
import config from '../config/config';

const Inventory = () => {
    const { userProfile } = useContext(UserContext);
    const [storeId, setStoreId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [stockFilter, setStockFilter] = useState("all");

    useEffect(() => {
        if (userProfile) setStoreId(userProfile._id);
    }, [userProfile]);

    useEffect(() => {
        if (storeId) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get(`${config.API_URL}/product/store/${storeId}`);
                    setProducts(response.data);
                    setFilteredProducts(response.data);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchProducts();
        }
    }, [storeId]);

    useEffect(() => {
        let filtered = products;

        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (categoryFilter !== "all") {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        if (stockFilter === "inStock") {
            filtered = filtered.filter(product => product.stock > 0);
        } else if (stockFilter === "outOfStock") {
            filtered = filtered.filter(product => product.stock === 0);
        }

        setFilteredProducts(filtered);
    }, [searchQuery, categoryFilter, stockFilter, products]);

    const totalItems = filteredProducts.reduce((acc, product) => acc + (product.stock || 0), 0);
    const totalValue = filteredProducts.reduce((acc, product) => acc + ((product.price || 0) * (product.stock || 0)), 0);
    const order = 0;
    const outOfStockItems = filteredProducts.filter(product => product.stock === 0).length;

    const categories = ["all", ...new Set(products.map(product => product.category))];

    const handleOpenUpdateModal = (product) => {
        setSelectedProduct(product);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedProduct(null);
    };

    const handleOpenDetailsModal = (product) => {
        setSelectedProduct(product);
        setIsDetailsModalOpen(true);
    };

    const handleCloseDetailsModal = () => {
        setIsDetailsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdate = async () => {
        const response = await axios.get(`${config.API_URL}/product/store/${storeId}`);
        setProducts(response.data);
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`${config.API_URL}/product/${productId}`);
            setProducts(products.filter(product => product._id !== productId));
            alert("Product Deleted Successfully");
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
            className="w-full p-6 shadow-lg rounded-xl min-h-fit bg-gradient-to-br from-cyan-100 via-white to-cyan-200"
        >
            {loading && <p className="text-center text-gray-500">Loading products...</p>}
            {error && <p className="text-center text-red-500">Error fetching products: {error.message}</p>}

            <ItemsCard
                totalItems={totalItems}
                totalValue={totalValue}
                order={order}
                outOfStockItems={outOfStockItems}
            />

            {/* Filters Section */}
            <div className="flex flex-col gap-4 mt-4 mb-6 md:flex-row">
                <input
                    type="text"
                    placeholder="Search by title or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg md:w-1/3 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg md:w-1/4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                    ))}
                </select>
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg md:w-1/4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                    <option value="all">All Stock</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                </select>
            </div>

            <motion.div 
                className="overflow-auto bg-white border border-gray-100 shadow-md rounded-xl" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <table className="w-full text-left table-auto">
                    <thead className="text-white bg-gradient-to-r from-teal-600 to-cyan-600">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">Title</th>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">Category</th>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">SKU</th>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">Price</th>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">Stock</th>
                            <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <motion.tr 
                                key={product._id} 
                                className="transition duration-300 bg-white border-b hover:bg-gray-50 last:border-0"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <td className="px-6 py-4 font-medium text-gray-900">{product.title}</td>
                                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                                <td className="px-6 py-4 font-semibold text-center text-green-700">${product.price.toFixed(2)}</td>
                                <td className={`px-6 py-4 text-center ${product.stock === 0 ? 'text-red-600 font-bold' : 'text-gray-600'}`}>
                                    {product.stock === 0 ? 'Out of Stock' : product.stock}
                                </td>
                                <td className="px-6 py-4 space-x-2 text-center">
                                    <motion.button
                                        onClick={() => handleOpenDetailsModal(product)}
                                        className="px-4 py-1 text-sm font-semibold text-white transition-colors bg-teal-600 rounded-full hover:bg-teal-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Show Details
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleOpenUpdateModal(product)}
                                        className="px-4 py-1 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Update
                                    </motion.button>
                                    <motion.button
                                        onClick={() => handleDelete(product._id)}
                                        className="px-4 py-1 text-sm font-semibold text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Delete
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            {selectedProduct && (
                <ProductUpdateModal
                    product={selectedProduct}
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdate}
                />
            )}
            {selectedProduct && (
                <ProductDetailsModal
                    product={selectedProduct}
                    isOpen={isDetailsModalOpen}
                    onClose={handleCloseDetailsModal}
                />
            )}
        </motion.div>
    );
};

export default Inventory;