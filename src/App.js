import './App.css';
import {Link,useParams, useNavigate,NavLink,Outlet} from 'react-router-dom';
import odishaLogo from './assets/odisha_logo.svg';
function App() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('AUTH_TOKEN');
    function logout(){
        localStorage.removeItem('AUTH_TOKEN');
        //API Call.
        return navigate('/');
    }

  return (  <> <div className="navbar">
    <img src={odishaLogo} alt='Govt Of Odisha'/>
    <h3 className="logo">Department of Revenue and Disaster Management Govenment of Odisha</h3>

    <div className="navlinks">
        {authToken ? null : <NavLink to="/" className =  {({isActive})=> isActive ? 'active' : 'inactive'}>Home</NavLink>}
        {authToken ? <a onClick={logout}>Logout</a> : <NavLink to='/login' className={({isActive})=> isActive ? 'active' : 'inactive'} >Login</NavLink>}
        
    
    </div>
</div>
{/* 
<div className='dropdown'>
<a href="#">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
    <button className="login">Login</button>
</div>
 */}
 <Outlet/>
</>);
}

export default App;