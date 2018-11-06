const express = require('express')
const router = express.Router()
const controller = require('../controller/user.js')

// 分发路由
router.post('/register', controller.handleRegisterPost);

router.post('/login', controller.handleLoginPost);

module.exports = router