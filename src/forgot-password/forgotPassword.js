import './forgotPassword.css';
import React,{useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {sha256} from 'js-sha256'
function ForgotPassword(){
const navigate = useNavigate();
const [emailData,setEmailData] = useState('');
const[otpSent,setOtpSent] = useState(false);


    function resetPassword(e){
        e.preventDefault();
        if(emailData=='')return alert('Invalid Email.');
        resetUserPassword({email:emailData});
        
    }

    function resetUserPassword(data){

        fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/forgotPassword',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then((resp)=>resp.json())
        .then((respData)=>{
            alert(respData.message);
            if(respData.status =='success'){
                setOtpSent(true);
            }
        })
        .catch((err)=>console.log('Error',err));
    }

    function validateEmail(e){
        const emailVal = e.target.value;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(emailVal);
        if (isValidEmail) {
            setEmailData(emailVal);
        }else{
            setEmailData('');
        }
    }
    
    const otpRef = useRef(null);
    const passwordRef = useRef(null);

    function validatePasswod(){
       

        const otpValue = otpRef.current.value;
        const passwordValue = passwordRef.current.value;
        const encPass = sha256(emailData,passwordValue)
        const data = {email:emailData,otp:otpValue,password:encPass};
        changePassword(data);

    }
    function changePassword(data){
        fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/verifyPassword',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        .then((resp)=>resp.json())
        .then((respData)=>{
            alert(respData.message);
            if(respData.status =='success'){
                navigate('/login');
            }
        })
        .catch((err)=>console.log('Error',err));
    }



    return(
        <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"/>
<div className="form-gap"></div>
<div className="container">
	<div className="row">
		<div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
    
                    <form id="register-form" autoComplete="off" className="form">
    
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="email" name="email" placeholder="email address" className="form-control"  type="email" onChange={validateEmail}/>
                        </div>
                      </div>
                      <div className="form-group">
                        <input name="recover-submit" className="btn btn-lg btn-primary btn-block" onClick={resetPassword} type="submit"/>
                      </div>
                      
                      <input type="hidden" className="hide" name="token" id="token" value=""/> 
                    </form>
                    {otpSent?<div>
                    <br></br>
	<span>One Time Password</span> <br></br>
	<input type="text" autocomplete="one-time-code" ref={otpRef} inputmode="numeric" maxlength="6" style={{marginBottom:"30px"}}/>
    <br></br>
    <span>New Password</span> <br></br>
    <input type="password" ref={passwordRef}  style={{marginBottom:"30px"}}/>
    <input className="btn btn-lg btn-primary btn-block" onClick={validatePasswod} type="submit" value="Verify"/>
</div>:null}
    
                  </div>
                </div>
              </div>
            </div>
          </div>
	</div>
</div>
        </div>
    )
}

export default ForgotPassword;