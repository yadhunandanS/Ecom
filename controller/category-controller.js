const { Category } = require("../models/category");
const joi = require('joi');
const { Product } = require("../models/product");

async function getCategories(req, res) {
    // res.json({ "message": "CATEGORY API" })
    const categories = await Category.find();
    res.json({ categories });
}

async function getCategory(req, res) {
    const _id = req.params.categoryId;
    const category = await Category.find({ _id: _id });
    res.json({ category });
}

async function createCategory(req, res, next) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required()
    })
    const validateResult = schema.validate(req.body);
    if (!validateResult.error) {
        const name = validateResult.value.name;
        const category = new Category({
            name: name
        })
        const result = await category.save();
        return res.json({ result });
    }
    const err = new Error(validateResult.error.details[0].message);
    return next(err);
}

async function getProductsByCategory(req, res, next) {

    const products = await Product.find({ category: req.params.categoryId }).populate('category');
    res.json({ products });
}

module.exports = { getCategories, createCategory, getCategory, getProductsByCategory };