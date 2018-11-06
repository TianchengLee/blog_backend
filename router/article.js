const express = require('express')
const controller = require('../controller/article.js')
const router = express.Router()

router.get('/getArticles', controller.handleGetArticles);

router.post('/article/add', controller.handleArticleAddPost);

router.get('/article/info/:id', controller.handleArticleInfoGet);

module.exports = router