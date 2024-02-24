const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product',
            required: true
        },
        quantity: { type: Number, required: true }
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    price: {
        type: Number,
        require: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Cart = mongoose.model('cart', cartSchema);

module.exports = { Cart };