import './App.css';
import {Link,useParams, useNavigate} from 'react-router-dom';
import odishaLogo from './assets/odisha_logo.svg';
function App() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('AUTH_TOKEN');
    function logout(){
        localStorage.removeItem('AUTH_TOKEN');
        //API Call.
        return navigate('/');
    }

  return (  <div> <div className="navbar">
    <img src={odishaLogo} alt='Govt Of Odisha'/>
    <h3 className="logo">Department of Revenue and Disaster Management Govenment of Odisha</h3>

    <div className="navlinks">
        {authToken ? null : <Link to={'/'}>Home</Link>}
        {authToken ? <a onClick={logout}>Logout</a> : <Link to={'/login'}>Login</Link>}
        
    
    </div>
</div>
{/* <div className='dropdown'>
<a href="#">Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
    <button className="login">Login</button>
</div> */}
</div>);
}

export default App;