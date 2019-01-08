const { Category } = require('../../models');

// 메뉴 목록 불러오기 api
exports.getMenuList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['order', 'asc']]
    });

    res.send(categories);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 메뉴 목록 수정 저장 api
/* 입력 categoryList
{
  id: 기존에 존재했던 카테고리의 경우 id가 존재, 새로 추가된 카테고리의 경우 null
  name: 카테고리 이름
  type: alone / main / sub
} 의 배열
*/
/* 입력 deleteList
[
  id: 삭제될 카테고리 id
]
*/
exports.editMenuList = async (req, res, next) => {
  const { categoryList, deleteList } = req.body;

  try {
    // 삭제 카테고리 리스트를 DB에서 삭제
    if (deleteList) {
      for (const i in deleteList) {
        Category.destroy({ where: { id: deleteList[i] } });
      }
    }

    if (categoryList) {
      for (const i in categoryList) {
        const name = categoryList[i].name;
        const type = categoryList[i].type;
        const id = categoryList[i].id;

        // 기존에 카테고리가 존재하는 경우
        if (id) {
          Category.update({
            name,
            type,
            order: i + 1
          }, {
            where: { id }
          });
        } else {
          // 새로운 카테고리가 추가된 경우
          Category.create({
            name,
            type,
            order: i + 1
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};