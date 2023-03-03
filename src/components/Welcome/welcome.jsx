import React from 'react';
import './welcome.css';
import vlLogo from '../../assets/virtuallearn_logo.png';
import google from '../../assets/google.png';
import facebook from '../../assets/facebook.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import error from '../../assets/error.png';
import { useNavigate } from 'react-router-dom';


const Welcome = () => {
    const initialValues = {userName: "", password: "" };
    const [formValue, setFormValue] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
        setUsername(formValue.userName)
        setPassword(formValue.password)     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError(validate(formValue));
        // console.log(formValue);
        setIsSubmit(true);
    };

    const validate = (values) => {
        const errors = {}
        if(!values.userName) {
            errors.userName = "User Name is required!"
        }
        if(!values.password) {
            errors.password = "Password is required!"
        }
        return errors;
    }

    useEffect(()=>{
        if(Object.keys(formError).length === 0 && isSubmit) {
            console.log("fy",formValue);
        }
    }, [formError]);

    const toast = ()=>{
        toast.error('🦄 Wow so easy!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }


    const handleLogin = async () => {
        let item = {username, password}
        console.warn("ddddd",formValue.userName,formValue.password)
        let result = await fetch("https://app-virtuallearning-230221110922.azurewebsites.net/auth/login",{
            method: "POST",
           
            headers: {
                "Content-Type": "application/JSON",
                "Accept": "application/JSON",
                "username": formValue.userName,
                "password":formValue.password
            }
        });
        // console.log("server", result);
        // if(result.status === 400){
        //     toast();
        // }
        result = await result.json();
        console.warn(result);
        if (result) {
            localStorage.setItem("user", JSON.stringify(result));
            localStorage.setItem("userName", JSON.stringify(formValue.userName))
            localStorage.setItem("Password", JSON.stringify(formValue.password))
            
        const token = JSON.parse(localStorage.getItem("user"));
        const tokenID = token.token;
        const profileURL = token.profileUrl;

            navigate("/home");
          } 
          else {
            alert("Please enter the correct details");
          }
    }

    return (
        <div className='welcome-container'>
            <div className="welcome-box">
                <div className="logo"><img src={vlLogo} alt="" /></div>
                <div className="welcome-back-text">Welcome Back!</div>
                <div className="easy-to-learn-text">Easy to learn anytime and anywhere. <br /> Login to your account</div>
                <div className="google-facebook-btn">
                    <button className='facebook-btn'><img src={facebook} alt="" /></button>
                    <button className='google-btn'><img src={google} alt="" /></button>
                </div>

                <form action="" id='login' className='login-form' onSubmit={handleSubmit}>
                    <div >

                    <Box component="form" className='form-container' sx={{ '& > :not(style)': { m: 1, width: '40ch', borderColor: 'red' }, }} noValidate autoComplete="off">
                        <TextField id="standard-basic" type="text" name='userName' value={formValue.userName} onChange={handleChange} InputLabelProps={{
                            style: {
                                color: "#617FB6",
                                fontSize: "16px",
                                fontWeight: "400",
                                fontFamily: "Avenir, sans-serif",
                                fontStyle: 'Roman',
                                lineHeight: "21.86px",
                                letterSpacing: "0.4px"
                            }
                        }}
                            label="Username" InputProps={{
                                style: {
                                    color: "#ffffff",
                                    fontFamily: "Avenir, sans-serif",
                                    fontSize: "20px",
                                    letterSpacing: "0.4px",
                                    // paddingLeft: "0.5rem",
                                    lineHeight: "27.32PX",
                                    fontWeight: "500",
                                }
                            }} variant="standard" />
                            <div className="errorMessage">{formError.userName}</div>
                        <TextField id="standard-basic" type="text" name='password' value={formValue.password} onChange={handleChange} InputLabelProps={{
                            style: {
                                color: "#617FB6",
                                fontSize: "16px",
                                fontWeight: "400",
                                fontFamily: "Avenir, sans-serif",
                                fontStyle: 'Roman',
                                lineHeight: "21.86px",
                                letterSpacing: "0.4px"
                            }
                        }} label="Enter your Password" InputProps={{
                            maxLength: 10,
                            minLength: 10,
                            style: {
                                color: "#ffffff",
                                fontFamily: "Avenir, sans-serif",
                                fontSize: "20px",
                                letterSpacing: "0.4px",
                                // paddingLeft: "0.5rem",
                                lineHeight: "27.32PX",
                                fontWeight: "500",
                            }
                        }} variant="standard" maxLength={10} minLength={10} />
                        <div className="errorMessage">{formError.password}</div>
                    </Box>
                    </div>

                </form>

                <button className='continue-btn' form='login' onClick={handleLogin}><span className='continue-text'>Continue</span></button>
                <div className="dont-have-account">Don’t have a account? <Link to='/home'><span className='register-text'>Register</span></Link></div>

            </div>

        </div>
    )
}

export default Welcome;
