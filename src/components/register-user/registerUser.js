import './registerUser.css';
import React,{useState,useEffect} from 'react';
import { sha256 } from "js-sha256";
import { ClipLoader } from 'react-spinners';
import { distData } from '../../utils/districtData';
import {registerUserApi} from '../../services/authService';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

function RegisterUser(){
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [username,setUsername]= useState('');
    const [passwordValue,setpasswordValue] = useState('');
    const [userType,setUserType] = useState('user');
    const [distCode,setDistCode] = useState('');
    const [validUsername,setValidUsername]= useState(false);
    const [validPassword,setValidPassword] = useState(false);
    const [validDistCode,setValidDistCode] = useState(false);
    const [validUserType,setValidUserType] = useState(true);
    const [distDataList,setDistDataList] = useState([]);
    useEffect( ()=>{
        setDistDataList(distData);
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
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        const isValidPassword = passwordRegex.test(passwordVal);
        if (isValidPassword) {
            setpasswordValue(passwordVal);
            setValidPassword(true);
        }else{
            setpasswordValue('');
            setValidPassword(false);
        }
    }

    function validateDistCode(e){
        let distCodeVal = e.target.value;
        if(distCodeVal){
            setDistCode(distCodeVal);
            setValidDistCode(true);
        }else{
            setDistCode('');
            setValidDistCode(false);
        }
    }

    function validateUserType(e){
        let userTypeVal = e.target.value;
        if(userTypeVal){
            setUserType(userTypeVal);
            setValidUserType(true);
        }else{
            setUserType('');
            setValidUserType(false);
        }
    }

    async function registerUser(e){
        e.preventDefault();
        if(validUsername && validPassword && validDistCode && validUserType){
            setLoader(true);
            const encPass = sha256(`${username}#${passwordValue}`);
            const data = {
                email:username,
                password:encPass,
                distCode:distCode,
                userType:userType
            }
            const result = await registerUserApi(data);
            if(result.status === 200){
                const Toast = Swal.mixin({
                    toast: true,
                    position:"top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon:'success',
                    title: result.message
                  });
                  navigate('/login');

                }else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position:"top",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon:'error',
                        title: result.message
                      });
                }
                setLoader(false);

            }

        }
        return(
            <div className="register-user">
                <h1>Register</h1>
                <form onSubmit={registerUser}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={validateUsername} placeholder="Email" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" onChange={validatePassword} placeholder="Password" required/>
                    </div>
                    <div className="form-group">
                        <label>District</label>
                        <select className="form-control" onChange={validateDistCode} required>
                            <option value="">Select District</option>
                            {distDataList.map((dist)=>{
                                return <option key={dist.code} value={dist.code}>{dist.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>User Type</label>
                        <select className="form-control" onChange={validateUserType} required>
                            <option value="">Select User Type</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <ClipLoader color={"#000"} loading={loader} size={50} />
            </div>
        )

}

export default RegisterUser;