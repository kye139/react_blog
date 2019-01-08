const passport = require('passport');
const bcrypt = require('bcrypt');

const { User } = require('../../models');

// 로그인 기능 api.
exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(400).send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.send('success');
    });
  });
};

// 로그아웃 기능 api.
exports.logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('success');
};

// 회원 가입 기능 api.
exports.join = async (req, res, next) => {
  const { id, password } = req.body;

  // 입력 유효성 검증
  if (!id || !password) {
    res.status(400).send('잘못된 요청');
    return;
  }

  try {
    const exUser = await User.find({ where: { user_id: id } });

    if (exUser) {
      res.status(400).send('이미 존재하는 계정');
      return;
    }

    const hash = await bcrypt.hash(password, 12);

    await User.create({
      user_id: id,
      password: hash,
      previlige: 'admin'
    });

    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
};