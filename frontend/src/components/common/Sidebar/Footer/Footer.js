import React from 'react';
import styles from './Footer.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer id='footer'>
      <p className={cx('copyright')}>&copy; Untitled. All rights reserved. Demo Images: <a href='https://unsplash.com'>unsplash</a>. Design: <a href='https://html5up.net'>HTML5 UP</a>.</p>
    </footer>
  );
};

export default Footer;