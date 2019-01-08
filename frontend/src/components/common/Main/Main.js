import React from 'react';
import styles from './Main.scss';
import classNames from 'classnames/bind';
import Header from './Header';

const cx = classNames.bind(styles);

const Main = ({children}) => {
  return (
    <div id='main'>
      <div className={cx('inner')}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Main;