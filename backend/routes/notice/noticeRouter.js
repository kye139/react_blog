const express = require('express');
const noticeCtrl = require('./notices.ctrl.js');

const router = express.Router();

router.get('/', noticeCtrl.getList); // 공지 목록 및 마지막 페이지 가져오기 api - 쿼리: 해당 페이지 번호
router.get('/:id', noticeCtrl.getNotice); // 공지사항 내용 가져오기 api - params: 해당 공지사항 id
router.post('/', noticeCtrl.writeNotice); // 공지사항 작성하기 api
router.patch('/:id', noticeCtrl.updateNotice); // 공지사항 수정하기 api - params: 해당 공지사항 id
router.delete('/:id', noticeCtrl.removeNotice); // 공지사항 삭제하기 api - params: 해당 공지사항 id

module.exports = router;