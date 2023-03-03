import React from 'react';
import './ongoing.css';
import Card1 from '../../assets/card1.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { AddId } from '../../redux/courseSlice';

const Ongoing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ongoingCourse, setOngoingCourse] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const tokenID = token.token;
    // console.log(tokenID);

    useEffect(()=>{
        axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/ongoing-courses`,
        {
            headers:{
                Authorization: `Bearer ${tokenID}`, 
            },
        }
        ).then((res)=>{
            console.log(res);
            setOngoingCourse(res);

        }).catch((err)=>{
            console.log(err);
        })

    },[]);

    console.log('jfdnjd', ongoingCourse);

    return (
        <div className='ongoing-category-container'>
            <div className="ongoing-category">
                {ongoingCourse?.data?.map((data)=>{
                    return (
                <div className="ongoing-course"  onClick={() => { dispatch(AddId(data?.course_id)); navigate("/overview"); }}>
                    <img src={data?.course_image} alt="" className='ongoing-course-photo' />
                    <div className="ongoing-course-information">
                        <div className="ongoing-Text">{data?.status}</div>
                        <div className="ongoing-course-name">{data?.course_name}</div>
                        <div className="ongoing-course-chapters">{data?.chapter_count} chapters</div>
                        <button className='ongoing-continue-Btn'><span className='ongoing-continue-Text' >Continue</span></button>
                    </div>
                </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Ongoing
