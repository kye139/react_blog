const joi = require('joi');
const { Link } = require('../../models');

// 북마크 리스트 가져오기 api
/*
{
  list: 북마크 리스트
}
*/
exports.getBookmarkList = async (req, res, next) => {
  try {
    const bookmarks = await Link.findAll();

    res.send(bookmarks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 북마크 리스트에 북마크 추가 api
exports.writeBookmark = async (req, res, next) => {
  // 입력 유효성 검증
  const schema = joi.object().keys({
    title: joi.string().required(),
    URL: joi.string().required()
  });

  const valid = joi.validate(req.body, schema);

  if (valid.error) {
    res.status(400).send('잘못된 요청');
    return;
  }

  // 변수 추출
  const { title, URL } = req.body;

  try {
    // 북마크 이름의 중복 여부 검사
    const result = await Link.findOne({
      where: { title }
    });

    if (result) {
      res.status(400).send('중복된 이름을 사용할 수 없습니다.');
      return;
    }

    await Link.create({ title, URL });

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 북마크 리스트에서 북마크 삭제 api
exports.removeBookmark = async (req, res, next) => {
  const { title } = req.query;

  if (!title) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    Link.destroy({
      where: { title }
    });

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};