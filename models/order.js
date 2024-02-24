const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart: {
        type: mongoose.Types.ObjectId,
        ref: 'cart',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        default: "COD"
    },
    status: {
        type: String,

        default: "NotPaid"
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const Order = mongoose.model('order', orderSchema);;

module.exports = { Order }