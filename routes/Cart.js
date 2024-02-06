const express = require('express');
const { addToCart, fetchCartByUser } = require('../controller/Cart');

const router =express.Router();

//   /products is already added in basee path
router.post('/', addToCart);
router.get('/', fetchCartByUser);
exports.router = router;