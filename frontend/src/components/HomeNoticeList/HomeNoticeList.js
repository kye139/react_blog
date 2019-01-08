import React from 'react';
import styles from './HomeNoticeList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HomeNoticeList = () => {
  return (
    <section className={cx('home-notice-list')}>
      <header className={cx('major')}>
        <h2>공지사항</h2>
      </header>
      <div className={'more'}>
        <a href='#'>더 보기</a>
      </div>
      <div className={'table-wrapper'}>
        <table>
          <thead>
            <tr>
              <th style={{width: '20%'}}>작성일</th>
              <th>제목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>공지사항 1</td>
              <td>공지사항 1입니다.</td>
            </tr>
            <tr>
              <td>공지사항 2</td>
              <td>공지사항 2입니다.</td>
            </tr>
            <tr>
              <td>공지사항 3</td>
              <td>공지사항 3입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HomeNoticeList;