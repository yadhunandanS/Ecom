const express = require('express');
const multer = require('multer');

const productRouter = express.Router();
const { getProducts, createProduct, getProduct } = require('../controller/product-controller');
const { adminAuthMiddleware } = require('../middlewares/user-auth-middleware');

//multer file upload===
const path = require('path');
const mongoose = require('mongoose');
const { UPLOAD_FOLDER } = process.env;
const tempMulter = multer({ dest: UPLOAD_FOLDER });

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const filePath = path.join(__dirname, "../") + UPLOAD_FOLDER;
        cb(null, filePath);
    },
    filename: function(req, file, cb) {
        const fileName = new mongoose.Types.ObjectId() + ".jpg";
        cb(null, fileName);
    }
})
var upload = multer({ storage });
//====================================

productRouter.get('', getProducts);
productRouter.get('/:productId', getProduct);
productRouter.post('', adminAuthMiddleware, upload.single('image'), createProduct);

module.exports = { productRouter };