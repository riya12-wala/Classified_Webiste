import React from 'react'
import Section1 from './blackcast-section1/Section1';
import Howitworks from './howitworks/Howitworks';
import RecentActivity from './recentactivity/RecentActivity';
import MasonryImageList from './ImageList/ImageList';
import Category from './category/Category';
function Home() {
  return (
    <div>
      <Section1 />
      <Category/>
      <Howitworks />
      <RecentActivity />
      <MasonryImageList/>
    </div>
  )
}

export default Home
