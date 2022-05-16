import React, { useEffect, useState } from 'react';
import './../style.css';
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Login = () => {

    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');
    const [icon,setIcon]=useState(eyeBlocked);
    const [type,setType]=useState('password');
    const [success,setSuccess]=useState(false);
    const [validCredintials,setValidCredintials]=useState(true);

    const navigate=useNavigate();
    const change=()=>{
        if(type==='password'){
            setType('text');
            setIcon(eye);
        }
        else{
            setType('password');
            setIcon(eyeBlocked);
        }
    }

    useEffect(()=>{
        const timeout=setTimeout(()=>{
            setValidCredintials(true);
          },3000)
    
          return ()=> clearTimeout(timeout);
    },[validCredintials])

    const submitHandler=async (e)=>{
        e.preventDefault();
        Axios.get("http://localhost:1200/api/login").then((response)=>{
            console.log(response);
           const isValid=response.data.data.find((item)=>(item.email===user && item.pwd===password))
           if(isValid){
               console.log('successfull login');
               setSuccess(true);
               setValidCredintials(true);
               console.log(response.data.user);
               localStorage.setItem('token',response.data.token);
               navigate('/dashboard');
           }
           else{
               console.log('unsuccessfulll');
               setValidCredintials(false);
                
           }
        }

        );
        setUser('');
        setPassword('');
        // console.log(user,password);
    }

  return (
    <>
        <div className="login"  >

            {
                success ? 
                <div className="loggedin">
                    You Are Logged In

                    <div className="link-home">
                        <Link to='/' >Go to Home</Link>
                    </div>

                </div>
                :

                <div>
                    <div className="l-head">
                LogIn 
                    </div>
                    <form  className='form' onSubmit={submitHandler}  >
                        <label htmlFor="user">Email Address:</label> <br />
                        <input type="email" name="user" id='email' value={user}
                        className="input-field" placeholder='abc@gmail.com' 
                        required onChange={(e)=>{setUser(e.target.value)}}
                        /><br /><br />

                        <label htmlFor="password">Password:</label><br />
                        <input type={type} name="password" id='password' value={password}
                        className="input-field" placeholder='********' required
                        onChange={(e)=>{setPassword(e.target.value)}} />
                        <span onClick={change} className='icon' ><Icon icon={icon} /> </span>
                        <br /> <br />
                        { validCredintials ? null  :
                            <div className='incorrect-data'>invalid username or password</div>
                         }

                        <button type="submit" className='glow-on-hover' >Login</button>
                    </form>
                    
                 </div>

            }
        </div>
    </>
  )
}

export default Login