const removeMd = require('remove-markdown');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {
  Category, Content, Tag, Comment, sequelize
} = require('../../models');

// 게시물 목록 가져오기 api. query: id=카테고리 아이디, page=페이지번호
/* 출력
{
  posts: ...포스트 목록들,
  lastPage: 마지막 페이지 번호
}
*/
exports.getPostList = async (req, res, next) => {
  const { id, page } = req.query;
  const NUM_OF_POSTS = 6; // 한 페이지에서 보여줄 최대 포스트의 갯수

  try {
    // 입력 유효성 검증
    if ((!id || !page)) {
      res.status(400).send('잘못된 요청');
      return;
    }

    const posts = await Content.findAll({
      where: { id },
      order: [['createdAt', 'DESC']],
    });

    const lastPage = Math.ceil(posts.length / NUM_OF_POSTS); // 마지막 페이지 번호
    const start = NUM_OF_POSTS * (page - 1); // 포스트 목록들 중 출력 시작 index;
    const resultPosts = posts.slice(start, start + NUM_OF_POSTS); // 출력할 포스트 목록.

    const result = resultPosts.map(
      post => {
        const data = fs.readFileSync(post.contents); // contents 컬럼의 주소로 게시물을을 읽어옴
        const mdString = removeMd(data.toString()); // 마크다운 기호 제거(마크업 언어)
        return {
          post, // 게시글 메타 정보
          summary: mdString.length < 350 ? mdString : `${mdString.slice(0, 350)}...` // 요약
        };
      }
    );
    res.json({
      posts: result,
      lastPage
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 태그에 해당하는 게시물 목록 가져오기 api. query: title=태그 이름. page=페이지번호
/* 출력
{
  posts: [ (포스트 목록 배열)
    post: {
      id,
      title,
      createdAt,
      ...
      tags: [
        해당 포스트의 태그 목록들.
      ]
      category: {
        id, name
      }
    },
    summary (요약)
  ],
  lastPage (마지막 페이지 번호)
}
*/
exports.getPostsByTags = async (req, res, next) => {
  const { title, page } = req.query;
  const NUM_OF_POSTS = 6; // 한 페이지에서 보여줄 최대 포스트의 갯수

  try {
    if (!title || !page) {
      res.status(400).send('잘못된 요청');
    }

    const tag = await Tag.findOne({ where: { title } });
    const posts = await tag.getContents({
      include: [{
        model: Tag,
        attributes: ['id', 'title'],
      }, {
        model: Category,
        attributes: ['id', 'name'],
      }],
      order: [['createdAt', 'DESC']],
    });

    const lastPage = Math.ceil(posts.length / NUM_OF_POSTS); // 마지막 페이지 번호
    const start = NUM_OF_POSTS * (page - 1); // 포스트 목록들 중 출력 시작 index;
    const resultPosts = posts.slice(start, start + NUM_OF_POSTS); // 출력할 포스트 목록.

    const result = resultPosts.map(
      post => {
        const data = fs.readFileSync(post.contents); // contents 컬럼의 주소로 게시물을을 읽어옴
        const mdString = removeMd(data.toString()); // 마크다운 기호 제거(마크업 언어)
        return {
          post, // 게시글 메타 정보
          summary: mdString.length < 350 ? mdString : `${mdString.slice(0, 350)}...` // 요약
        };
      }
    );
    res.json({
      posts: result,
      lastPage
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시물 내용 가져오기 api. params: id-게시물 id
/* 출력
{
  id,
  title,
  createdAt,
  contents (포스트 파일 경로가 아닌 포스트 내용),
  tags: [

  ],
  category: {
    id,
    name
  }
}
*/
exports.getPost = async (req, res, next) => {
  const { id } = req.params;
  // 입력 유효성 검증
  if (!id) {
    res.status(400).send('잘못된 요청');
  }

  try {
    const post = await Content.findOne({
      where: { id },
      attributes: ['id', 'title', 'contents', 'createdAt'],
      include: [
        {
          model: Tag,
          attributes: ['id', 'title']
        },
        {
          model: Category,
          attributes: ['id', 'name']
        }
      ]
    });

    if (!post) {
      res.status(400).send('잘못된 요청');
    }

    // 포스트 내용 읽어오기
    const contents = fs.readFileSync(post.contents).toString();
    const result = post.toJSON();

    res.json({
      ...result,
      contents
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 해당 게시물의 코멘트 가져오기 api. params: id-게시물 id
exports.getComment = async (req, res, next) => {
  const { id } = req.params;

  // 입력 유효성 검증
  if (!id) {
    res.status(400).send('잘못된 요청');
  }

  try {
    const comments = await Comment.findAll({
      where: { contentId: id },
      order: [['parentId', 'ASC'], ['createdAt', 'ASC']]
    });

    res.send(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시물 등록하기 api. body=>menuId(카테고리 id) title(포스트 제목)
// contents(포스트 내용), tagList(포스트의 태그 리스트)
exports.writePost = async (req, res, next) => {
  const {
    menuId, title, contents, tagList
  } = req.body;
  let tags;

  if ((!title || !contents || !menuId)) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    // contents 내용을 파일로 저장
    const postPath = 'uploads/posts';
    const fileName = title + new Date().valueOf();

    fs.writeFile(path.join(postPath, fileName), contents, (err) => {
      if (err) {
        throw err;
      }
    });

    // 태그 목록 파싱
    if (tagList) {
      tags = [...new Set(tagList.split(',').map(tag => tag.trim()))];
    }

    // 카테고리 존재 여부 확인
    const category = await Category.findOne({ where: { id: menuId } });

    if (!category) {
      res.status(400).send('잘못된 요청');
      return;
    }

    const result = await Content.create({
      title,
      contents: path.join(postPath, fileName),
      categoryId: menuId
    });

    // DB에서 태그 목록들에 대해 포스트와 연결
    if (tagList) {
      for (const i in tags) {
        // Tag 테이블에 태그 목록들 저장.
        const tagResult = await Tag.findOrCreate({
          where: { title: tags[i] }
        });

        // 포스트와 태그 목록 연결
        result.addTags(tagResult[0].id);
      }
    }

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 코멘트 등록하기 api. params: id- 게시물 id. body=>name(코멘터 이름), password(코멘트 암호), message(코멘트 내용)
// commentType(코멘트의 타입(main/sub)), parentId(코멘트가 sub인 경우 부모 코멘트의 id)
exports.writeComment = async (req, res, next) => {
  const {
    name, password, message, commentType, parentId
  } = req.body;
  const { id } = req.params;

  // 입력 유효성 검증
  if ((!password || !message || !name || !commentType) || (commentType !== 'main' && commentType !== 'sub')) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    // 메인 코멘트인 경우
    if (commentType === 'main') {
      Comment.create({
        name,
        password: hash,
        contents: message,
        commentType: 'main',
        contentId: id
      });
    } else {
      // 코멘트의 코멘트인 경우
      const parent = await Comment.findOne({ where: { id: parentId } });

      if (!parent) {
        res.status(400).send('잘못된 요청');
        return;
      }

      Comment.create({
        name,
        password: hash,
        contents: message,
        commentType: 'sub',
        contentId: id,
        parentId
      });
    }
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 포스트 수정하기 api. params: id-게시물 id
// body=> title(포스트 제목), contents(포스트 내용), tagList(태그 목록)
exports.editPost = async (req, res, next) => {
  const { id } = req.params;
  const { title, contents, tagList } = req.body;
  let tags;

  try {
    // id에 해당하는 포스트 여부 검증
    const result = await Content.find({ where: { id } });

    if (result) {
      // 기존 포스트 backups 폴더로 이동.
      fs.copyFileSync(result.dataValues.contents, 'uploads/backups/' + new Date().valueOf());
      fs.unlink(result.dataValues.contents, (err) => {
        if (err) {
          throw err;
        }
      });

      const postPath = 'uploads/posts';
      const fileName = title + new Date().valueOf();

      // 포스트 저장
      fs.writeFile(path.join(postPath, fileName), contents, (err) => {
        if (err) {
          throw err;
        }
      });

      Content.update({
        title,
        contents: path.join(postPath, fileName)
      }, {
        where: { id }
      });

      // 태그 목록 수정 (연결 관계 재수립을 위해 지우고 다시 설정)
      const tag = await result.getTags();

      for (const i in tag) {
        const tagContents = await tag[i].getContents();

        // 연결관계 삭제
        sequelize.query('DELETE FROM contentTag WHERE contentId=? and tagId=?', {
          replacements: [parseInt(id, 10), tag[i].dataValues.id]
        });

        // 기존의 태그에 연결된 포스트가 1개였을 경우 -> 태그를 삭제
        if (tagContents.length === 1) {
          Tag.destroy({ where: { id: tag[i].dataValues.id } });
        }
      }

      // 태그 목록 다시 저장
      if (tagList) {
        tags = [...new Set(tagList.split(',').map(unit => unit.trim()))];
      }

      // DB에서 태그 목록들에 대해 포스트와 연결
      if (tagList) {
        for (const i in tags) {
          // Tag 테이블에 태그 목록들 저장.
          const tagResult = await Tag.findOrCreate({
            where: { title: tags[i] }
          });

          // 포스트와 태그 목록 연결
          result.addTags(tagResult[0].id);
        }
      }

      res.send('success');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 코멘트 수정하기 api. params: id-게시물 id, comment-댓글 id
// body=> password(코멘트 패스워드), message(수정 코멘트 내용)
exports.editComment = async (req, res, next) => {
  const { id, comment } = req.params;
  const { password, message } = req.body;

  // 입력 유효성 검증
  if (!password) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    // 코멘트 존재 여부 확인
    const comm = await Comment.findOne({ where: { id: comment, contentId: id } });

    if (!comm) {
      res.status(400).send('잘못된 요청');
      return;
    }

    // 코멘트 패스워드 비교
    const compare = await bcrypt.compare(password, comm.password);

    // 패스워드가 일치하는 경우
    if (compare) {
      Comment.update({ contents: message }, { where: { id: comment } });
      res.send('success');
    } else {
      // 패스워드가 일치하지 않은 경우
      res.status(400).send('잘못된 요청');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 삭제하기 api. params: id-게시물 id
exports.removePost = async (req, res, next) => {
  const { id } = req.params;

  try {
    const content = await Content.find({ where: { id } });

    // 삭제 대상 포스트의 태그 목록들을 가져옴 ( 연결 관계를 끊고 마지막 태그는 삭제하기 위해 )
    const tags = await content.getTags();

    for (const i in tags) {
      // 각 태그를 포함하고 있는 포스트를 가져옴 => 해당 포스트 하나만 태깅 중인 태그 삭제.
      const tagContents = await tags[i].getContents();

      // 태그와 포스트의 연결관계 삭제
      sequelize.query('DELETE FROM contenttag WHRER contentId=? and tagId=?', {
        replacements: [parseInt(id, 10), tags[i].dataValues.id]
      });

      // 해당 포스트 하나만 태깅 중인 태그 삭제.
      if (tagContents.length === 1) {
        Tag.destroy({ where: { id: tags[i].dataValues.id } });
      }
    }

    // 해당 포스트의 모든 코멘트 삭제
    Comment.destroy({ where: { contentId: content.dataValues.id } });
    // 해당 포스트 삭제
    Content.destroy({ where: { id } });

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 코멘트 삭제하기 api. params: id-게시물 id, comment-댓글 id
// body=> password(코멘트 비밀번호)
exports.removeComment = async (req, res, next) => {
  const { id, comment } = req.params;
  const { password } = req.body;

  // 입력 유효성 검증
  if (!password) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    const comm = await Comment.find({ where: { id: comment, contentId: id } });

    if (!comm) {
      res.status(400).send('잘못된 요청');
      return;
    }

    // 코멘트 패스워드 비교
    const result = await bcrypt.compare(password, comment.password);

    if (result) {
      // 자식 코멘트가 존재하는가
      const childComment = await Comment.findAll({ where: { parentId: comm.dataValues.id } });

      // 자식 코멘트 존재 시 삭제 불가.
      if (childComment.length) {
        res.status(400).send('잘못된 요청');
        return;
      }

      Comment.destroy({ where: { id: comment } });

      res.send('succes');
    } else {
      // 비밀번호가 틀린 경우
      res.status(400).send('잘못된 요청');
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
