const express = require('express');
const { userAuthMiddleware, adminAuthMiddleware } = require('../middlewares/user-auth-middleware')
const orderRouter = express.Router();
const { getOrders, placeOrder, getAllOrders, getOrdersByUserId, deleteOrder, updateOrder } = require('../controller/order-controller');

orderRouter.get('/', userAuthMiddleware, getOrders);
orderRouter.post('/', userAuthMiddleware, placeOrder);
orderRouter.get('/all', adminAuthMiddleware, getAllOrders);
orderRouter.get('/:user_id/orders', getOrdersByUserId);
orderRouter.delete('/:orderId', userAuthMiddleware, deleteOrder);
orderRouter.put('/:orderId', userAuthMiddleware, updateOrder);

module.exports = { orderRouter };