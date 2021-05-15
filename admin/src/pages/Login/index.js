import React,{useState,useRef} from 'react';
import './login.css';
import { Redirect } from 'react-router'
import { useGlobalContext,baseUrl } from '../../context';
import axios from 'axios';
import Loader from '../../components/loader';


const Login = () => {
    const {setIsLoggedIn,setType,fetchAdmin,fetchOrder,fetchUser,isLoggedIn}= useGlobalContext();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState({email: '',password:''});
    const [showForgot,setShowForgot] = useState(false);
    const [showSpinner,setShowSpinner] = useState(false);
    const [forgotMessage,setForgotMessage] = useState('');
    
    const handleEmail = (e) =>{ 
        setEmail( e.target.value.trim());//setting email as well as removing whitespace
        setError({email: '',password:''})
    }
    const handlePassword = (e) =>{
        setPassword(e.target.value);
        setError({email: '',password:''});
    }

    const handleAuth = (e) =>{
        e.preventDefault();
        setEmail(email => {return email.replaceAll(" ","")});
        setError({email: '',password:''});
        if(email===''){
            setError(error => {return({...error,email: 'please enter an email'})});
            return;
        }
        if(password === ''){
            setError(error => {return({...error,password: 'please enter a password'})});
            return;
        }
        setShowSpinner(true);
        axios.post(`${baseUrl}/admin/login`,{email,password})
        .then(res=>{ 
            // if(spinnerRef.current) spinnerRef.current.classList.remove('show');
            if(res.data.errors){
                setError({email:res.data.errors.email,password: res.data.errors.password});
                setShowSpinner(false);
            }
            if(res.data.success){
                console.log()
                setIsLoggedIn(true);
                setType(res.data.type);
                // setShowSpinner(false);
                fetchAdmin();//this wasn't erasing if logged in and logged out with different admin roles except on refresh
                fetchOrder();
                fetchUser();
            }
        })
        .catch(err =>{
                setShowSpinner(false);
        });
    }

    const forgotPassword = () =>{
        let msg = 'A password reset link has been sent to your email';
        setShowSpinner(true);
        if(email === ''){
            setError(error => {return({...error,email: 'please enter your email'})});
            return;
        }
        axios.post(`${baseUrl}/admin/forgotpassword`,{email})
        .then(res =>{
            console.log(res.data);
            if(res.data.success){
                    setShowSpinner(false);
                    setForgotMessage(msg);
                    setShowForgot(true);
            }
            if(res.data.error){
                setShowSpinner(false);
                setForgotMessage(res.data.error);
                setShowForgot(true);
            }
        })
        .catch(err => console.log('an error occurred'));
    }
    if(isLoggedIn){
        return <Redirect to ="/"></Redirect>
    }

    return (
        <>
                <div className="auth_wrapper" >
                <div className="auth">
                    {showForgot?
                        <div className="auth__forgot">
                            <p>{forgotMessage}</p>
                            <div className="btn-wrapper">
                                <button className="btn" onClick={()=>{setShowForgot(false);setShowSpinner(false)}}>back to login screen</button>
                            </div>
                        </div>
                        :<>
                            <div className="auth__headers">
                                <h1>log in</h1>
                            </div>

                            <div className="auth__form__wrapper">
                                <form className="auth__form" onSubmit={handleAuth}>
                                    <div className="auth__field">
                                        <input value={email} onChange={handleEmail} autoComplete="off" type="text" id="email" placeholder="Email"/>
                                        <p className="auth__error">{error.email}</p>
                                    </div>
                                    <div className="auth__field">
                                        <input value={password} onChange={handlePassword} autoComplete="off"  type="password" placeholder="Password"/>
                                        <p className="auth__error">{error.password}</p>
                                    </div>
                                    <button type="submit">login</button>
                                </form>
 
                                <div className="forgot__btn">
                                    <span > <button onClick={forgotPassword}>forgot password?</button></span>
                                </div>
                                {showSpinner?<div className="inline__loader login__spinner"><Loader/></div>:null}
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Login
