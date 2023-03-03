import React, { useState } from 'react';
import './overview.css'
import SearchNav from '../SearchNav/searchNav';
import front from '../../assets/Vector.png';
import video from '../../assets/previewVideo.png';
import yellowPlay from '../../assets/YellowPlay.png';
import { useNavigate } from 'react-router-dom';
import clock from '../../assets/clock.png';
import supportFiles from '../../assets/supportFiles.png';
import moduleTest from '../../assets/moduleTest.png';
import test from '../../assets/test.png';
import lifeAccess from '../../assets/lifeAccess.png';
import globe from '../../assets/globe.png';
import certificate from '../../assets/certificate.png';
import yellowTick from '../../assets/yellowTick.png';
import instructor from '../../assets/instructor.png';
import plus from '../../assets/plus.png';
import minus from '../../assets/minus.png';
import greyDot from '../../assets/greyDot.png';
import greyPlay from '../../assets/greyplay.png';
import axios from "axios";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from "react-player";
import { useRef } from 'react';
import greenDot from '../../assets/greenDot.png';
import greenTick from '../../assets/greenTick.png';
import redPlay from '../../assets/RedPlay.png';
import { AddLessonId, AddVideo, AddPausedModalDetails } from '../../redux/courseSlice';
import { useDispatch } from 'react-redux';

