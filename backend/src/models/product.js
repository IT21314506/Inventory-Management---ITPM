const mongoose =require("mongoose");

const productSchema = new mongoose.Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'user' ,
    },
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number, 
        default: 0,   
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Product', productSchema);