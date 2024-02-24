const { Product } = require('../models/product');
const joi = require('joi');
const { UPLOAD_FOLDER } = process.env;

async function getProducts(req, res) {
    const products = await Product.find();
    res.send(products);
}

async function getProduct(req, res) {
    const _id = req.params.productId;
    const product = await Product.find({ _id: _id });
    res.json(product);
}

async function createProduct(req, res, next) {
    console.log(req.file.filename);

    const productImage = UPLOAD_FOLDER + "/" + req.file.filename;
    const validationResult = validateProduct(req.body);
    if (validationResult.error) {
        return next(new Error(validationResult.error.details[0].message))
    }
    let product = new Product({
        ...(await validationResult).value,
        productImage
    });
    const result = await product.save();
    res.json(result);
    res.end();
}

async function validateProduct(data) {
    //name,price,discount,productImage,category, price
    const productSchema = joi.object({
        name: joi.string().min(4).max(50).required(),
        price: joi.number().min(1).required(),
        discount: joi.number().min(0),
        category: joi.string().required(),
        active: joi.boolean()
    });
    const result = productSchema.validate(data);
    return result;

}

module.exports = { getProducts, createProduct, getProduct };