const express = require('express');
const { createOrder, fetchOrdersByUser } = require('../controller/Order');

const router =express.Router();

//   /products is already added in basee path
router.post('/', createOrder);
router.get('/own/', fetchOrdersByUser);            
exports.router = router;