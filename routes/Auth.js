const express = require('express');
const { createUser, loginUser, checkAuth, logout } = require('../controller/Auth');
const passport = require('passport');
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check', passport.authenticate('jwt'), checkAuth);
// router.post('/login', loginUser);
router.get('/logout',logout)

exports.router = router;