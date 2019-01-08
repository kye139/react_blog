import React from 'react';
import styles from './SideTouchInfo.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SideTouchInfo = () => {
  return (
    <section className={cx('side-touch-info')}>
      <header className={cx('major')}>
        <h2>Get In Touch</h2>
      </header>
      <ul className={cx('contact')}>
        <li className={cx('fa-envelope-o')}><a href='#'>kye139@gmail.com</a></li>
        <li className={cx('fa-phone')}>(000) 000-0000</li>
      </ul>
    </section>
  );
};

export default SideTouchInfo;