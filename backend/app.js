// 모듈 import
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('dotenv').config();
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const indexRouter = require('./routes');

// 웹 애플리케이션 생성
const app = express();
sequelize.sync();
passportConfig(passport);

// 포트 번호 설정
app.set('port', process.env.PORT || 8001);

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use('/', indexRouter);

// 404 페이지 설정
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 에러 처리 미들웨어
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});