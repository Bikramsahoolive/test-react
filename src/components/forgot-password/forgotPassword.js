import './forgotPassword.css';
import React,{useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {sha256} from 'js-sha256'
import { ClipLoader } from 'react-spinners';
import Swal from 'sweetalert2';
import {resetUserPassword} from '../../services/authService';
import {changePassword} from '../../services/authService';

function ForgotPassword(){
const navigate = useNavigate();
const [emailData,setEmailData] = useState('');
const[otpSent,setOtpSent] = useState(false);


    async function forgotPassword(e){
        e.preventDefault();
        if(emailData==''){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: `Invalid Email Input`
              });
              return;
        }
       const respData =await resetUserPassword({email:emailData});

            if(respData.status =='success'){






                
                setOtpSent(true);
                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top",
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                      toast.onmouseenter = Swal.stopTimer;
                                      toast.onmouseleave = Swal.resumeTimer;
                                    }
                                  });
                                  Toast.fire({
                                    icon: "success",
                                    title: respData.message
                                  });

            }else{
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "error",
                    title: respData.message
                  });

            }
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
    const confPasswordRef = useRef(null);

    async function validatePasswod(e){
        e.preventDefault();
        const otpValue = otpRef.current.value;
        const passwordValue = passwordRef.current.value;
        const confPasswordValue = confPasswordRef.current.value;
        if(otpValue.length !=6){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title:"Invalid OTP Value"
              });
              return;
        }

        if(passwordValue.length<8 || passwordValue.length>16){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Password must 8 to 16 digit."
              });
              return;
        }

        if(passwordValue !== confPasswordValue){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Password Not Matching"
              });
              return;
        }
        const encPass = sha256(`${emailData}#${passwordValue}`);
        const data = {email:emailData,otp:otpValue,password:encPass};
        const respData =await changePassword(data);
        if(respData.status =='success'){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: respData.message
              });
              navigate('/login');

    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: respData.message
          });
    }
    }

    return(

    <div className="login-component">
   <div className="login-content">
     <div className="header">
     <i className="fa fa-lock fa-4x"></i>
       <h1 className='titel-login'><span className="l">FORGOT</span>PASSWORD</h1>
       <p style={{color:'gray'}}>You can reset your password here.</p>
     </div>

     {otpSent? <form onSubmit={validatePasswod}>
        {/* <label>OTP</label> */}
        <input type="text" placeholder="Enter OTP" className="inp" autoComplete="one-time-code" ref={otpRef} inputMode="numeric" maxLength="6" style={{marginBottom:"30px"}}/>
        {/* <label>New Password</label> */}
        <input type="password" placeholder='Enter New Password' ref={passwordRef}  className="inp"/>
        {/* <label>Confirm Password</label> */}
        <input type="text" placeholder='Enter Confirm Password' ref={confPasswordRef}  className="inp"/>
        <button type="submit" className='login-btn'><ClipLoader
                                            color="white"
                                            cssOverride={{ zIndex: 10 }}
                                            loading={false}
                                            size={15}
                                            speedMultiplier={1}
                                        />Change</button>
    </form> : <form onSubmit={forgotPassword}>
       <input id="email" name="email" placeholder='Enter User Email' className="inp"  type="email" onChange={validateEmail} required/>
       <button type="submit" className='login-btn'><ClipLoader
                                            color="white"
                                            cssOverride={{ zIndex: 10 }}
                                            loading={false}
                                            size={15}
                                            speedMultiplier={1}
                                        />Send OTP</button>
    </form> }


    <div className="signup">
   <span>Back to <a onClick={()=>navigate('/login')} style={{cursor:'pointer'}}>Login</a> </span>
    </div>
  </div>
</div>
    )
}

export default ForgotPassword;