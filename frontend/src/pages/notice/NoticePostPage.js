import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Notice from 'components/Notice';
import ManageButtons from 'components/common/ManageButtons';

const NoticePostPage = () => {
  return (
    <PageTemplate>
      <Notice/>
      <hr/>
      <ManageButtons/>
    </PageTemplate>
  );
};

export default NoticePostPage;