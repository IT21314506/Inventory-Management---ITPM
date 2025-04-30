import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../components/UserContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import config from '../config/config';

const AddProduct = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState(0);
    const [imageFile, setImageFile] = useState(null); 
    const [errorMessage, setErrorMessage] = useState('');
    const { userProfile } = useContext(UserContext);
    const [storeId, setStoreId] = useState(null);
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    useEffect(() => {
        if (userProfile) {
            const id = userProfile._id;  
            setStoreId(id);  
            console.log("User ID:", userProfile._id);
        }
    }, [userProfile]);
    
    const handleRemoveImage = () => {
        setImageFile(null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate non-negative values
        if (price < 0 || stock < 0) {
            alert("Price and stock cannot be negative.");
            return;
        }
    
        const formData = new FormData();
        formData.append('storeId', storeId); 
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('sku', sku);
        formData.append('price', price);
        formData.append('stock', stock);
        if (imageFile) {
            formData.append('image', imageFile); 
        }
    
        try {
            const response = await fetch(`${config.API_URL}/product/add`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            
            // Reset form fields
            setTitle('');
            setDescription('');
            setCategory('');
            setSku('');
            setPrice('');
            setStock(0);
            setImageFile(null);
            console.log('succesfull');
            
            // Show success notification
            alert("Product added successfully!");
    
            // Optionally navigate to inventory page
            window.location.href = '/inventory'; 
            
        } catch (error) {
            console.error('Error adding product:', error);
            setErrorMessage('Failed to add product. Please try again.');
        }
    };
    

    return (
        <div className="items-center justify-center w-full p-4 font-sans rounded-lg bg-gradient-to-r from-cyan-50 to-cyan-300 h-fit ">
           <h2 className="relative mb-2 -mt-1 text-3xl font-bold text-center text-gray-800">
                Add Product
            </h2>
            {errorMessage && <p className="mb-4 text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="max-h-full p-4 bg-white rounded-md shadow-md">
                        <div>
                            <label className="block font-bold text-gray-700">Title <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
    
                        <div>
                            <label className="block font-bold text-gray-700">Description <span className="text-red-600">*</span></label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
    
                        <div>
                            <label className="block font-bold text-gray-700">Category <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
    
                        <div>
                            <label className="block font-bold text-gray-700">SKU <span className="text-red-600">*</span></label>
                            <input
                                type="text"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
    
                        <div>
                            <label className="block font-bold text-gray-700">Price <span className="text-red-600">*</span></label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(Math.max(0, e.target.value))}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
    
                        <div>
                            <label className="block font-bold text-gray-700">Stock <span className="text-red-600">*</span></label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Math.max(0, e.target.value))}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                    </div>
    
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h3 className="mb-4 text-lg font-semibold text-gray-800">Upload Image</h3>
                        
                        <div>
                            <label className="block font-medium text-gray-700">Select Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                required
                                className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                            />
                        </div>
                    </div>
                    <button 
                    type="submit" 
                    className="w-full py-3 font-bold text-white transition duration-300 ease-in-out transform rounded-md shadow-lg bg-gradient-to-r from-cyan-700 to-teal-500 hover:from-teal-500 hover:to-cyan-700 hover:scale-105"
                >
                    Add Product
                </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;