import React, { Component } from 'react';
import styles from './Pagination.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class Pagination extends Component {
  pages = [];

  // 현재 페이지 위치와 마지막 페이지를 통해 출력될 페이지 쪽수를 렌더링 ( 최대 7 쪽수를 출력 )
  initialize = () => {
    const { page, lastPage } = this.props;
    const finalPage = lastPage + 1 < page+4 ? lastPage + 1 : page + 4; // 출력될 쪽 수중 가장 마지막 쪽 수

    // 앞에 페이지 수가 네 페이지보다 적은 경우
    if (page <= 4) {
      for (let i=1 ; i<page; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
      this.pages.push(<li><a href='#' className={cx('page', 'active')}>{page}</a></li>);
      for (let i=page+1; i<finalPage; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
      // 뒤에 페이지가 더 있을 경우
      if (finalPage < lastPage + 1) {
        this.pages.push(<span>...</span>);
      }
    } else if (page >= lastPage - 3) {
      // 뒤에 페이지 수가 네 페이지보다 적은 경우
      if (page-3 > 1) {
        this.pages.push(<span>...</span>);
      }
      for (let i=page-3; i<page; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
      this.pages.push(<li><a href='#' className={cx('page', 'active')}>{page}</a></li>);
      for (let i=page+1; i<finalPage; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
    } else {
      // 양쪽으로 네 페이지보다 많은 경우
      this.pages.push(<span>...</span>);
      for (let i=page-3; i<page; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
      this.pages.push(<li><a href='#' className={cx('page', 'active')}>{page}</a></li>);
      for (let i=page+1; i<finalPage; i++) {
        this.pages.push(<li><a href='#' className={cx('page')}>{i}</a></li>);
      }
      this.pages.push(<span>...</span>);
    }
  }

  constructor(props) {
    super(props);
    this.initialize();
  }

  render() {
    const { pages } = this;
    return (
      <div className={cx('page')}>
        <ul className={cx('pagination')}>
          <li><a href='#' className={cx('button', 'disabled')}>첫페이지</a></li>
          {pages}
          <li><a href='#' className={cx('button')}>끝페이지</a></li>
        </ul>
      </div>
    );
  }
}

export default Pagination;