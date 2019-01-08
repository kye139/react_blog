import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import Banner from 'components/Banner';
import HomeNoticeList from 'components/HomeNoticeList';
import LatestPost from 'components/LatestPost';

const HomePage = () => {
  return (
    <PageTemplate>
      <Banner/>
      <HomeNoticeList/>
      <LatestPost/>
    </PageTemplate>
  );
};

export default HomePage;