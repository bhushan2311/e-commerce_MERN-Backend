const express = require('express');
const { fetchAllBrands } = require('../controller/Brands');

const router =express.Router();

//   /Brands is already added in basee path
router.get('/', fetchAllBrands);
exports.router = router;