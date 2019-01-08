import React from 'react';
import styles from './Banner.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Banner = () => {
  return(
    <section id='banner'>
      <div className={cx('content')}>
        <header>
          <h1>Welcome to the KYELAB</h1>
          <p>A free and fully responsive site teplate</p>
        </header>
        <p>Aenean ornare velit lacus, ac varius enim ullamcorper eu. Proin aliquam facilisis ante interdum congue. Integer mollis, nisl amet convallis, porttitor magna ullamcorper, amet egestas mauris. Ut magna finibus nisi nec lacinia. Nam maximus erat id euismod egestas. Pellentesque sapien ac quam. Lorem ipsum dolor sit nullam.</p>
      </div>
      <span className={cx('image', 'object')}>
        <img src='#' alt='img'/>
      </span>
    </section>
  );
};

export default Banner;