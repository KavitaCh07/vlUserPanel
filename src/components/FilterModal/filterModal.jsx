import React from 'react';
import './filterModal.css';
import cross from '../../assets/close.png';
import pen from '../../assets/pen.png';
import script from '../../assets/script.png';
import { useState, useEffect } from 'react';
import axios from "axios";
import { AddFilter } from '../../redux/courseSlice';
import { useDispatch } from 'react-redux';
import SearchNav from '../SearchNav/searchNav';

const FilterModal = (props) => {
    const [categoryOne, setCategoryOne] = useState(false);
    const [category2, setCategory2] = useState(false);
    const [category3, setCategory3] = useState(false);
    const [category4, setCategory4] = useState(false);
    const [category5, setCategory5] = useState(false);
    const [design1, setDesign1] = useState(false);
    const [design2, setDesign2] = useState(false);
    const [filterData, setFilterData] = useState(false);
    const [inputValue, setInputValue] = useState(null);

    const filterObj=[];
    const categoryId=[];
    const dispatch = useDispatch();

    const applyFilter=(props)=>{
        if(categoryOne)
        {
            let filter1 = {startDuration:5, endDuration:10};
            filterObj.push(filter1);
        }
        if(category2)
        {
            let filter2 = {startDuration:10, endDuration:20};
            filterObj.push(filter2);
        }
        if(category3)
        {
            let filter3 = {startDuration:20, endDuration:30};
            filterObj.push(filter3);
        }
        if(category4)
        {
            let filter4 = {startDuration:30, endDuration:40};
            filterObj.push(filter4);
        }
        if(category5)
        {
            let filter5 = {startDuration:40, endDuration:50};
            filterObj.push(filter5);
        }
        if(design1)
        {
            let catId1=1;
            categoryId.push(catId1);
        }
        if(design2)
        {
            let catId2=2;
            categoryId.push(catId2);
        }
        apply(); setCategoryOne(false); setCategory2(false); setCategory3(false); setCategory4(false); setCategory5(false); setDesign1(false); setDesign2(false);
       
    }

    const token = JSON.parse(localStorage.getItem("user"));
    const tokenID = token.token;

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
            console.log("nj",res);
            setFilterData(res?.data);
            // useDispatch(AddFilter(res?.data))
    
          })
          .catch((err) => {
            console.log(err);
          });
        };

        useEffect(()=>{
            dispatch(AddFilter(filterData));
        },[filterData]);

    return (
        <div className='modal'>
            <div className="overlay">
                <div className="modal-content">
                    <div className="modal-inner-content">
                        <div className="searc-filter">Search Fillters</div>
                        <img src={cross} alt="" className='filterModalClose-img' onClick={() => { props.setFilterModal(false); setCategoryOne(false); setCategory2(false); setCategory3(false); setCategory4(false); setCategory5(false); setDesign1(false); setDesign2(false); }} />
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

export default FilterModal;
