const express = require('express');
const bookmarkCtrl = require('./bookmarks.ctrl.js');

const router = express.Router();

router.get('/', bookmarkCtrl.getBookmarkList); // 북마크 리스트 가져오기 api
router.post('/', bookmarkCtrl.writeBookmark); // 북마크 리스트에 북마크 추가 api
router.delete('/', bookmarkCtrl.removeBookmark); // 북마크 리스트에서 북마크 삭제 api - query: 삭제 대상 title=title

module.exports = router;