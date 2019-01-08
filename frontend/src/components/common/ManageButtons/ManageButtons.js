import React from 'react';
import styles from './ManageButtons.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ManageButtons = () => {
  return (
    <div className={cx('manage-btn')}>
      <div className={cx('button', 'verysmall')}><i className={cx('fas', 'fa-list-ul')}></i>목록</div>
      <div className={cx('button', 'verysmall')}><i className={cx('fas', 'fa-edit')}></i>수정</div>
      <div className={cx('button', 'verysmall')}><i className={cx('fas', 'fa-eraser')}></i>삭제</div>
    </div>
  );
};

export default ManageButtons;