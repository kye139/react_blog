const express = require('express');
const authCtrl = require('./auth.ctrl.js');
const { isLoggedIn, isNotLoggedIn } = require('../middleware');

const router = express.Router();

router.post('/login', authCtrl.login); // 로그인 기능 api.
router.get('/logout', authCtrl.logout); // 로그아웃 기능 api.
router.post('/join', authCtrl.join); // 회원 가입 기능 api.

module.exports = router;