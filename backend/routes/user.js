const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//router to create an account
router.post('/signup', userCtrl.signup);

//router to identify
router.post('/login', userCtrl.login);

module.exports = router;