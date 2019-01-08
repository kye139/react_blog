import React from 'react';
import styles from './Notice.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Notice = () => {
  return (
    <section className={cx('notice-header')}>
      <header className={cx('major')}>
        <div className={cx('row')}>
          <h2>공지사항 제목</h2>
          <span className={cx('notice-date')}>2019-01-01</span>
        </div>
      </header>
      <div>
        <p>공지사항 내용</p>
      </div>
    </section>
  );
};

export default Notice;