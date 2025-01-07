import './login.css';
import React,{useState,useEffect,useRef} from 'react';
import { sha256 } from "js-sha256";
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom'
import { distData } from '../utils/districtData';

function Login(){
    const localAuthToken = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username,setUsername]= useState('');
    const [passwordValue,setpasswordValue] = useState('');
    const captchaRef = useRef(null);
    const distRef = useRef(null);

    const [validUsername,setValidUsername]= useState(false);
    const [validPassword,setValidPassword] = useState(false);
    const [captcha,setCaptcha] = useState({});
    useEffect( ()=>{
        async function fetchData(){
            const response = await fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/captcha',{
                method: 'GET',
        credentials: 'include',
            });
        const captchaSVG = await response.json();
        setCaptcha(captchaSVG)
        }

        fetchData();
        
    },[]);

    function validateUsername(e){
        let usernameVal = e.target.value;
        // setUsername(username);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(usernameVal);
        if (isValidEmail) {
            setUsername(usernameVal);
            setValidUsername(true);
        }else{
            setUsername('');
            setValidUsername(false);
        }
    }

    function validatePassword(e){
        let passwordVal = e.target.value;
            
        setpasswordValue(passwordVal);
            setValidPassword(true);
        
    }

    function loginUser(e){
        e.preventDefault();
        if(validUsername && validPassword){
            const encPass = sha256(`${username}#${passwordValue}`);
            const captchaVal = captchaRef.current.value;
            const distVal   = distRef.current.value;
            if(distVal == '')return alert('Please Choose District.');
            if(captchaVal !==captcha.text )return alert('Enter valid captcha.');
            const data = {
                email:username,
                password:encPass,
                captcha:captchaVal,
                districtCode:distVal
            }
            
            loginUserApi(data);
        }else{
            alert('Invalid Credentials.');
        }
        
    }
    function userNavigate(usertype){
        if(usertype.usertype === 'user'){
            return navigate('/dashboard');
       }
    }

    function loginUserApi(data){
        setLoader(true);

        fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/login',{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        .then((resp)=>resp.json())
        .then((respData)=>{
            alert(respData.message);
            setLoader(false);
            if(respData.status==='success'){
                window.localStorage.setItem('AUTH_TOKEN',respData.authToken);
                userNavigate({usertype:'user'});   
            }
            
        }).catch((err)=>{
            alert('Error while login.');
            console.log(err);
            setLoader(false);
        });
        
    }

    function navigateToForgotPassword(){
        return navigate('/forgotPassword');
    }

    return(localAuthToken?<h1 style={{marginTop:'100px',color:'Black'}}>Already Logged In.</h1>:
        <div className="login-component">
  <div className="login-content">
    <div className="header">
      <h1 className='titel-login'><span className="l">L</span>OGIN</h1>
    </div>
    <form onSubmit={loginUser}>
        <select className="district-data" ref={distRef} id='district' name='district' style={{ width: '99%', height: '35px' }}>
                                                <option value=''>--Select District--</option>
                                                {distData.map((dist, index) => {
                                                    return <option key={index} value={dist.districtCode}>{dist.odiaDistrictName}</option>
                                                })}
                                            </select>
      <label>Username</label>
      <input type="email" onChange={validateUsername} className="inp" required />
      <label>Password</label>
      <input type="password" onChange={validatePassword} className="inp"  required />
      <div style={{display:'flex', width:'90%'}}>
      {captcha ? (<div
          dangerouslySetInnerHTML={{
            __html: captcha.data,
          }}
        />
      ) : (
        <p>Loading Captcha...</p>
      )}
      <input type='text' placeholder='Enter Captcha' ref={captchaRef} style={{width:'120px', height:'40px', border:'none',outline:'none',borderBottom:'2px solid black'}}/>
      </div>
      <button type="submit" className='login-btn'><ClipLoader
                                            color="white"
                                            cssOverride={{ zIndex: 10 }}
                                            loading={loader}
                                            size={15}
                                            speedMultiplier={1}
                                        />Enter</button>
    </form>
    <div className="signup">
    <a onClick={navigateToForgotPassword}>Forgot Password</a>
    </div>
  </div>
</div>
    )
} 

export default Login;