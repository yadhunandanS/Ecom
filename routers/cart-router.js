const express = require('express');
const cartRouter = express.Router();
const { getCart, addCart, deleteCart } = require('../controller/cart-controller');
const { userAuthMiddleware } = require('../middlewares/user-auth-middleware');

cartRouter.get('/', userAuthMiddleware, getCart);
cartRouter.post('/', userAuthMiddleware, addCart);
cartRouter.delete('/:cartId', userAuthMiddleware, deleteCart);
module.exports = { cartRouter };