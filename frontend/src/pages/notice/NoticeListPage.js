import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import List from 'components/common/List';
import NoticeList from 'components/NoticeList';
import Pagination from 'components/common/Pagination';

const NoticeListPage = () => {
  return (
    <PageTemplate>
      <List>
        <NoticeList/>
      </List>
      <Pagination page={2} lastPage={5}/>
    </PageTemplate>
  );
};

export default NoticeListPage;