const Overview = () => {
  const navigate = useNavigate();
  const playerRef = useRef();
  const [tab, setTab] = useState(1);
  const [overviewInfo, setOverviewInfo] = useState(true);
  const [chaptersInfo, setChaptersInfo] = useState(false);
  const [showAccordianContent, setShowAccordianContent] = useState(null);
  const [overviewResponse, setOverviewResponse] = useState("");
  const [chapters, setChapters] = useState("");
  const [controls, setControls] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pausedModal, setPausedModal] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"));
  const tokenID = token.token;
  const dispatch = useDispatch();

  var videoLink = "";
  var chapterComplete = "false";
  var lessonComplete = "false";
  var dispatchResult = "false";
  var sec = "0";
  var secondsResult = 0;
  const id = JSON.parse(localStorage.getItem("courseId" || "[]"));
  console.log("local", id);
   sec = JSON.parse(localStorage.getItem("secondsPlayed" || "[]"));
  console.log("sec", sec);

  videoLink = useSelector((state) => state.Course.video);
  console.log("overview video link", videoLink);

  const lessonId = useSelector((state) => state.Course.lessonId);
  console.log("overview lesson id", lessonId);

  const modalDetails = useSelector((state) => state.Course.pausedModalDetails);
  secondsResult = modalDetails?.durationCompleted;
  console.log("overview modal details", modalDetails);
  console.log("seondsResult", secondsResult);



  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 || s == 0 ? " min " : " min, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/courseOverview`,
      {
        params: {
          courseId: id
        },
        headers: {
          Authorization: `Bearer ${tokenID}`
        },
      }).then((res) => {
        setOverviewResponse(res?.data);
        // console.log("overview api response", overviewResponse);
      }).catch((err) => {
        console.log(err);
      })
  }, [id]);

  console.log("overview api response", overviewResponse);

  // console.log("overviewResponse", overviewResponse);


  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/chapter`,
      {
        params: {
          courseId: id
        },
        headers: {
          Authorization: `Bearer ${tokenID}`
        },
      }).then((res) => {
        setChapters(res?.data); 
        videoLink = chapters?.overviewVideo;

      }).catch((err) => {
        console.log(err);
      });
  });
 

  console.log("chapter", chapters);


  const durations = async () => {
    await axios
      .request(
        `https://app-virtuallearning-230221110922.azurewebsites.net/user/lesson`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenID}`,
          },
          params: {
            lessonId: lessonId,
            duration: sec
          },
        }
      )
      .then((res) => {
        console.log(res);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggle = (i) => {
    if (showAccordianContent === i) {
      return (setShowAccordianContent(null))
    }
    setShowAccordianContent(i);
  }


  return (
    <div>
      <SearchNav />
      <div className="myCourse-overview-container">
        <div className="myCourse-overview">

          <div className="myCourse-overview-top">
            <div className="my-course-text" onClick={() => { navigate("/myCourse") }}>My Course</div>
            <div><img src={front} alt="" className='myCourse-front-img' /></div>
            <div className="ongoingText">Ongoing</div>
          </div>

          <div className="overview-description">

            <div className="preview-video-part">
              {
                tab === 1 ? (
                  <>

                    <div>
                      <video src={overviewResponse?.overview?.videoLink} className='video-img' controls>
                        {/* sou<source src={overviewResponse.overview.videoLink} type="video/mp4" ></source> */}
                      </video>
                      {/* <img src={overviewResponse.overview.videoLink} alt=""  /> */}
                    </div>
                    <div className="preview-info">
                      <div className="preview-course-text">Preview the course</div>
                      {/* <div className='yellowPlay'><img src={yellowPlay} alt="" className='yellowPlay-img' /></div> */}
                      <div className="introduction-heading">
                        <div className="introduction-text">Introduction</div>
                        <div className="video-duration">3 min</div>
                      </div>
                    </div>

                    <div className="preview-details">
                      <div className="preview-det">
                        <div className="preview-course-name">{overviewResponse?.courseHeader?.course_name}</div>
                        <div className="preview-label"><span className='preview-label-text'>{overviewResponse?.courseHeader?.category_name}</span> </div>
                      </div>
                      <div className="preview-course-chapter">{overviewResponse?.courseHeader?.chapter_count} Chapter | {overviewResponse?.courseHeader?.lesson_count} lessons</div>
                    </div>

                    <div className="previewCousrseDetails">
                      <div className="courseDescription">{overviewResponse?.overview?.courseDescription}</div>
                      <div className="previewCourseContent">{overviewResponse?.overview?.previewCourseContent}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {chapters?.joinedCourse === false ? (<img src={overviewResponse?.courseHeader?.course_image} alt="" style={{ width: "464px", height: "262px" }} />) : (
                        <ReactPlayer
                          url={videoLink}
                          controls={controls}
                          className='video-img'
                          width="100%"
                          height="100%"
                          ref={playerRef}
                          playing={playing}
                          onProgress={(progress) => {
                            setPlayed(parseInt(progress.playedSeconds));
                            localStorage.setItem("secondsPlayed", JSON.stringify(parseInt(progress.playedSeconds)))
                            console.log(played)
                            durations();

                          }}
                        />)}
                      {pausedModal && (
                        <div className="modal">
                          <div className="paused-modal-overlay">
                            <div className="paused-modal-content">
                              <div className="paused-modal-inner-content">
                                <div className="paused-time">Your lesson paused at {parseFloat(secondsResult)} <br /> Do you want to continue watching?</div>
                                <button className='continueWatching-btn' onClick={() => {
                                  playerRef.current.seekTo(secondsResult, 'seconds');
                                  setControls(true);
                                  setPlaying(true);
                                  setPausedModal(false);
                                }}><span className='continueWatching-text'>Continue watching</span></button>
                                <button className='watchBegining-btn' onClick={() => {
                                  playerRef.current.seekTo(0, 'seconds');
                                  setControls(true);
                                  setPlaying(true);
                                  setPausedModal(false);
                                }}><span className='watchBegining-text'>Watch from beginning</span></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>


                    <div className="preview-details">
                      <div className="preview-det">
                        <div className="preview-course-name">{overviewResponse?.courseHeader?.course_name}</div>
                        <div className="preview-label"><span className='preview-label-text'>{overviewResponse?.courseHeader?.category_name}</span> </div>
                      </div>
                      <div className="preview-course-chapter">{overviewResponse?.courseHeader?.chapter_count} Chapter | {overviewResponse?.courseHeader?.lesson_count} lessons</div>
                    </div>
                  </>
                )
              }

            </div>

            <div className="overview-chapter-part">
              <div className="overview-tabs">
                <div className={tab === 1 ? "tabSelects" : "tabUnselects"} onClick={() => { setTab(1); setOverviewInfo(true); setChaptersInfo(false); }}>Overview</div>
                <div className={tab === 2 ? "tabSelects" : "tabUnselects"} onClick={() => { setTab(2); setOverviewInfo(false); setChaptersInfo(true); }}>Chapters</div>
              </div>

              {overviewInfo && (
                <div className="overviewInfo">
                  <div className="course-includes-text">Course Includes</div>
                  <div className="course-includes">
                    <div className="course-include"><img src={clock} alt="" />{overviewResponse?.courseIncludes?.totalHourVideo} total hours video</div>
                    {overviewResponse?.courseIncludes?.supportFiles === true ? (
                      <div className="course-include"><img src={supportFiles} alt="" />Support Files</div>

                    ) : ("")
                    }
                    <div className="course-include" onClick={() => { navigate('/test') }}><img src={moduleTest} alt="" />{overviewResponse?.courseIncludes?.moduleTest} Module Test</div>
                    {overviewResponse?.courseIncludes?.fullLifetimeAccess === true ? (

                      <div className="course-include"><img src={lifeAccess} alt="" />Full lifetime access</div>
                    ) : ("")
                    }
                    <div className="course-include"><img src={globe} alt="" />{overviewResponse?.courseIncludes?.accessOn}</div>

                    {overviewResponse?.courseIncludes?.certificateOfCompletion === true ? (
                      <div className="course-include"><img src={certificate} alt="" />Certificate of Completion</div>

                    ) : ("")
                    }
                  </div>

                  <div className="what-you-learn">
                    <div className="what-you-learn-text">What you’ll learn</div>
                    <div className="what-you-will-learn">
                      {overviewResponse?.overview?.courseOutcome.map((data) => {
                        return (

                          <div className="learning-points"><img src={yellowTick} alt="" />{data}</div>
                        )
                      })

                      }
                      {/* <div className="learning-points"><img src={yellowTick} alt="" />You will have a fully interactive design and <br /> prototype at the end of this course</div>
                      <div className="learning-points"><img src={yellowTick} alt="" />Design mobile and desktop apps</div>
                      <div className="learning-points"><img src={yellowTick} alt="" />You will learn how to reuse design elements <br /> for future projects</div> */}
                    </div>
                  </div>

                  <div className="requirements">
                    <div className="requirements-text">Requirements</div>
                    <div className="requirements-points">
                      <ul className='requirement-point'>
                        {overviewResponse?.overview?.requirements.map((data) => {
                          return (

                            <li>{data}</li>
                          )
                        })

                        }
                        {/* <li>You should know your way around comouter basics</li> */}
                      </ul>
                    </div>
                  </div>

                  <div className="instructor">
                    <div className="instructor-text">Instructor</div>
                    <div className="instructor-info">
                      <img src={instructor} alt="" />
                      <div className="instruct-details">
                        <div className="instructor-name">{overviewResponse?.instructor?.instructorName}</div>
                        <div className="instruct-course">{overviewResponse?.instructor?.about} | {overviewResponse?.instructor?.emailId}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {overviewResponse?.joined_course === true ? (
                      <button className='join-course-btn' style={{ backgroundColor: "green", borderRadius: "0px" }}><span className='join-text'>Joined Course</span></button>

                    ) : (<button className='join-course-btn' style={{ backgroundColor: "#EC5D52" }}><span className='join-text'>Join Course</span></button>)}
                  </div>
                </div>
              )}

              {chaptersInfo && (
                <div className="chapter-info">
                  <div className="course-content-text">Course Content</div>
                  <div className="total-chapter-lesson">{chapters?.courseContentResponse?.chapterCount} Chapter | {chapters?.courseContentResponse?.lessonCount} lessons | Assignment Test | 3.5h total length</div>


                  <div className="course-chapters-part">
                    {chapters?.lessonResponseList?.map((data, i) => {
                      return (
                        <div className="chapter-accordian">
                          <div className="chapter-accordian-row" onClick={() => toggle(i)}>
                            <div className={data?.chapterCompleted === false ? "chapter-number-name" : "chapter-number-name-completed"}>{data?.chapterName}</div>
                            <div className="plus-minus-icon">{showAccordianContent === i ? (<img src={minus} alt="" className='accor-icon' />) : (<img src={plus} alt="" className='accor-icon' />)}</div>
                          </div>
                          {showAccordianContent === i &&
                            <>
                              <div className="accordian-content">
                                {chapters?.lessonResponseList[i]?.lessonList?.map((data, j) => {

                                  return (

                                    <div className="progress-bar">
                                      <div className="grey-dot">
                                        {data?.lessonCompleted === true ? (<img src={greenTick} alt="" />) : (data?.lessonCompleted === false && data?.durationCompleted > 0 ? (<img src={greenDot} alt="" />) : (<img src={greyDot} alt="" />))}
                                      </div>
                                      <div className={data?.lessonCompleted === true ? "progress-completed" : "progress"}></div>
                                      <div className='lcp' onClick={() => {
                                        (((j === 0 && chapters?.joinedCourse === true) ? ((chapters?.lessonResponseList[i]?.chapterNumber !== 1 && (
                                          ((chapters?.lessonResponseList[i - 1]?.chapterCompleted === true)) ? chapterComplete = "true" : chapterComplete = "false")))
                                          : (chapters?.lessonResponseList[i]?.lessonList[j - 1]?.lessonCompleted === true ? lessonComplete = "true" : lessonComplete = "false")));

                                        (((j === 0 && chapters?.lessonResponseList[i]?.chapterNumber === 1) || data?.lessonCompleted === true || chapterComplete === "true" || lessonComplete === "true") ?
                                          dispatchResult = "true" : dispatchResult = "false");

                                        if (dispatchResult === "true" && chapters.joinedCourse === true) {
                                          console.log("dispatch");
                                          dispatch(AddVideo(data?.videoLink));
                                          dispatch(AddLessonId(data?.lessonId));
                                          
                                        }
                                        if(dispatchResult === "true" && chapters.joinedCourse === true && chapters?.lessonResponseList[i]?.lessonList[j].durationCompleted>0)
                                        {
                                            dispatch(AddPausedModalDetails(chapters?.lessonResponseList[i]?.lessonList[j]));
                                        }
                                        else {
                                          console.log("do not dispatch");
                                        }
                                        if (data?.durationCompleted === 0) {
                                          setPausedModal(false);
                                          setPlaying(true);
                                          setControls(true);
                                        }
                                        else {
                                          setPausedModal(true);
                                          setPlaying(false);
                                          setControls(false);
                                        }
                                      }}>
                                        <div className="lesson-number">{data?.lessonNumber}</div>
                                        <div className="lessonName-duration">
                                          <div className={data?.lessonCompleted === true ? "lesson-number-name-completed" : "lesson-number-name"}>{data?.lessonName}</div>
                                          <div className="videoDuration">{secondsToHms(data?.duration)}</div>
                                        </div>
                                        <div className="lesson-play">
                                          {data?.durationCompleted > 0 ? (<img src={redPlay} alt="" />) : (<img src={greyPlay} alt="" />)}
                                        </div>
                                      </div>
                                    </div>
                                  )

                                })}

                           {data?.assignmentResponse !== null &&
                            (
                              <div className="progress-bar">
                                <div className="grey-dot">
                                {data?.assignmentResponse?.assignmentCompleted === true ? (<img src={greenTick} alt="" />) : (<img src={greyDot} alt="" />)}
                                  </div>
                                {/* <div className="progress"></div> */}
                                <div className='lcp'>
                                  <div className="lesson-number"><img src={test} alt=""/></div>
                                  <div className="lessonName-duration">
                                    <div className="lesson-number-name">{data?.assignmentResponse?.assignmentName}</div>
                                    <div className="videoDuration">{data?.assignmentResponse?.questionCount} mins | {data?.assignmentResponse?.testDuration} Questions</div>
                                  </div>
                                </div>
                              </div>
                            )}     

                              </div>
                            </>
                          }
                        </div>

                      )
                    })}



                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;