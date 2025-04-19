import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Validation } from './Validate';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const [signState, setSignState] = useState('Sign In');
    const [rememberMe,setRememberMe]=useState(false);
    const [formData,setFormData]=useState({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
    })
    const [errors,setErrors]=useState({});
    const navigate = useNavigate();  

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const dataArr=JSON.parse(localStorage.getItem('signupData'))|| [];
        let validationErrors={};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

        if(signState==='Sign Up'){
            validationErrors=Validation(formData,emailRegex,passwordRegex)
            if(!formData.username.trim()){
                validationErrors.username='username is required';
            }
            if(formData.password !== formData.confirmpassword){
                validationErrors.confirmpassword='password does not match';
            }
            setErrors(validationErrors);
            if(Object.keys(validationErrors).length===0){
                // localstorage
                const findEmail=dataArr.find(item=>item.email===formData.email);
                if(findEmail){
                    toast.error("this email already exists!!");
                }
                else{
                    dataArr.push(formData); 
                    localStorage.setItem('signupData',JSON.stringify(dataArr));
                    toast.success("Sign up Successfully!");
                    setSignState('Sign In')
                }
            }
        }
        if(signState==='Sign In'){
            validationErrors=Validation(formData,emailRegex,passwordRegex);
            setErrors(validationErrors);
            let loginData=dataArr.find(item=>item.email===formData.email && item.password===formData.password);
            if(loginData){
                localStorage.setItem("loginData",JSON.stringify(loginData));
                toast.success("Login Successfully!");
                navigate("/");
            }
            else{
                // if(loginData.email)
                const userEmail=dataArr.find(item=>item.email===formData.email);
                const userPassword=dataArr.find(item=>item.password===formData.password);
                if(!userEmail && !userPassword){
                    toast.error("Invalid Email and Password");
                }
                else if(!userEmail){
                    toast.error("Invalid Email");
                }
                else if(!userPassword){
                    toast.error("Invalid Password");
                }   
        }
    };
    }
    return (
        <div className='login'
            style={{
                backgroundImage: "url('/images/bg-login.jpg')",
                height: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <div className='login-overlay d-flex align-items-center justify-content-center'>
                <div className='login-container p-5 rounded-2'>
                    <h1 className='text-light mb-4 mt-2'>{signState}</h1>
                    <form className='d-flex flex-column' onSubmit={handleLogin}>
                        {signState === 'Sign Up' && 
                         <>
                            <div style={{order:1,display:'flex',flexDirection:'column'}}>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Your name'
                                    onChange={handleChange}
                                />
                                <div>{errors.username && <small className='text-danger'>{errors.username}</small>}</div>
                            </div>
                            <div style={{order:4,display:'flex',flexDirection:'column'}}>
                                <input
                                    type='password'
                                    name='confirmpassword'
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                />
                                <div>{errors.confirmpassword && <small className='text-danger'>{errors.confirmpassword}</small>}</div>
                            </div>
                         </>
                        }
                        <div style={{order:2,display:'flex',flexDirection:'column'}}>
                            <input
                                type='text'
                                name='email'
                                placeholder='Email'
                                onChange={handleChange}
                            />
                            <div>{errors.email && <small className='text-danger'>{errors.email}</small>}</div>
                        </div>
                        <div  style={{order:3,display:'flex',flexDirection:'column'}}>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                onChange={handleChange}
                            />
                            <div>{errors.password && <small className='text-danger'>{errors.password}</small>}</div>
                        </div>
                        <button className='border-0 p-2 text-light rounded-1 mt-4 fs-5' style={{order:5}}>
                            {signState === 'Sign In' ? 'Sign In' : 'Sign Up'}
                        </button>

                        <div className="form-help" style={{order:6}}>
                            <div className="remember d-flex align-items-center">
                                <input type='checkbox' className='me-2' />
                                <label htmlFor='' className='fs-6'>Remember Me</label>
                            </div>
                            <h6>Need Help?</h6>
                        </div>
                    </form>
                    <div className='form-switch'>
                        {signState === 'Sign In' ?
                            <h6>New To ZAW
                                <span onClick={() => {
                                    setSignState('Sign Up');
                                }}>Sign Up Now</span>
                            </h6> :
                            <h6>Already have Account ?
                                <span onClick={() => {
                                    setSignState('Sign In');
                                }}>Sign In Now</span>
                            </h6>
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login