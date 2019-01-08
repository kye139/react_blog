const express = require('express');
const menuCtrl = require('./menu.ctrl.js');

const router = express.Router();

router.get('/', menuCtrl.getMenuList); // 메뉴 목록 불러오기 api
router.post('/', menuCtrl.editMenuList); // 메뉴 목록 수정 저장 api

module.exports = router;