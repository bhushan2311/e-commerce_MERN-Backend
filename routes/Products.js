const express = require('express');
const { fetchAllProducts, createProduct } = require('../controller/Product');

const router =express.Router();

//   /products is already added in basee path
router.post('/', createProduct);
router.get('/', fetchAllProducts);
exports.router = router;