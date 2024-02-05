const express = require('express');
const { fetchUserbyId, updateUser } = require('../controller/User');
const router = express.Router();

router.get('/:id',fetchUserbyId);

router.patch('/:id', updateUser);


exports.router = router;