const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,

    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    productImage: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    active: { type: Boolean, default: true }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Product = mongoose.model('product', productSchema);;

module.exports = { Product }