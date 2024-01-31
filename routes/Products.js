const express = require('express');

const router =express.Router();

//   /products is already added in basee path
router.post('/', createProduct);

exports.router = router;