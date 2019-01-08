import React from 'react';
import styles from './Search.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Search = () => {
    return (
        <section className={cx('alt')} id='search'>
            <form method='post' action='#'>
                <input type='text' name='query' id='query' placeholder='Search' />
            </form>
        </section>
    );
};

export default Search;