import './userDashboard.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

function UserDashboard() {
    const navigation = useNavigate();
    const [authorized,setAuthorized] = useState(false);

    useEffect(()=>{
         function checkAuth(){
            const token = localStorage.getItem('AUTH_TOKEN');
            console.log(token);
            
            if(!token){
                setAuthorized(false);
                alert('Unauthorized!!!');
                navigation('/login');
                return;
            }
            fetch('https://99zfntk1-3300.inc1.devtunnels.ms/api/checkAuth',{
                method:'GET',
                credentials:'include',
                headers:{
                    "AUTH":token
                }
            })
            .then(async (resp)=>{
                if(resp.ok){
                    const data  = await resp.json(); 
                    console.log(data);
                    
                    setAuthorized(data.isAuthorized)
                }else{
                    const data  = await resp.json(); 
                    alert(data.message);
                }
            })
        }

        checkAuth()
    });

    return(
        authorized ? 
        <div class="dashboard">
  <div class="card project-card">
    <div class="profile-section">
      <div class="profile">
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3595785.jpg&f=1&nofb=1&ipt=61b0b72541f48c23331b4436e8f03c5167c984db27a29d978907dfa0a2994db3&ipo=images" alt="Profile" class="profile-img"/>
        <div>
          <h2>Bikram Sahoo </h2>
          <p>Developer</p>
        </div>
      </div>
      <div class="actions">
        <button class="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        <button class="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </div>
    </div>

    <h1>HostelEase</h1>
    <div class="industry">
      <span>Industry:</span>
      <span class="bold">None</span>
    </div>

    <div class="progress-section">
      <div class="progress-header">
        <span>Project progress</span>
        <span>84%</span>
      </div>
      <div class="progress-bar">
        <div class="progress" style={{width: "84%"}}></div>
      </div>
    </div>

    <div class="card-footer">
      <button class="select-report">
        Select a report
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <button class="send-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  </div>


  <div class="card meetings-card">
    <div class="meetings-header">
      <h2>Upcoming<br/>Meetings</h2>
      <button class="month-selector">
        September
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>

    <div class="calls-info">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
      <span>3 calls • Thu, 11</span>
    </div>

    <div class="calendar-days">
      <div class="day">
        <span class="number">8</span>
        <span class="label">Mon</span>
      </div>
      <div class="day">
        <span class="number">9</span>
        <span class="label">Tue</span>
      </div>
      <div class="day">
        <span class="number">10</span>
        <span class="label">Wed</span>
      </div>
      <div class="day active">
        <span class="number">11</span>
        <span class="label">Thu</span>
      </div>
      <div class="day">
        <span class="number">12</span>
        <span class="label">Fri</span>
      </div>
      <div class="day">
        <span class="number">13</span>
        <span class="label">Sat</span>
      </div>
    </div>
  </div>

  <div class="card roadmap-card">
    <div class="roadmap-header">
      <h2>Project<br/>Roadmap</h2>
      <button class="add-task">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add task
      </button>
    </div>

    <div class="tasks">
      <div class="task">
        <div class="task-header">
          <span>Intro</span>
          <span>100%</span>
        </div>
        <div class="task-progress">
          <div class="progress" style={{width: "100%"}}></div>
          <div class="task-users">
            <div class="user"></div>
            <div class="user"></div>
          </div>
        </div>
      </div>

      <div class="task">
        <div class="task-header">
          <span>Audit</span>
          <span>59%</span>
        </div>
        <div class="task-progress">
          <div class="progress" style={{width: "59%"}}></div>
          <div class="task-users">
            <div class="user"></div>
          </div>
        </div>
      </div>

      <div class="task">
        <div class="task-header">
          <span>Research</span>
          <span>75%</span>
        </div>
        <div class="task-progress">
          <div class="progress" style={{width: "75%"}}></div>
          <div class="task-users">
            <div class="user"></div>
            <div class="user"></div>
            <div class="user"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="timeline">
      <span>Mon 12</span>
      <span>Tue 13</span>
      <span>Wed 14</span>
      <span>Thu 15</span>
      <span>Fri 16</span>
    </div>
  </div>


  <div class="card efficiency-card">
    <div class="efficiency-header">
      <h2>Efficiency</h2>
      <button class="month-selector">
        January
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
    <div class="efficiency-value">+40%</div>
    <div class="chart"></div>
  </div>


  <div class="card time-card">
    <div class="time-header">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      <h2>Total project time</h2>
    </div>
    <div class="time-value">64+ <span>h</span></div>
  </div>

  <div class="card ai-card">
    <div class="ai-content">
      <div>
        <h2>AI</h2>
        <p>Smart<br/>Assistant</p>
      </div>
      <button class="arrow-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </button>
    </div>
    <img src="https://m.foolcdn.com/media/dubs/images/Robot-AI-image-Getty-Images.original.jpg" alt="AI Assistant" class="ai-image"/>
  </div>

  <div class="card ai-card">
    <div class="ai-content">
      <div>
        <h2>Personal</h2>
        <p>Health<br/>Care</p>
      </div>
      <button class="arrow-button">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </button>
    </div>
    <img src="https://homecentralhealthcare.com/wp-content/uploads/2019/07/Personal-Care_1.jpg" alt="AI Assistant" class="ai-image"/>
  </div>
</div>
        : null
    )
}
export default UserDashboard;