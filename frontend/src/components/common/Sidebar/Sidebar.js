import React from 'react';
import styles from './Sidebar.scss';
import classNames from 'classnames/bind';
import Menu from './Menu';
import Search from './Search';
import SideTouchInfo from './SideTouchInfo';
import Footer from './Footer';

const cx = classNames.bind(styles);

const Sidebar = () => {
    return (
        <div id="sidebar">
            <div className={cx('inner')}>
                <Search/>
                <Menu/>
                <Menu/>
                <SideTouchInfo/>
                <Footer/>
            </div>
        </div>
    );
};

export default Sidebar;