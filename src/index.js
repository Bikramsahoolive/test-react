import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Hero from './components/hero-page/hero'
import Login from './components/login-page/login';
import ForgotPassword from './components/forgot-password/forgotPassword';
import UserDashboard from './components/user-dashboard/userDashboard';
import RegisterUser from './components/register-user/registerUser';
import StorageInfo from './components/storage-information/storageInfo';
import reportWebVitals from './reportWebVitals';
import { RouterProvider,BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Hero />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />
      },
      {
        path: 'dashboard',
        element: <UserDashboard />
      }
      
    ]
  }

]);


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<App />}>
//         <Route path="" element={<Hero />} />
//         <Route path="login" element={<Login />} />
//         <Route path="forgotPassword" element={<ForgotPassword />} />
//         <Route path="dashboard" element={<UserDashboard />} />
//         <Route path="registerUser" element={<RegisterUser />} />
//         <Route path="storageInfo" element={<StorageInfo />} />
//       </Route>
//     </Route>
//   )
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
