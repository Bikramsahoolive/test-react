import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './hero.css';
import { ClipLoader } from 'react-spinners';
import {sha256 } from 'js-sha256'
import { distData } from '../utils/districtData';

const textColor = {
    color: "white",
}
function Hero() {
    const navigate = useNavigate();
    const [nameTouched, setNameTouched] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [loader, setLoader] = useState(false);
    const [age, setNum] = useState(35);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null); 
    const distRef = useRef(null);
    const usertypeRef = useRef(null);

    const [usernameErr, setUsernameErr] = useState(true);
    const [userEmailErr, setUserEmailErr] = useState(true);
    const [passwordErr, setPasswordErr] = useState(true);

    // function increseNum() {
    //     if (age < 60) { setNum(age + 1); }
    //     else { alert("Maximum Age Reached!") };
    // }
    // function decreseNum() {
    //     if (age > 18) { setNum(age - 1); }
    //     else { alert("Minimum Age 18 Required!") };
    // }

    function usernameHandler(e) {
        let name = e.target.value;
        if (name.length < 3) {
            setUsernameErr(true);
        } else {
            setUsernameErr(false);
        }

    }

    function userEmailHandler(e) {
        let email = e.target.value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            setUserEmailErr(true);
        } else {
            setUserEmailErr(false);
        }
    }

    function passwordHandler(e) {
        let password = e.target.value;
        if (password.length < 8 || password.length > 16) {
            setPasswordErr(true);
        } else {
            setPasswordErr(false);
        }
    }

function touchedFn(type){
    if(type === 'name')setNameTouched(true);
    if(type === 'email')setEmailTouched(true);
    if(type === 'password')setPasswordTouched(true);
    
}

    function register(e) {
        e.preventDefault();
        if (usernameErr || userEmailErr || passwordErr) {
            alert('Invalid Form Data');
        } else {
            const username = nameRef.current.value;
            const userEmail = emailRef.current.value;
            const password = passwordRef.current.value;
            const usertype = usertypeRef.current.value;
            const districtCode = distRef.current.value;

            if(districtCode == '')return alert('Please select District.');
            if(usertype == '')return alert('Please select Role');

            const encPass = sha256(`${userEmail}#${password}`);

            setLoader(true);
            const data = { name: username, email: userEmail, password: encPass, userType:usertype, distCode:districtCode };

            saveDataOnDB(data,(err,resp)=>{
                if(err){
                    alert(err);
                    setLoader(false);
                }else{
                    alert(resp.message);
                    if (resp.status =="success"){
                        nameRef.current.value = '';
                        emailRef.current.value = '';
                        passwordRef.current.value = '';
                        usertypeRef.current.value='';
                        distRef.current.value='';
                        setNum(35);
                    }
                    setLoader(false);
                }
                    
                   });
        }


    }

    function saveDataOnDB(data, cb) {
        fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            cb(null,data)
        })
            .catch((err) => {
                cb(err,null);
                console.log(err);
            });
    }
    return (<div>
        <div className="main-container">
            <div className="blur-circle1">

            </div>
            <div className="blur-circle2">

            </div>
            <div className="landing-page">
                <div className="content">
                    <div className="container">
                        <div className="info">
                            <h2>Document Management System.</h2>
                            <p>A Govenment of Odisha initiative For hassle free citizen services.</p>
                            <div>
                                <form onSubmit={register}>
                                    <select className="reg-input" id='district' ref={distRef} name='district' style={{ width: '98%', height: '35px' }}>
                                        <option value=''>--Select District--</option>
                                        {distData.map((dist, index) => {
                                            return <option key={index} value={dist.districtCode}>{dist.odiaDistrictName}</option>
                                        })}
                                    </select>
                                    <select className="reg-input" id='usertype' name='usertype' ref={usertypeRef} style={{ width: '98%', height: '35px' }}>
                                        <option value=''>--Select Role--</option>
                                        <option value='admin'>Admin</option>
                                        <option value='deo'>DATA ENTRY OPERATOR</option>
                                        <option value='rk'>RECORD KEEPER</option>
                                    </select>

                                    <input className="reg-input" onBlur={()=>touchedFn('name')} id='name' type='text' placeholder='Enter Your Name' name='username' onChange={usernameHandler} ref={nameRef}></input> <br></br>
                                    {nameTouched && usernameErr ? <span style={{ color: 'red' }}>Invalid Name.</span> : null}
                                    <input className="reg-input" id='email' onBlur={()=>touchedFn('email')} type='email'autoComplete='off' placeholder='Enter Your Email' name='useremail' onChange={userEmailHandler} ref={emailRef}></input><br></br>
                                    { emailTouched && userEmailErr ? <span style={{ color: 'red' }}>Invalid Email.</span> : null}
                                    <input className="reg-input" id='password' onBlur={()=>touchedFn('password')} type='password' placeholder='Enter Your Password' name='password' onChange={passwordHandler} ref={passwordRef}></input><br></br>
                                    {passwordTouched && passwordErr ? <span style={{ color: 'red' }}>Invalid Password.</span> : null}
                                    {/* <div className="count">
                                        <button type='button' onClick={decreseNum}>-</button>
                                        <div><h2 style={textColor}>Your Age : {age} Years</h2></div>
                                        <button type='button' onClick={increseNum}>+</button>
                                    </div> */}
                                    <span >
                                        
                                        <button type='submit'>Register Now <ClipLoader
                                            color="white"
                                            cssOverride={{ zIndex: 10 }}
                                            loading={loader}
                                            size={15}
                                            speedMultiplier={1}
                                        /></button>
                                        </span>
                                </form>
                            </div>


                        </div>
                        <div className="image">
                            <img className="main-image" src="https://www.globodox.com/wp-content/uploads/2022/07/document_management_system_side_image-442x442.webp"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <section className="features">
            <h2>Features</h2>
            <div className="feature-list">
                <div className="feature">
                    <h3>Cloud Storage</h3>
                    <p>Store your documents securely and access them from anywhere at any time.</p>
                </div>
                <div className="feature">
                    <h3>Real-time Collaboration</h3>
                    <p>Work on documents together with your team in real time.</p>
                </div>
                <div className="feature">
                    <h3>Advanced Search</h3>
                    <p>Find any document quickly with our powerful search tools.</p>
                </div>
            </div>
        </section>


        <section className="testimonials">
            <h2>What Our Users Say</h2>
            <div className="testimonial-list">
                <div className="testimonial">
                    <p>"This system has revolutionized the way we manage our documents. It's easy to use and saves us so much time!"</p>
                    <h4>- Sarah L., Manager</h4>
                </div>
                <div className="testimonial">
                    <p>"I can access all my files from anywhere, and the collaboration features have been a game-changer for our team."</p>
                    <h4>- John D., Developer</h4>
                </div>
            </div>
        </section>


        <section id="cta" className="cta">
            <h2>Get Started Today</h2>
            <p>Sign up now and experience the benefits of efficient document management.</p>
            <a href="#" className="cta-button">Sign Up Now</a>
        </section>
    </div>);
}

export default Hero;