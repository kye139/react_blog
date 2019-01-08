import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header id='header'>
      <a href='#' className={cx('logo')}><strong>KYELAB</strong></a>
      <ul className={cx('icons')}>
        <li><a href='#' className={cx('icon', 'fa-twitter')}><span className={cx('label')}>Twitter</span></a></li>
        <li><a href='#' className={cx('icon', 'fa-facebook')}><span className={cx('label')}>Facebook</span></a></li>
        <li><a href='#' className={cx('icon', 'fa-snapchat-ghost')}><span className={cx('label')}>Snapchat</span></a></li>
        <li><a href='#' className={cx('icon', 'fa-instagram')}><span className={cx('label')}>Instagram</span></a></li>
        <li><a href='#' className={cx('icon', 'fa-medium')}><span className={cx('label')}>Medium</span></a></li>
        <li><a href='#' className={cx('icon', 'fa-lightbulb-o')}><span className={cx('label')}>Manage</span></a></li>
      </ul>
    </header>
  );
};

export default Header;