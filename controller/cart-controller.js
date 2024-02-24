const joi = require('joi');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;
const { Cart } = require('../models/cart');
const { Product } = require('../models/product');
const { getUserIdByToken } = require('../middlewares/getIdByToken');
const { User } = require('../models/user')

async function getCart(req, res) {
    const user = getUserIdByToken(req.headers.authorization);
    console.log(user);
    const result = await Cart.find({ user: user });
    if (!result) {
        return next(new Error("no cart found"));
    }
    res.json({ result });
}

async function addCart(req, res, next) {
    const schema = joi.object({
        products: joi.array().required(),

    })

    const result = schema.validate(req.body);

    if (result.error) {
        return next(new Error(result.error.details[0].message));
    }
    try {

        const { products } = result.value;
        const user = getUserIdByToken(req.headers.authorization);
        // console.log(userId);
        let totalPrice = 0;

        for (const pro of products) {
            const { product, quantity } = pro;
            const foundProduct = await Product.findById(product);
            if (!foundProduct) {
                return next(new Error(`Product with ID ${product} not found.`));
            }

            const productPrice = foundProduct.price;

            totalPrice += productPrice * quantity;
        }

        const newCart = new Cart({
            products,
            user: user,
            price: totalPrice
        });

        const savedCart = (await newCart.save());
        res.status(201).json(savedCart);
        res.json({});
    } catch (error) {
        next(error);
    }
}

async function deleteCart(req, res, next) {
    try {
        const _id = req.params.cartId;
        const user = getUserIdByToken(req.headers.authorization);
        const result = await Cart.deleteOne({ _id, user });

        if (result.deletedCount === 0) throw new Error("No such cart in your account");
        res.json(result);
    } catch (err) {
        next(err);
    }
}


module.exports = { getCart, addCart, deleteCart };