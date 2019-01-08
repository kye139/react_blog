import React from 'react';
import styles from './NoticeList.scss';
import classNames from 'classnames/bind';
import NoticeItem from 'components/NoticeItem';

const cx = classNames.bind(styles);

const NoticeList = () => {
  return (
    <div className={cx('table-wrapper', 'notice-list')}>
      <table>
        <thead>
          <tr>
            <th className={cx('notice-num')}>글 번호</th>
            <th className={cx('notice-date')}>작성일</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          <NoticeItem num='1' date='2019-01-01' title='공지사항1'/>
          <NoticeItem num='2' date='2019-01-01' title='공지사항2'/>
          <NoticeItem num='3' date='2019-01-01' title='공지사항3'/>
          <NoticeItem num='4' date='2019-01-01' title='공지사항4'/>
          <NoticeItem num='5' date='2019-01-01' title='공지사항5'/>
        </tbody>
      </table>
    </div>
  );
};

export default NoticeList;