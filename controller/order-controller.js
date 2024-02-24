const joi = require('joi');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { Order } = require('../models/order');
const { Product } = require("../models/product");
const { getUserIdByToken } = require('../middlewares/getIdByToken');
const { Cart } = require('../models/cart');


async function getOrders(req, res, next) {
    try {
        const user = getUserIdByToken(req.headers.authorization);
        const orders = await Order.find({ user: user }).populate('cart');
        res.json(orders);
    } catch (err) {
        return next(err);
    }
}
async function getOrdersByUserId(req, res, next) {
    try {
        const user = req.params.user_id;
        const orders = await Order.find({ user: user }).populate('cart');
        res.json(orders);
    } catch (err) {
        return next(err);
    }
}
async function getAllOrders(req, res, next) {
    try {
        const orders = await Order.find().populate('cart');
        res.json(orders);
    } catch (err) {
        return next(err);
    }
}


//product,user,address,quantity
async function placeOrder(req, res, next) {
    const user = getUserIdByToken(req.headers.authorization);
    const cart = await Cart.findOne({ user: user });
    console.log(cart);
    if (!cart) {
        return next(new Error("No cart added"));
    }
    const schema = joi.object({
        cart: joi.string().required(),
        address: joi.string().required(),
        paymentType: joi.string().required(),
        status: joi.string()
    });
    const result = schema.validate(req.body);
    if (result.error) {
        return next(new Error(result.error.details[0].message));
    }

    const order = result.value;
    order.user = user;

    if (order.user == cart.user && order.cart == cart._id) {
        const orderResult = await new Order(order).save();
        res.json(orderResult);
    } else {
        return next(new Error("Cart ID and UserID does not match"));
    }
}
async function deleteOrder(req, res, next) {
    try {
        const _id = req.params.orderId;
        const user = getUserIdByToken(req.headers.authorization);
        const result = await Order.deleteOne({ _id, user });

        if (result.deletedCount === 0) throw new Error("No such order in your account");
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function updateOrder(req, res, next) {
    const _id = req.params.orderId;

    const schema = joi.object({
        status: joi.string().required()
    });
    const body = schema.validate(req.body);
    if (body.error) {
        return next(new Error(body.error.details[0].message));
    }
    const user = getUserIdByToken(req.headers.authorization);
    const result = await Order.findOneAndUpdate({ _id, user }, { $set: body }, { new: true });

    if (!result) {
        return next(new Error("You have no such order"));
    }
    res.json(result)
}

module.exports = { getOrders, placeOrder, getAllOrders, getOrdersByUserId, deleteOrder, updateOrder };