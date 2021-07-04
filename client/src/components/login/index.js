import React,{useState,useRef} from 'react';
import './login.css';
import { useGlobalContext } from '../../context';
import axios from 'axios';
import {GrClose} from "react-icons/gr";
import {BiLoaderAlt} from "react-icons/bi";

const Login = () => {
    const {setCart,cart,setLogin,showLogin,setHideLoginModal}= useGlobalContext();
    const [authType,setAuthType] = useState('login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [error,setError] = useState({email: '',password:'',username:''});
    const [showForgot,setShowForgot] = useState(false);
    const [forgotMessage,setForgotMessage] = useState('');
    const spinnerRef = useRef(null)
    
    //email-setting state and removing whitespace
    const handleEmail = (e) =>{ 
        setEmail( e.target.value.trim());
        setError({email: '',password:'',username:''})
    }


    //authentication request
    const handleAuth = (e) =>{
        e.preventDefault();
        setEmail(email => {return email.replaceAll(" ","")});
        setError({email: '',password:'',username:''});
       
        //basic validation
        if(email===''){
            setError(error => {return({...error,email: 'please enter an email'})});
            return;
        }
        if(password === ''){
            setError(error => {return({...error,password: 'please enter a password'})});
            return;
        }

        spinnerRef.current.classList.add('show');
        //sending request
        axios.post(`/user/${authType}`,{email,password,username})
        .then(res=>{ 
            if(spinnerRef.current) spinnerRef.current.classList.remove('show');
            if(res.data.errors){
                setError({email:res.data.errors.email,password: res.data.errors.password, username: res.data.errors.username});
            }
            if(res.data.success){
                setHideLoginModal();
                //user logged in - merging cart and updating the frontend cart with merged cart
                axios.post('/user/mergecart',{cart})
                .then(res => {
                    if(res.data.cart){                      
                        setCart(res.data.cart);
                    }
                })
                .catch(err => console.log(err));   
                //setting login state - credentials are valid
                setLogin();
            }
        })
        .catch(() =>{
                if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                setError(error => {return({...error,password: 'an error occurred'})});
        });
    }

    //forgot password action
    const forgotPassword = () =>{
        let msg = 'A password reset link has been sent to your email';
        //validation for email
        if(email === ''){
            setError(error => {return({...error,email: 'please enter your email'})});
            return;
        }
        
        //sending request
        spinnerRef.current.classList.add('show');
        axios.post('/user/forgotpassword',{email})
        .then(res =>{
            if(res.data.success){
                if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                    setForgotMessage(msg);
                    setShowForgot(true);
            }
            if(res.data.error){
                if(spinnerRef.current) spinnerRef.current.classList.remove('show');
                console.log(res.data.error);
                setForgotMessage('could not send email');
                // setForgotMessage(res.data.error);
                setShowForgot(true);
            }
        })
        .catch(err => console.log('an error occurred'));
    }

    return (
        <>
            {showLogin === true?
                <div className="auth_wrapper" onClick={()=>{setHideLoginModal();setShowForgot(false)}}>
                <div className="auth" onClick={e=>e.stopPropagation()}>
                    <div className="auth__close" onClick={()=>{setHideLoginModal();setShowForgot(false)}}><GrClose/></div>
                    {showForgot?
                        <div className="auth__forgot">
                            <p>{forgotMessage}</p>
                        </div>
                        :<>
                            <div className="auth__headers">
                                <h1>{`${authType==='login'?'log in': 'sign up'}`}</h1>
                            </div>

                            <div className="auth__form__wrapper">
                                <form className="auth__form" onSubmit={handleAuth}>
                                    {authType==='signup'?<div className="auth__field">
                                        <input value={username} onChange={e=>{setUsername(e.target.value);setError({email: '',password:'',username: ''})}} autoComplete="off" type="text" id="username" placeholder="Username"/>
                                        <p className="auth__error">{error.username}</p>
                                    </div>
                                    :null}
                                    <div className="auth__field">
                                        <input value={email} onChange={handleEmail} autoComplete="off" type="text" id="email" placeholder="Email"/>
                                        <p className="auth__error">{error.email}</p>
                                    </div>
                                    <div className="auth__field">
                                        <input value={password} onChange={e=>{setPassword(e.target.value);setError({email: '',password:'',username: ''})}} autoComplete="off"  type="password" placeholder="Password"/>
                                        <p className="auth__error">{error.password}</p>
                                    </div>
                                    <button type="submit">{`${authType==='signup'?'sign up': 'login'}`}</button>
                                </form>

                                {authType==='login'?
                                    <div className="auth__toggle">
                                        <span > <button onClick={()=>setAuthType('signup')}>create an account</button> | <button onClick={forgotPassword}>forgot password?</button></span>
                                    </div>
                                :
                                    <div className="auth__toggle">
                                        <span> <button onClick={()=>setAuthType('login')}>already have an account?</button></span>
                                    </div>
                                }
                                <div className="auth__spinner" ref={spinnerRef}><BiLoaderAlt /></div>
                            </div>
                        </>
                    }
                </div>
            </div>
            :null}
        </>
    )
}

export default Login
