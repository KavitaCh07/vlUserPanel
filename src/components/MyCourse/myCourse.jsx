import React from 'react';
import SearchNav from '../SearchNav/searchNav';
import './myCourse.css'
import { useState } from 'react';
import Ongoing from '../Ongoing/ongoing';
import Completed from '../Completed/completed';
import front from '../../assets/Vector.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const MyCourse = () => {

  const [myCourseTab, setMyCourseTab] = useState(1);
  const navigate = useNavigate();

  return (
    <div>
      <SearchNav />
      <div className="my-course-page">
        <div className="row">
        <div className="home-text" onClick={()=>{navigate('/home')}}>Home</div>
        <div><img src={front} alt="" /></div>
        <div className="my-course-text">My Course</div>
        </div>
        <div className="my-course-tabs">
          <div className={myCourseTab === 1 ? 'myCourseTabSelect' : 'myCourseTabUnselect'} onClick={() => { setMyCourseTab(1) }}>Ongoing</div>
          <div className={myCourseTab === 2 ? 'myCourseTabSelect' : 'myCourseTabUnselect'} onClick={() => { setMyCourseTab(2) }}>Completed</div>
        </div>
      </div>
      {myCourseTab === 1 ? <Ongoing /> : <Completed />}
    </div>
  )
}

export default MyCourse;
