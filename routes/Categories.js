const express = require('express');
const { fetchAllCategories } = require('../controller/Categories');

const router =express.Router();

//   /Brands is already added in basee path
router.get('/', fetchAllCategories);
exports.router = router;