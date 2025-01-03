import './login.css';
import React,{useState} from 'react';
import { sha256 } from "js-sha256";
import { ClipLoader } from 'react-spinners';
import {useNavigate} from 'react-router-dom'

function Login(){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username,setUsername]= useState('');
    const [passwordValue,setpasswordValue] = useState('');

    const [validUsername,setValidUsername]= useState(false);
    const [validPassword,setValidPassword] = useState(false);

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
            const encPass = sha256(username,passwordValue);
            const data = {
                email:username,
                password:encPass
            }
            loginUserApi(data);
        }else{
            alert('Invalid Credentials.');
        }
        
    }
    function userNavigate(usertype){
        if(usertype.usertype === 'user'){
            return navigate('/userDashboard');
       }
    }

    function loginUserApi(data){
        setLoader(true);

        fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(data)
        })
        .then((resp)=>resp.json())
        .then((respData)=>{
            alert(respData.message);
            window.localStorage.setItem('AUTH_TOKEN',respData.authToken);
            setLoader(false);
            userNavigate({usertype:'user'});
        })
        
    }

    return(
        <div className="login-component">
  <div className="login-content">
    <div className="header">
      <h1 className='titel-login'><span className="l">L</span>OGIN</h1>
    </div>
    <form onSubmit={loginUser}>
      <label>Username</label>
      <input type="text" onChange={validateUsername} className="inp" required />
      <label>Password</label>
      <input type="password" onChange={validatePassword} className="inp"  required />
      <button type="submit" className='login-btn'><ClipLoader
                                            color="white"
                                            cssOverride={{ zIndex: 10 }}
                                            loading={loader}
                                            size={15}
                                            speedMultiplier={1}
                                        />Enter</button>
    </form>
    <div className="signup">
      <b>Don't have account?</b>
      <a href="#">Sign up</a>
    </div>
  </div>
</div>
    )
} 

export default Login;