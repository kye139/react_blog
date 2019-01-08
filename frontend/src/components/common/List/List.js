import React from 'react';
import styles from './List.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const List = ({children}) => {
  return (
    <section className={cx('list')}>
      <header className={cx('major')}>
        <h2>공지사항</h2>
      </header>
      {children}
      <div className={cx('notice-write')}>
        <a className={cx('button', 'special')} href='#' id='write'>글쓰기</a>
      </div>
    </section>
  );
};

export default List;