import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';
import Sidebar from 'components/common/Sidebar';
import Main from 'components/common/Main';

const cx = classNames.bind(styles);

const PageTemplate = ({children}) => {
    return (
        <div className={cx('page-template')} id='wrapper'>
            <Main>
                {children}
            </Main>
            <Sidebar />
        </div>
    );
};

export default PageTemplate;