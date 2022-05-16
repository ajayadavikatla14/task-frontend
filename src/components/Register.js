import React, { useState } from 'react';
import './../style.css';
// import { Link } from 'react-router-dom';
import {Icon} from 'react-icons-kit';
import {eye} from 'react-icons-kit/icomoon/eye';
import {eyeBlocked} from 'react-icons-kit/icomoon/eyeBlocked';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const Register = () => {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('')
    const [pwd,setPwd]=useState('');
    const [pwd2,setPwd2]=useState('');
    

    const [icon1,setIcon1]=useState(eyeBlocked);
    const [type1,setType1]=useState('password');
    const [icon2,setIcon2]=useState(eyeBlocked);
    const [type2,setType2]=useState('password');

    const changeOne=()=>{
        
        if(type1==='password'){
            setType1('text');
            setIcon1(eye);
        }
        else{
            setType1('password');
            setIcon1(eyeBlocked);
        }
    }
    const changeTwo=()=>{
        if(type2==='password'){
            setType2('text');
            setIcon2(eye);
        }
        else{
            setType2('password');
            setIcon2(eyeBlocked);
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(name,email,phone,pwd,pwd2);

        Axios.post("http://localhost:1200/api/register",{
            name:name,
            email:email,
            phone:phone,
            pwd:pwd,
            pwd2:pwd2
        }).then(()=>console.log('success'))
        .then(navigate('/login'))

        
        setName('');
        setEmail('');
        setPhone('');
        setPwd('');
        setPwd2('');
     }
  return (
    <>
        <div className="Signup">
            
                <div>
                <div className="l-head">
                    Signup 
                </div>
                <form action="/signup" method='POST' className='form' onSubmit={submitHandler} >
                    <label htmlFor="name">Username:</label> <br />
                    <input type="text" name="name" id='name' className="input-field" value={name}
                    placeholder='ex: john' required onChange={(e)=>{setName(e.target.value)}}  /><br /><br />
    
                    <label htmlFor="email">Email Address:</label> <br />
                    <input type="email" name="email" id='email' className="input-field" value={email}
                     placeholder='abc@gmail.com'  required onChange={(e)=>{setEmail(e.target.value)}} /><br /><br />

<                   label htmlFor="phone">Phone :</label> <br />
                    <input type="tel" name="ph" id='phone' className="input-field" value={phone}
                     placeholder=''  required onChange={(e)=>{setPhone(e.target.value)}} /><br /><br />
    
                    <label htmlFor="pwd">Password:</label><br />
                    <input type={type1} name="pwd" id='pwd' className="input-field" value={pwd}
                     placeholder='********' required onChange={(e)=>{setPwd(e.target.value)}} />
    
                    <span onClick={changeOne} className='icon' ><Icon icon={icon1} /> </span>
                    <br /> <br />
    
                    <label htmlFor="pwd2">Confirm Password:</label><br />
                    <input type={type2} name="pwd2" id='pwd2' className="input-field" value={pwd2}
                     placeholder='********' required onChange={(e)=>{setPwd2(e.target.value)}} />
    
                    <span onClick={changeTwo} className='icon' ><Icon icon={icon2} /> </span>
                    <br /> <br />
                    <button type="submit" className='glow-on-hover' >Signup</button>
                </form>
                </div>

            
        </div>
    </>
  )
}

export default Register