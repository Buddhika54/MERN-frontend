import React from 'react'

import SideBar from '../SideBar';
import MaintenanceSummary from '../MaintenanceSummary';
import Navbar from '../Navbar';
import './Home.css'


function Home() {
  return (
    <div className="home-container">
      <SideBar/>
      <div className="home-main">
        <Navbar/>
        <MaintenanceSummary/>
      </div>
    </div>
  )
}

export default Home
