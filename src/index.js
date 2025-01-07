import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hero from './hero-page/hero'
import Login from './login-page/login';
import ForgotPassword from './forgot-password/forgotPassword';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserDashboard from './user-dashboard/userDashboard';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
   <BrowserRouter>
   <App/>
   <Routes>
    <Route path='/' element={<Hero/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/dashboard' element={<UserDashboard/>}>
    </Route>
   </Routes>
   </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
