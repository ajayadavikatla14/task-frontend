import  Axios  from 'axios'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../style.css';

const Dashboard = () => {

  const [silver,setSilver]=useState(1);
  const [gold,setGold]=useState(2);
  const [diamond,setDiamond]=useState(3);
  const [platinum,setPlatinum]=useState(4);
  var [start,setStart]=useState(1);
  const [current,setCurrent]=useState('silver');
  const [next,setNext]=useState('Gold');
  const [cost,setCost]=useState('$10');
  const navigate=useNavigate();
  const AuthHandler=()=>{
    Axios.get('http://localhost:1200/api/dashboard',{
      headers:{
        "x-access-token":localStorage.getItem('token')
      }
    }).then((response)=>console.log(response))
    alert('check in the console is valid user or not..');
  }



  const signOut=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    console.log(silver,setSilver,setGold,setDiamond,setPlatinum);
  }

  const silverHandler=()=>{
    alert('Cannot DownGrade Plan.')
  }
  const GoldHandler=()=>{
    setStart(++start);
    if(start===gold){
      setCurrent("Gold");
      alert('You Are Now A GOLD Memebr')
      setNext('Diamond')
      setCost('$20')
    }else{
      setStart(--start);
      alert(`Invalid Plan Upgrade To gold..!!!`)
    }
  }
  const DiamondHandler=()=>{
    setStart(++start);
    if(start===diamond){
      setCurrent("Diamond");
      alert('You Are Now A DIAMOND Memebr');
      setNext('Platinum');
      setCost('$50')
    }else{
      setStart(--start);
      alert(`Invalid Plan Upgrade To diamond..!!!`)
    }
    
  } 
  const PlatinumHandler=()=>{
    setStart(++start);
    if(start===platinum){
      setCurrent("Platinum");
      alert('You Are Now A PLATINUM Memebr')
      setNext('Fully Upgraded.');
      setCost('')
    }else{
      setStart(--start);
      alert(`Invalid Plan Upgrade To platinum..!!!`);
    
    }
  }

  return (
    <>
        <div className={`content ${current}`}>
          <div className="text">
            Current Plan : {current}   <br />
            { current ==='Platinum' ? <span>Awesome Fully Upgraded .!!</span> :
              <span>  Upgrade to {next} for just {cost} only</span> }
          </div>
        </div>
        <button onClick={AuthHandler} className='auth' >Authentication Check</button>
        <div className="signout">
        <button onClick={signOut} className='sign-btn' >SignOut</button>
        </div>
        <div className="left-scroll">
          <div className="btn-grp">
            <button className='btn' onClick={silverHandler}>Silver</button>
          </div>
          <div className="btn-grp">
            <button className='btn' onClick={GoldHandler}>Gold</button>
          </div>
          <div className="btn-grp">
            <button className='btn' onClick={DiamondHandler}>Diamond</button>
          </div>
          <div className="btn-grp">
            <button className='btn' onClick={PlatinumHandler}>Platinum</button>
          </div>
        </div>
    </>
  )
}

export default Dashboard