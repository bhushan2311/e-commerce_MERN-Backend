const express = require('express');
const { fetchAllProducts, createProduct, fetchProductById } = require('../controller/Product');

const router =express.Router();

//   /products is already added in basee path
router.post('/', createProduct);
router.get('/', fetchAllProducts);
router.get('/:id', fetchProductById);
exports.router = router;