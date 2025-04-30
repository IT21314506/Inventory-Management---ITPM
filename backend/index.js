const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// User routes
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); 

// User routes
app.use('/api/user', userRoutes);
//Product routes
app.use('/api/product',productRoutes)

app.get('/', (req, res) => {
    res.send('Hello');
  });

// MongoDB Connection
const url = process.env.MONGODB_URL;

mongoose.connect(url)
    .then(() => {
        console.log("MongoDB Connection Success!");
           mongoose.connection.once("open", () => {
            console.log("MongoDB is ready!");
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); 
    });

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
