import React from 'react';
import styles from './LatestPost.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LatestPost = () => {
  return (
    <section className={cx('latest-post')}>
      <header className={cx('major')}>
        <h2>최신 글 목록</h2>
      </header>
      <div className={cx('posts')}>
        <article>
          <a href="#" className={cx('image')}><img src="images/pic01.jpg" alt="" /></a>
          <h3>Interdum aenean</h3>
          <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
          <ul className={cx('actions')}>
            <li><a href="#" className={cx('button')}>More</a></li>
          </ul>
        </article>
        <article>
          <a href="#" className={cx('image')}><img src="images/pic01.jpg" alt="" /></a>
          <h3>Interdum aenean</h3>
          <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
          <ul className={cx('actions')}>
            <li><a href="#" className={cx('button')}>More</a></li>
          </ul>
        </article>
        <article>
          <a href="#" className={cx('image')}><img src="images/pic01.jpg" alt="" /></a>
          <h3>Interdum aenean</h3>
          <p>Aenean ornare velit lacus, ac varius enim lorem ullamcorper dolore. Proin aliquam facilisis ante interdum. Sed nulla amet lorem feugiat tempus aliquam.</p>
          <ul className={cx('actions')}>
            <li><a href="#" className={cx('button')}>More</a></li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default LatestPost;