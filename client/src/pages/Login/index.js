import React,{useState} from 'react';
import './login.css';
import axios from 'axios';
import {BiErrorCircle} from "react-icons/bi";
import { useGlobalContext } from '../../context';

const SignUp = () => {
    const {setToken}= useGlobalContext();
    const [authType,setAuthType] = useState('login');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState({email: '',password:''});

    const handleAuth = (e) =>{
        e.preventDefault();
        setError({email: '',password:''});
        if(email===''){
            // setError({...error,email: 'please enter an email'});
            setError(error => {return({...error,email: 'please enter an email'})});
        }
        if(password === ''){
            setError(error => {return({...error,password: 'please enter a password'})});
            return;
        }

        axios.post(`/${authType}`,{email,password})
        .then(res=>{ 
            console.log(res.data);
            // const user = res.data;
            // console.log(jwt_token);
            // setToken(jwt_token);
            if(res.data.errors){
                setError({email:res.data.errors.email,password: res.data.errors.password});
            }
            //here i would like to do different things depending on the auth type
        })
        .catch(err =>console.log(err));
    }
    return (
        <div className="auth">
            <div className="auth__center center">
                <div className="auth__container">
                    <div className="auth__headers">
                        <h1>{`${authType==='login'?'log in': 'sign up'}`}</h1>
                    </div>
                    <div className="auth__form__wrapper">
                        <form className="auth__form" onSubmit={handleAuth}>
                            <div className="auth__field">
                                <input value={email} onChange={e=>{setEmail(e.target.value);setError({email: '',password:''})}} autoComplete="off" type="text" id="email" placeholder="Email"/>
                                <p className="auth__error">{error.email}</p>
                            </div>
                            <div className="auth__field">
                                <input value={password} onChange={e=>{setPassword(e.target.value);setError({email: '',password:''})}} autoComplete="off"  type="password" placeholder="Password"/>
                                <p className="auth__error">{error.password}</p>
                            </div>
                            <button type="submit">{`${authType==='signup'?'sign up': 'login'}`}</button>
                        </form>

                        {authType==='login'?
                            <div className="auth__toggle">
                                <span > <button onClick={()=>setAuthType('signup')}>create an account</button></span>
                                <div>or</div>
                                <div><button>forgot password?</button></div>
                            </div>
                        :
                            <div className="auth__toggle">
                                <span> <button onClick={()=>setAuthType('login')}>already have an account?</button></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SignUp
