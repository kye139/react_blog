const express = require('express');
const bookmarkRouter = require('./bookmark');
// const menuRouter = require('./menu');
const noticeRouter = require('./notice');
// const postRouter = require('./post');

const router = express.Router();

router.use('/bookmark', bookmarkRouter);
// router.use('/menu', menuRouter);
router.use('/notice', noticeRouter);
// router.use('/post', postRouter);

module.exports = router;