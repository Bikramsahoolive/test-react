import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hero from './components/hero-page/hero'
import Login from './components/login-page/login';
import ForgotPassword from './components/forgot-password/forgotPassword';
import UserDashboard from './components/user-dashboard/userDashboard';
import RegisterUser from './components/register-user/registerUser';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <>
   <BrowserRouter>
   <App/>
   <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/dashboard' element={<UserDashboard/>}/>
    <Route path='/register' element={<RegisterUser/>}>
    </Route>
   </Routes>
   </BrowserRouter>
   </>
   </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
