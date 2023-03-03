import React, { useState } from 'react';
import './completed.css';
import completed1 from '../../assets/completed1.png';
import completed2 from '../../assets/completed2.png';
import { useEffect } from 'react';
import axios from 'axios';

const Completed = () => {
    const[completedCourse, setCompletedCourse] = useState();
    const token = JSON.parse(localStorage.getItem("user"));
    const tokenID = token.token;

    useEffect(()=>{
        axios.get(`https://app-virtuallearning-230221110922.azurewebsites.net/user/completed-courses`,
        {
            headers:{
                Authorization: `Bearer ${tokenID}`,
            }
        }).then((res)=>{
            console.log(res);
            setCompletedCourse(res);
        }).catch((err)=>{
            console.log(err);
        })
    })

    console.log("sompleted", completedCourse);

    return (
        <div className='completed-category-part'>
            <div className="completed-category">
                {completedCourse?.data?.map((data)=>{
                    return (
                <div className="completed-course">
                    <img src={data?.course_image} alt="" className='completed-course-photo' />
                    <div className="ongoing-course-information">
                        <div className="ongoing-Text">{data?.status}</div>
                        <div className="ongoing-course-name">{data?.course_name}</div>
                        <div className="ongoing-course-chapters">80% Approval Rate</div>
                        <button className='ongoing-continue-Btn'><span className='ongoing-continue-Text'>View certificate</span></button>
                    </div>
                </div>
                    )
                })}

                <div className="completed-course">
                    <img src={completed2} alt="" className='completed-course-photo' />
                    <div className="ongoing-course-information">
                        <div className="ongoing-Text">Completed</div>
                        <div className="ongoing-course-name">User Interface with Illustration</div>
                        <div className="ongoing-course-chapters">80% Approval Rate</div>
                        <button className='ongoing-continue-Btn'><span className='ongoing-continue-Text'>View certificate</span></button>
                    </div>
                </div>

                <div className="completed-course">
                    <img src={completed1} alt="" className='completed-course-photo' />
                    <div className="ongoing-course-information">
                        <div className="ongoing-Text">Completed</div>
                        <div className="ongoing-course-name">User Interface with Illustration</div>
                        <div className="ongoing-course-chapters">80% Approval Rate</div>
                        <button className='ongoing-continue-Btn'><span className='ongoing-continue-Text'>View certificate</span></button>
                    </div>
                </div>

                <div className="completed-course">
                    <img src={completed1} alt="" className='completed-course-photo' />
                    <div className="ongoing-course-information">
                        <div className="ongoing-Text">Completed</div>
                        <div className="ongoing-course-name">User Interface with Illustration</div>
                        <div className="ongoing-course-chapters">80% Approval Rate</div>
                        <button className='ongoing-continue-Btn'><span className='ongoing-continue-Text'>View certificate</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Completed