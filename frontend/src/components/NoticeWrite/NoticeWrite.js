import React, { Component } from 'react';
import styles from './NoticeWrite.scss';
import classNames from 'classnames/bind';
import CKEditor from 'ckeditor4-react';

const cx = classNames.bind(styles);

class NoticeWrite extends Component {
  render() {
    return (
      <section className={cx('notice-write')}>
        <header className={cx('major')}>
          <h2>공지사항</h2>
        </header>
        <hr/>
        <div className={cx('notice-title')}>
          <input type='text' name='title' id='notice-title' placeholder='제목' required/>
        </div>
        <div className={cx('notice-content')}>
        <CKEditor
            data="<p>Hello from CKEditor 4!</p>"
            config={{
              filebrowserUploadUrl: '/upload',
              height: '700px',
            }}
        />
        </div>
        <hr/>
        <div className={cx('button' ,'special')}>게시글 작성</div>
      </section>
    );
  };
};

export default NoticeWrite;