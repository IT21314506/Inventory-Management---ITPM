// routes/productRoute.js
const express = require('express');
const multer = require('multer');
const { addProduct, getProducts, getProductByID,getProductsByUId, updateProduct, deleteProduct } = require("../controller/productController");

const route = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post('/add', upload.single('image'), addProduct);
route.get('/', getProducts);
route.get('/:id', getProductByID);
route.put('/:id', updateProduct);
route.delete('/:id', deleteProduct);
route.get('/store/:uid',getProductsByUId);

module.exports = route;
