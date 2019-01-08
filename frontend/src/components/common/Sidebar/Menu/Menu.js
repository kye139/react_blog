import React from 'react';
import styles from './Menu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Menu = () => {
    return (
        <nav id='menu'>
            <header className={cx('major')}>
                <h2>Menu</h2>
            </header>
            <ul>
                <li><a href='#'>HomePage</a></li>
                <li><a href='#'>Generic</a></li>
                <li><a href='#'>Elements</a></li>
                <li>
                    <span className={cx('opener')}>Submenu</span>
                    <ul>
                        <li><a href='#'>Lorem Dolor</a></li>
                        <li><a href='#'>Ipsum Adipiscing</a></li>
                        <li><a href='#'>Tempus Magna</a></li>
                        <li><a href='#'>Feugiat Veroeros</a></li>
                    </ul>
                </li>
                <li><a href='#'>Etiam Dolor</a></li>
                <li><a href='#'>Adipiscing</a></li>
            </ul>
        </nav>
    );
};

export default Menu;