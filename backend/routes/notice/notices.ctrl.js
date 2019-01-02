const joi = require('joi');

const { Notice } = require('../../models');

// 공지 목록 및 마지막 페이지 가져오기 api
/* {
  count: 마지막 페이지 번호,
  list: 공지사항 목록
} */
exports.getList = async (req, res, next) => {
  const { page } = req.query;
  const NUM_OF_NOTICES = 10; // 한 페이지에 표시할 공지의 갯수

  try {
    const notices = await Notice.findAll({
      order: [['createdAt', 'DESC']], // 작성일자 기준 내림차순.
    });

    const lastPage = Math.ceil(notices.length / NUM_OF_NOTICES); // 마지막 페이지 번호
    const start = NUM_OF_NOTICES * (page - 1); // 페이지 시작 번째 공지사항
    const result = notices.slice(start, start + NUM_OF_NOTICES); // 출력할 공지사항 목록.

    res.send({ lastPage, list: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공지사항 내용 가져오기 api
exports.getNotice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const notice = await Notice.findOne({ where: { id } });
    res.send(notice);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공지사항 작성하기 api
// 작성 후 해당 공지 내용으로 리다이렉트
exports.writeNotice = async (req, res, next) => {
  try {
    // 입력 유효성 검증
    const schema = joi.object().keys({
      title: joi.string().required(),
      editor1: joi.string(),
    });

    const valid = joi.validate(req.body, schema);

    if (valid.error) {
      res.status(400).send('잘못된 요청');
      return;
    }

    // 변수 추출
    const { title, editor1 } = req.body;

    const result = await Notice.create({
      title,
      contents: editor1,
    });

    // DB 추가 에러 발생
    if (!result) {
      res.status(400).send('Server Error');
      return;
    }

    // 해당 공지사항 내용으로 리다이렉트
    res.redirect('/notice/' + result.id);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공지사항 수정하기 api
// 수정 후 해당 공지 내용으로 리다이렉트
exports.updateNotice = async (req, res, next) => {
  // 입력 유효성 검증
  const schema = joi.object().keys({
    title: joi.string().required(),
    editor1: joi.string(),
  });

  const valid = joi.validate(req.body, schema);

  if (valid.error) {
    res.status(400).send('잘못된 요청');
    return;
  }

  // 변수 추출
  const { title, editor1 } = req.body;
  const { id } = req.params;

  try {
    const result = await Notice.update({
      title,
      contents: editor1,
    }, {
      where: { id },
    });

    // DB 추가 에러 발생
    if (!result) {
      res.status(400).send('Server Error');
      return;
    }

    // 해당 공지사항 내용으로 리다이렉트
    res.redirect(303, '/notice/' + id);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공지사항 삭제하기 api
// 삭제 후 공지 리스트로 리다이렉트
exports.removeNotice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Notice.destroy({
      where: { id },
    });

    // DB 추가 에러 발생
    if (!result) {
      res.status(400).send('Server Error');
      return;
    }

    // 공지 리스트로 리다이렉트
    res.redirect(303, '/notice?page=1');
  } catch (error) {
    console.error(error);
    next(error);
  }
};