import React from 'react';
import Slider from '../../components/Slider/slider';
import Welcome from '../../components/Welcome/welcome';
import './login.css';

const Login = () => {
  return (
    <div className='login-container'>
        {/* <div className="login-box"> */}
            <Slider/>
            <Welcome/>
        {/* </div> */}
    </div>
  )
}

export default Login;
