import React from 'react';
import './test.css';
import SearchNav from '../SearchNav/searchNav';
import close from '../../assets/close.png';
import testClock from '../../assets/testClock.png';
import leftArrow from '../../assets/leftArrow.png';
import rightArrow from '../../assets/rightArrow.png';
import { useState } from 'react';

const Test = () => {
    const [testEnd, setTestEnd] = useState(false);
  return (
    <div>
        <SearchNav/>
        <div className="moduleTest-part">

            <div className="module-test-number-close">
                <div className="module-test-number">Module Test 2</div>
                <div className='test-close-btn' onClick={()=> setTestEnd(true)}><img src={close} alt="" /></div>
            </div>

            <div className="questions-time">
                <div className="number-of-questions">Question 5 of 25</div>
                <div className="time-left"><img src={testClock} alt="" />8mins remaining</div>
            </div>

            <div className="question-its-option">
                <form action="" className='question-option'>
                    <label htmlFor="" className="question-text">How to create dot-matrix in Figma without doing it dot-by-dot?</label>
                    <div className="choice-option"><input type="radio" name="" id="" /><label htmlFor="" className='option1'>Follow a bezier path</label></div>
                    <div className="choice-option"><input type="radio" name="" id="" /><label htmlFor="" className='option1'>Follow a dash line</label></div>
                    <div className="choice-option"><input type="radio" name="" id="" /><label htmlFor="" className='option1'>Follow a shape</label></div>
                    <div className="choice-option"><input type="radio" name="" id="" /><label htmlFor="" className='option1'>You can't do it with Figma</label></div>
                </form>
            </div>

            <div className="middle-btn">
                <div className="chapter-num-name">
                <div className="chapter-number-text">Chapter 3</div>
                <div className="chapter-name-text">Setting up a new project</div>
                </div>
                <div className="left-right-arrow">
                <div className="leftArrow"><img src={leftArrow} alt="" /></div>
                <div className="rightArrow"><img src={rightArrow} alt="" /></div>
                </div>
            </div>

        </div>  
        {testEnd && (
            <div className="modal">
                <div className="modal-overlay">
                    <div className="test-modal-content">
                        <div className="test-modal-inner-content">
                            <div className="do-you-want-text">Do you want to end the test?</div>
                            <div className="leftOut-time-text">You still have 50 second remaining </div>
                            <div className="warning-text">If you want to check your answer again, press cancel button. If you want to end the test <br /> and submit your answers you can press submit button.</div>
                            <div className="cancel-submit-btn">
                                <button className='cancelText-btn' onClick={()=>{setTestEnd(false)}}><span className='cancelText'>Cancel</span></button>
                                <button className='submitText-btn'><span className='submitText'>Submit</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Test;