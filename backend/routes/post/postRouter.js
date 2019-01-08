const express = require('express');
const postCtrl = require('./post.ctrl.js');

const router = express.Router();

router.get('/', postCtrl.getPostList); // 게시물 목록 가져오기 api. query: id=카테고리 아이디, page=페이지번호
router.get('/tags', postCtrl.getPostsByTags); // 태그에 해당하는 게시물 목록 가져오기 api. query: title=태그 이름. page=페이지번호
router.get('/:id', postCtrl.getPost); // 게시물 내용 가져오기 api. params: id-게시물 id
router.get('/:id/comment', postCtrl.getComment); // 해당 게시물의 코멘트 가져오기 api. params: id-게시물 id

router.post('/', postCtrl.writePost); // 게시물 등록하기 api. body=>menuId(카테고리 id) title(포스트 제목) contents(포스트 내용), tagList(포스트의 태그 리스트)

// 코멘트 등록하기 api. params: id- 게시물 id. body=>name(코멘터 이름), password(코멘트 암호), message(코멘트 내용)
// commentType(코멘트의 타입(main/sub)), parentId(코멘트가 sub인 경우 부모 코멘트의 id)
router.post('/:id/comment', postCtrl.writeComment);

router.patch('/:id', postCtrl.editPost); // 포스트 수정하기 api. params: id-게시물 id / body=> title(포스트 제목), contents(포스트 내용), tagList(태그 목록)
router.patch('/:id/comment/:comment', postCtrl.editComment); // 코멘트 수정하기 api. params: id-게시물 id, comment-댓글 id / body=> password(코멘트 패스워드), message(수정 코멘트 내용)

router.delete('/:id', postCtrl.removePost); // 게시글 삭제하기 api. params: id-게시물 id
router.delete('/:id/comment/:comment', postCtrl.removeComment); // 코멘트 삭제하기 api. params: id-게시물 id, comment-댓글 id / body=> password(코멘트 비밀번호)

module.exports = router;