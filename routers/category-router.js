const express = require('express');
const categoryRouter = express.Router();
const { getCategories, createCategory, getCategory, getProductsByCategory } = require('../controller/category-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

categoryRouter.get('', getCategories);
categoryRouter.get('/:categoryId', getCategory);
categoryRouter.get('/:categoryId/products', getProductsByCategory);

categoryRouter.post('', adminAuthMiddleware, createCategory);

module.exports = { categoryRouter };