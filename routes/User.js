const express = require('express');
const { fetchUserbyId, updateUser } = require('../controller/User');
const router = express.Router();

router.get('/own',fetchUserbyId);

router.patch('/:id', updateUser);


exports.router = router;