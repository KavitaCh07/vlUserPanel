import React from 'react';
import './searchNav.css';
import homeLogo from '../../assets/homeLogo.png';
import bell from '../../assets/Bell.png';
import setting from '../../assets/setting.png';
// import profile from '../../assets/profile.png';
import magnify from '../../assets/MagnifyingGlass.png';
// import courseImg from '../../assets/GraduationCap.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import filter from '../../assets/icn_filter_search.png';
import close from '../../assets/closeFilter.png';
// import FilterModal from '../FilterModal/filterModal';
import '../FilterModal/filterModal.css';
import pen from '../../assets/pen.png';
import script from '../../assets/script.png';
import bag from '../../assets/suitcase.png';
import music from '../../assets/music-note.png';
import cap from '../../assets/GraduationCap.png'
import userCircle from '../../assets/UserCircle.png';
import logout from '../../assets/SignOut@2x.png';
// import marketing from '../../assets/marketing.png';
// import uiux from '../../assets/uiux.png';
import cross from '../../assets/close.png';
import axios from "axios";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AddId } from '../../redux/courseSlice';

const SearchNav = () => {
  const [dropDown, setDropDown] = useState(false);
  const [firstModal, setFirstModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [searchCourseModal, setSearchCourseModal] = useState(false);
  const [searchListData, setSearchListData] = useState();
  const [filterCourseModal, setFilterCourseModal] = useState(false);
  const [filterListData, setFilterListData] = useState();
  const [inputValue, setInputValue] = useState(null);
  const [topSearch, setTopSearch] = useState();
  const navigate = useNavigate();
  const [category, setCategory] = useState();

  const [categoryOne, setCategoryOne] = useState(false);
  const [category2, setCategory2] = useState(false);
  const [category3, setCategory3] = useState(false);
  const [category4, setCategory4] = useState(false);
  const [category5, setCategory5] = useState(false);
  const [design1, setDesign1] = useState(false);
  const [design2, setDesign2] = useState(false);
  const [filterData, setFilterData] = useState();

  // const filterResponse = useSelector((state) => state.Course.filter);
  // console.log("search nav", filterData);
  const dispatch = useDispatch();

  const handleClick = event => {
    setDropDown(!dropDown);
  }

  let userProfile = JSON.parse(localStorage.getItem('user'));
  const logOut = () => {
    localStorage.clear();
    navigate('/');
  }

  var searchValue = "";

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchValue = e.target.search.value;
    searchSubmit();
    setFirstModal(false);
    setSearchCourseModal(true);
  }

  const filterObj = [];
  const categoryId = [];

  const applyFilter = () => {
    if (categoryOne) {
      let filter1 = { startDuration: 5, endDuration: 10 };
      filterObj.push(filter1);
    }
    if (category2) {
      let filter2 = { startDuration: 10, endDuration: 20 };
      filterObj.push(filter2);
    }
    if (category3) {
      let filter3 = { startDuration: 20, endDuration: 30 };
      filterObj.push(filter3);
    }
    if (category4) {
      let filter4 = { startDuration: 30, endDuration: 40 };
      filterObj.push(filter4);
    }
    if (category5) {
      let filter5 = { startDuration: 40, endDuration: 50 };
      filterObj.push(filter5);
    }
    if (design1) {
      let catId1 = 1;
      categoryId.push(catId1);
    }
    if (design2) {
      let catId2 = 2;
      categoryId.push(catId2);
    }
    apply(); setCategoryOne(false); setCategory2(false); setCategory3(false); setCategory4(false); setCategory5(false); setDesign1(false); setDesign2(false);
    setFilterModal(false);
    setSearchCourseModal(false);
    setFirstModal(false);
    setFilterCourseModal(true);
  }

  const apply = async () => {
    await axios
      .request(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/search`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenID}`,
            "Content-Type": 'application/json',
            "Accept": "application/JSON"
          },
          data: {
            "searchOption": "",
            "categories": categoryId,
            "durationRequestList": filterObj

          }
        }
      )
      .then((res) => {
        console.log("nj", res);
        setFilterData(res?.data);
        // useDispatch(AddFilter(res?.data))

      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("filter DATA", filterData);


  const searchSubmit = async () => {
    await axios
      .request(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/search`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Accept": "application/JSON"
          },
          data: {
            "searchOption": searchValue
          }

        }
      ).then((res) => {
        console.log(res);
        setSearchListData(res?.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const searchSubmit = async ()=> {
  //   console.log("searchvalue",searchValue);
  //   let result = await fetch("https://app-virtuallearning-230221110922.azurewebsites.net/user/view/search",{
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/JSON",
  //       "Accept": "application/JSON",
  //     },
  //     body: JSON.stringify({
  //       "searchOption": searchValue
  //     })
  //   })
  //   result = await result.json();
  //   console.log("resjlfk",result);
  //   setSearchListData(result.length);
  //   console.log("length", searchListData);
  // }

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/categories`,
    )
      .then((res) => {
        console.log(res);
        setCategory(res);

      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const token = JSON.parse(localStorage.getItem("user"));
  const tokenID = token.token;

  useEffect(() => {
    axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/view/topSearches`, {
      headers: {
        Authorization: `Bearer ${tokenID}`
      }
    }).then((res) => {
      setTopSearch(res);
      console.log("topSearch", res);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  // console.log("topSearfdgfch", topSearch);

  return (
    <div className='navbar' style={{ height: firstModal || (searchCourseModal) || (filterCourseModal) ? "auto" : "" }}>
      <div className="navbar-container" style={{ alignItems: firstModal || searchCourseModal || filterCourseModal ? "unset" : "center" }}>
        <img src={homeLogo} alt="" className='homeLogo-img' />
        <div className="topSearch-category-part">
          <div className="search-with-filter">
            <div className="searhbar">
              <form action="" className='search-form' onSubmit={handleSearchSubmit}>
                <div className="search-container">
                  <input type="text" placeholder='Search' name='search' autoComplete='off' onChange={(e) => { setInputValue(e.target.value); setFirstModal(true); setSearchCourseModal(false); setFilterCourseModal(false) }} className='searchInput' />
                </div>
                <img src={magnify} alt="" className='search-icon' />
              </form>
            </div>
            {(firstModal || searchCourseModal || filterCourseModal) && (
              <div className="filter-button">
                <img src={filter} alt="" className='filter-img' onClick={() => { setFilterModal(true); }} />
              </div>
            )}
            {/* {filterModal && <FilterModal setFilterModal={setFilterModal}/>} */}
          </div>


          {(firstModal) && (
            <div className="topSearch-part">
              <div className="topSearch-text">Top Search</div>
              <div className="topSearch-categories">
                {topSearch?.data?.map((data) => {
                  return (

                    <div className="search-category">{data}</div>
                  )
                })}
                {/* <div className="search-category">Java</div>
                <div className="search-category">Javascript</div>
                <div className="search-category">Leadership</div>
                <div className="search-category">Photoshop</div>
                <div className="search-category">React</div>
                <div className="search-category">Communication</div> */}
              </div>

              <div className="search-from-category">
                <div className="search-from-categories-text">Search from Categories</div>
                <div className="searchCategories">
                  {category?.data?.map((data) => {
                    return (
                      <div>
                        <div className="searcCategory">
                          {(() => {
                            switch (data?.categoryName) {
                              case 'Development':
                                return <img src={script} alt="" />
                              case 'Design':
                                return <img src={pen} alt="" />
                              case 'Business':
                                return <img src={bag} alt="" />
                              case 'Music':
                                return <img src={music} alt="" />
                              default:
                                return null;
                            }
                          })()}{data?.categoryName}</div>

                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {searchCourseModal && (
            <>
              {searchListData?.length === 0 ?
                (
                  <>
                    <div className="searchCourse-list">
                      <div className="no-matching-course">No matching course</div>
                      <div className="try-different-search">Try a different search or browse categories</div>
                      <div className="search-from-category">
                        <div className="search-from-categories-text">Search from Categories</div>
                        <div className="searchCategories">
                  {category?.data?.map((data) => {
                    return (
                      <div>
                        <div className="searcCategory">
                          {(() => {
                            switch (data?.categoryName) {
                              case 'Development':
                                return <img src={script} alt="" />
                              case 'Design':
                                return <img src={pen} alt="" />
                              case 'Business':
                                return <img src={bag} alt="" />
                              case 'Music':
                                return <img src={music} alt="" />
                              default:
                                return null;
                            }
                          })()}{data?.categoryName}</div>

                      </div>
                    )
                  })}
                </div>
                      </div>
                    </div>
                  </>

                ) : (searchListData?.map((data, i) => {
                  return (
                    <div className="search-match-list">
                      <div className="search-match" onClick={() => { dispatch(AddId(data?.courseId)); setFirstModal(false); setSearchCourseModal(false); setFilterCourseModal(false); navigate('/overview'); window.location.reload(); }}>
                        <img src={data?.courseImage} alt="" className='search-match-course-img' />
                        <div className="search-match-details">
                          <div className="search-match-course-name">{data?.courseName}</div>
                          <div className="total-contain-chater">{data?.noOfChapters} Chapter</div>
                          <div className="search-match-label">{data?.categoryName}</div>
                        </div>
                        <hr className='horizontal-line' />
                      </div>
                    </div>
                  )
                }))}

            </>
          )}


          {filterModal && (
      <div className='modal'>
      <div className="overlay">
          <div className="modal-content">
              <div className="modal-inner-content">
                  <div className="searc-filter">Search Fillters</div>
                  <img src={cross} alt="" className='filterModalClose-img' onClick={() => {setFilterModal(false); setCategoryOne(false); setCategory2(false); setCategory3(false); setCategory4(false); setCategory5(false); setDesign1(false); setDesign2(false); }} />
                  <div className="search-from-categories">
                      <div className="search-from-category-text">Search from Categories</div>
                      <div className="all-search-categories">
                          <div className="searchCategory" onClick={()=>{setDesign1(true)}} style={{backgroundColor: design1? "#FCBE4B" : "#ffffff"}}> <img src={pen} alt="" /> Design</div>
                          <div className="searchCategory" onClick={()=>{setDesign2(true)}} style={{backgroundColor: design2? "#FCBE4B" : "#ffffff"}}> <img src={pen} alt="" /> Development</div>
                          <div className="searchCategory"> <img src={pen} alt="" /> Business</div>
                          <div className="searchCategory"> <img src={pen} alt="" /> Finance</div>
                          <div className="searchCategory"> <img src={pen} alt="" /> Health & Fitness</div>
                          <div className="searchCategory"> <img src={pen} alt="" /> IT & Software</div>
                      </div>
                  </div>

                  <div className="duration-part">
                      <div className="duration-text">Duration</div>
                      <div className="duration-chapter">
                          <div className="total-chapters" onClick={()=>{setCategoryOne(true)}} style={{backgroundColor: categoryOne? "#FCBE4B" : "#ffffff"}}>5/10 Chapters</div>
                          <div className="total-chapters" onClick={()=>{setCategory2(true)}} style={{backgroundColor: category2? "#FCBE4B" : "#ffffff"}}>10/20 Chapters</div>
                          <div className="total-chapters" onClick={()=>{setCategory3(true)}} style={{backgroundColor: category3? "#FCBE4B" : "#ffffff"}}>20/30 Chapters</div>
                          <div className="total-chapters" onClick={()=>{setCategory4(true)}} style={{backgroundColor: category4? "#FCBE4B" : "#ffffff"}}>30/40 Chapters</div>
                          <div className="total-chapters" onClick={()=>{setCategory5(true)}} style={{backgroundColor: category5? "#FCBE4B" : "#ffffff"}}>40/50 Chapters</div>
                      </div>
                  </div>

                  <div className="modal-btn">
                      <button className='apply-btn' onClick={()=>{
                          if(categoryOne===false && category2===false && category3===false && category4===false && category5===false && design1===false && design2===false)
                          {

                          }
                          else{
                              applyFilter();
                              setInputValue("");
                          }
                      }}><span className='apply-filter-text'>Apply Filter</span></button>
                      <button className='clear-btn'><span className='clear-text' onClick={()=>{setCategoryOne(false); setCategory2(false); setCategory3(false); setCategory4(false); setCategory5(false); setDesign1(false); setDesign2(false)}}>Clear All</span></button>
                  </div>
              </div>
          </div>
      </div>
  </div>
          )
          }


          {filterCourseModal && (
            <>
              {filterData?.length === 0 ?
                (
                  <>
                    <div className="searchCourse-list">
                      <div className="no-matching-course">No matching filter course</div>
                      <div className="try-different-search">Try a different filters or browse categories</div>
                      <div className="search-from-category">
                        <div className="search-from-categories-text">Search from Categories</div>
                        <div className="searchCategories">
                          <div className="searcCategory"><img src={pen} alt="" />Design</div>
                          <div className="searcCategory"><img src={pen} alt="" />Development</div>
                          <div className="searcCategory"><img src={pen} alt="" />Business</div>
                          <div className="searcCategory"><img src={pen} alt="" />Finance</div>
                          <div className="searcCategory"><img src={pen} alt="" />Health & Fitness</div>
                          <div className="searcCategory"><img src={pen} alt="" />IT & Software</div>
                        </div>
                      </div>
                    </div>
                  </>

                ) : (filterData?.map((data, i) => {
                  return (
                    <div className="search-match-list">
                      <div className="search-match" onClick={() => { dispatch(AddId(data?.courseId)); setFirstModal(false); setSearchCourseModal(false); setFilterCourseModal(false); navigate('/overview'); window.location.reload(); }}>
                        <img src={data?.courseImage} alt="" className='search-match-course-img' />
                        <div className="search-match-details">
                          <div className="search-match-course-name">{data?.courseName}</div>
                          <div className="total-contain-chater">{data?.noOfChapters} Chapter</div>
                          <div className="search-match-label">{data?.categoryName}</div>
                        </div>
                        <hr className='horizontal-line' />
                      </div>
                    </div>
                  )
                }))}

            </>
          )}

        </div>




        <div className="bell-setting-profile" style={{ display: firstModal || searchCourseModal || filterCourseModal ? "none" : "" }}>
          <img src={bell} alt="" />
          <img src={setting} alt="" />
          <div className='profile-picture'><img src={userProfile && userProfile.profileUrl} alt="" className='profile-image' onClick={handleClick} />
            {localStorage.getItem('user') ?
              (
                <>
                  {dropDown ? (
                    <div className="dropdown-menu">
                      <div className="my-course" onClick={() => { navigate("/myCourse") }}> <img src={cap} alt="" /> My Course</div><hr />
                      <div className="my-course"> <img src={userCircle} alt="" /> My Profile</div><hr />
                      <div className="my-course" onClick={logOut}><img src={logout} alt="" /> Logout</div>
                    </div>) : ("")}
                </>
              ) : ("")}

          </div>


        </div>





        <div className="close-icon" style={{ display: firstModal || searchCourseModal || filterCourseModal ? "block" : "none" }} onClick={() => { setFirstModal(false); setSearchCourseModal(false); setFilterCourseModal(false)}}>
          <img src={close} alt="" />
        </div>


      </div>
    </div>
  )
}

export default SearchNav;