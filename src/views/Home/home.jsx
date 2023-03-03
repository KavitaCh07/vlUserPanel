import React from 'react';
import './home.css';
import SearchNav from '../../components/SearchNav/searchNav';
import HomeCarousel from '../../components/HomeCarousel/homeCarousel';
import card1 from '../../assets/card1.png';
import card2 from '../../assets/card2.png';
import card3 from '../../assets/card3.png';
import pen from '../../assets/pen.png';
import script from '../../assets/script.png';
import suitcase from '../../assets/suitcase.png';
import music from '../../assets/music-note.png';
import { useState } from 'react';
import choice1 from '../../assets/choice1.png';
import choice2 from '../../assets/choice2.png';
import choice3 from '../../assets/choice3.png';
import choice4 from '../../assets/choice4.png';
import { useNavigate } from 'react-router-dom';
import business1 from '../../assets/business1.png';
import business2 from '../../assets/business2.png';
import durationClock from '../../assets/durationClock.png';
import play from '../../assets/play.png';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AddId } from '../../redux/courseSlice';


const Home = () => {
  const [tabState, setTabState] = useState(1);
  const [firstCategory, setFirstCategory] = useState();
  const [secondCategory, setSecondCategory] = useState();
  const [firstCategoryName, setFirstCategoryName] = useState();
  const [secondCategoryName, setSecondCategoryName] = useState();
  const [ongoinCourse, setOngoingCourse] = useState();
  const [allCourses, setAllCourses] = useState();
  const [popularCourses, setPopularCourses] = useState();
  const [newCourses, setNewCourses] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("user"));
  const tokenID = token.token;
  // console.log(tokenID);

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/ongoing-courses`,
      {
        headers: {
          Authorization: `Bearer ${tokenID}`,
        },
      }
    ).then((res) => {
      console.log(res);
      setOngoingCourse(res);

    }).catch((err) => {
      console.log(err);
    })

  }, []);

  console.log("onogingCourse", ongoinCourse);

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/courses?limit=6&page=1`,
      {
        // params:{limit:6, page:1}
      }).then((res) => {
        setAllCourses(res?.data);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log("all course", allCourses);

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/popularCourse?limit=6&page=1`,
      {
        // params:{limit:6, page:1}
      }).then((res) => {
        setPopularCourses(res?.data);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log("popular course", popularCourses);

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/newestCourse?limit=6&page=1`,
      {
        // params:{limit:6, page:1}
      }).then((res) => {
        setNewCourses(res?.data);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log("new course", newCourses);


  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/course/category1?limit=6&page=1`,
      {

      }).then((res) => {
        // console.log("category1", res);
        setFirstCategory(res);
        setFirstCategoryName(res.data[0].category_name);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log("1stcategory", firstCategory);

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/course/category2?limit=6&page=0`,
      {

      }).then((res) => {
        console.log("category2", res);
        setSecondCategory(res);
        setSecondCategoryName(res.data[0].category_name);
      }).catch((err) => {
        console.log(err);
      })
  }, []);

  console.log("2ndcategory", secondCategory);

  return (
    <div>
      <SearchNav />
      <HomeCarousel />
      <div className="home-carousel-down-part">

        <div className="ongoing-course-part">
          <div className="ongoning-see-all">
            <div className="ongoing-text">Ongoing courses</div>
            <div className="see-all-text" onClick={() => { navigate("/myCourse") }}>See All</div>
          </div>

          <div className="ongoing-courses">
            {ongoinCourse?.data.map((data) => {
              return (
                <div className="first-course" onClick={() => { dispatch(AddId(data?.course_id)); }}>
                  <div className="first-ongoing-course-img">
                    <img src={data.course_image} alt="" className='first-course-img' />
                    <div className="ongoing-course-info">
                      <div className="course-chapter-info">
                        <div className="course-name">{data.course_name}</div>
                        <div className="course-chapter">5/{data.chapter_count} Chapters</div>
                      </div>
                      <button className='ongoing-continue-btn' onClick={() => { navigate('/overview') }}><span className='ongoing-continue-text'>Continue</span></button>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="first-course">
              <div className="first-ongoing-course-img">
                <img src={card2} alt="" className='first-course-img' />
                <div className="ongoing-course-info">
                  <div className="course-chapter-info">
                    <div className="course-name">Art & Illustration</div>
                    <div className="course-chapter">15/20 Chapters</div>
                  </div>
                  <button className='ongoing-continue-btn'><span className='ongoing-continue-text'>Continue</span></button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CATEGORIES PART */}

        <div className="categories-part">
          <div className="categories-see-all">
            <div className="categories-text">Categories</div>
            <div className="categories-see-all-text">See All</div>
          </div>

          <div className="categories">
            <div className="categories-item">
              <img src={pen} alt="" /> Design
            </div>

            <div className="categories-item">
              <img src={script} alt="" /> Development
            </div>

            <div className="categories-item">
              <img src={suitcase} alt="" /> Business
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Music
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Finance
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Health & Fitness
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Marketing
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Photography
            </div>

            <div className="categories-item">
              <img src={music} alt="" /> Lifestyle
            </div>
          </div>
        </div>

        {/* CHIOCE YOUR COURSE SECTION */}

        <div className="choice-your-course-part">
          <div className="choice-your-course">
            <div className="choice-your-course-text">Choice your course</div>
            <div className="choice-see-all">See All</div>
          </div>

          <div className="new-popular-newest-tab">
            <div className={tabState === 1 ? 'tabSelect' : 'tabUnSelect'} onClick={() => { setTabState(1) }}>All</div>
            <div className={tabState === 2 ? 'tabSelect' : 'tabUnSelect'} onClick={() => { setTabState(2) }}>New</div>
            <div className={tabState === 3 ? 'tabSelect' : 'tabUnSelect'} onClick={() => { setTabState(3) }}>Popular</div>
          </div>

          <div className="choice-your-courses">
            <div className="choice-courses">

              {tabState === 1 && (
                <>
                  {allCourses?.map((data) => {
                    return (

                      <div className="choice-first-courses">
                        <img src={data?.course_image} alt="" className='choice1-img' />
                        <div className="course-label"><span className='course-label-text'>{data?.category_name}</span></div>
                        <div className="choice-course-info">
                          <div className="choice-course-name">{data?.course_name}</div>
                          <div className="choice-course-chapter">{data?.chapter_count} Chapters</div>
                        </div>
                      </div>
                    )
                  })}
                </>

              )}

              {tabState === 2 && (
                <>
                  {newCourses?.map((data) => {
                    return (

                      <div className="choice-first-courses">
                        <img src={data?.course_image} alt="" className='choice1-img' />
                        <div className="course-label"><span className='course-label-text'>{data?.category_name}</span></div>
                        <div className="choice-course-info">
                          <div className="choice-course-name">{data?.course_name}</div>
                          <div className="choice-course-chapter">{data?.chapter_count} Chapters</div>
                        </div>
                      </div>
                    )
                  })}
                </>

              )}

              {tabState === 3 && (
                <>
                  {popularCourses?.map((data) => {
                    return (

                      <div className="choice-first-courses">
                        <img src={data?.course_image} alt="" className='choice1-img' />
                        <div className="course-label"><span className='course-label-text'>{data?.category_name}</span></div>
                        <div className="choice-course-info">
                          <div className="choice-course-name">{data?.course_name}</div>
                          <div className="choice-course-chapter">{data?.chapter_count} Chapters</div>
                        </div>
                      </div>
                    )
                  })}
                </>

              )}

              {/* 
              <div className="choice-first-courses">
                <img src={choice2} alt="" className='choice1-img' />
                <div className="course-label"><span className='course-label-text'>Marketing</span></div>
                <div className="choice-course-info">
                  <div className="choice-course-name">Digital Marketing for 2021 Masterclass</div>
                  <div className="choice-course-chapter">7 Chapters</div>
                </div>
              </div>

              <div className="choice-first-courses">
                <img src={choice3} alt="" className='choice1-img' />
                <div className="course-label"><span className='course-label-text'>Business</span></div>
                <div className="choice-course-info">
                  <div className="choice-course-name">Smart Tips: Leadership</div>
                  <div className="choice-course-chapter">7 Chapters</div>
                </div>
              </div>

              <div className="choice-first-courses">
                <img src={choice4} alt="" className='choice1-img' />
                <div className="course-label"><span className='course-label-text'>Music</span></div>
                <div className="choice-course-info">
                  <div className="choice-course-name">What makes epic musics?</div>
                  <div className="choice-course-chapter">7 Chapters</div>
                </div>
              </div> */}


            </div>
          </div>
        </div>

        {/* TOP COURSE IN CATEGORY PART 1 SECTION */}

        <div className="top-course-busines-part">
          <div className="top-course-busines">
            <div className="top-course-busines-text">Top courses in {firstCategoryName}</div>
            <div className="top-course-seeAll">See All</div>
          </div>

          <div className="top-courses-business">
            {firstCategory?.data.map((data) => {
              const hours = Math.floor(data?.totalVideoLength / 3600);
              const minutes = Math.floor(data?.totalVideoLength % 3600 % 60);
              const seconds = Math.floor(data?.totalVideoLength % 3600 / 60);
              return (
                <div className="top-course-business" onClick={() => { dispatch(AddId(data?.course_id)); navigate('/overview'); }}>
                  <img src={data.courseThumbnail} alt="" className='business1-img' />
                  <div className="business-play-btn"><img src={play} alt="" /></div>
                  <div className="business-course-details">
                    <div className="business-course-name">{data.course_name}</div>
                    <div className="business-course-chapter-duration">
                      <div className="business-chapter">{data.chapter_count} Chapters</div>
                      <div className="business-duration"><img src={durationClock} alt="" />{hours >= 1 ? (<>{hours}:{minutes}:{seconds}</>) : (<>{minutes}:{seconds}</>)}</div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="top-course-business">
              <img src={business2} alt="" className='business1-img' />
              <div className="business-play-btn"><img src={play} alt="" /></div>
              <div className="business-course-details">
                <div className="business-course-name">Smart Tips: Leadership</div>
                <div className="business-course-chapter-duration">
                  <div className="business-chapter">7 Chapters</div>
                  <div className="business-duration"><img src={durationClock} alt="" />1:30:20</div>
                </div>
              </div>
            </div>

            <div className="top-course-business">
              <img src={business1} alt="" className='business1-img' />
              <div className="business-play-btn"><img src={play} alt="" /></div>
              <div className="business-course-details">
                <div className="business-course-name">The Complete communication Skills to learn</div>
                <div className="business-course-chapter-duration">
                  <div className="business-chapter">7 Chapters</div>
                  <div className="business-duration"><img src={durationClock} alt="" />1:30:20</div>
                </div>
              </div>
            </div>

            <div className="top-course-business">
              <img src={business2} alt="" className='business1-img' />
              <div className="business-play-btn"><img src={play} alt="" /></div>
              <div className="business-course-details">
                <div className="business-course-name">Smart Tips: Leadership</div>
                <div className="business-course-chapter-duration">
                  <div className="business-chapter">7 Chapters</div>
                  <div className="business-duration"><img src={durationClock} alt="" />1:30:20</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* TOP COURSES IN CATEGORY 2 */}

        <div className="top-course-busines-part">
          <div className="top-course-busines">
            <div className="top-course-busines-text">Top courses in {secondCategoryName}</div>
            <div className="top-course-seeAll">See All</div>
          </div>

          <div className="top-courses-business">
            {secondCategory?.data.map((data) => {
              const hours = Math.floor(data?.totalVideoLength / 3600);
              const minutes = Math.floor(data?.totalVideoLength % 3600 % 60);
              const seconds = Math.floor(data?.totalVideoLength % 3600 / 60);
              return (
                <div className="top-course-business" onClick={() => { dispatch(AddId(data?.course_id)); navigate('/overview') }}>
                  <img src={data.courseThumbnail} alt="" className='business1-img' />
                  <div className="business-play-btn" ><img src={play} alt="" /></div>
                  <div className="business-course-details">
                    <div className="business-course-name">{data.course_name}</div>
                    <div className="business-course-chapter-duration">
                      <div className="business-chapter">{data.chapter_count} Chapters</div>
                      <div className="business-duration"><img src={durationClock} alt="" />{hours >= 1 ? (<>{hours}:{minutes}:{seconds}</>) : (<>{minutes}:{seconds}</>)}</div>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="top-course-business">
              <img src={business2} alt="" className='business1-img' />
              <div className="business-play-btn"><img src={play} alt="" /></div>
              <div className="business-course-details">
                <div className="business-course-name">Smart Tips: Leadership</div>
                <div className="business-course-chapter-duration">
                  <div className="business-chapter">7 Chapters</div>
                  <div className="business-duration"><img src={durationClock} alt="" />1:30:20</div>
                </div>
              </div>
            </div>

            <div className="top-course-business">
              <img src={business1} alt="" className='business1-img' />
              <div className="business-play-btn"><img src={play} alt="" /></div>
              <div className="business-course-details">
                <div className="business-course-name">The Complete communication Skills</div>
                <div className="business-course-chapter-duration">
                  <div className="business-chapter">7 Chapters</div>
                  <div className="business-duration"><img src={durationClock} alt="" />1:30:20</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Home
