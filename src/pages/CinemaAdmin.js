import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import Footer from './Footer';

const CinemaAdmin = () => {

    const [usersData, setUsersData] = useState([]);
  
    const getUsersInDB = async () => {
  
      const GET_USERS_ENDPOINT = "http://169.51.206.190:30179/api/v1/users";
  
      const response = await fetch(GET_USERS_ENDPOINT);
  
      const users = await response.json();
  
      setUsersData(users);
    };
  
    useEffect(() => {
      getUsersInDB();
    }, [])
  
    return (
      <div className="mensajeria_app">
          <NavBar />
  
          <div className='central-title'>
              <h3>Manage user points:</h3>
          </div>
  
          <div className='points-details-container'>
            {usersData.map(user => <User userData={user} />)}
          </div>
  
          <Footer />
      </div>
    );
}

const User = ({userData}) => {

    const [internalUserData, setInternalUserData] = useState([]);

    useEffect(() => {
        setInternalUserData(userData);
    }, [])

    const addPoints = async (points) => {

    const UPDATE_USER_ENDPOINT = `http://169.51.206.190:30179/api/v1/users/${userData.id}`;

    const extraPoints = internalUserData.points + points;

    console.log("Extra points = " + extraPoints)

    const body_lambda = JSON.stringify({
      points: extraPoints
    });

    await fetch(UPDATE_USER_ENDPOINT, {
        method: 'PATCH',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
        },
        body: body_lambda
        });
    };

    function refreshPage(){ 
        window.location.reload(); 
    }

    return (
        <div className='point-details-field'>
            <h3>Name:</h3>
            <p>{userData.first_name}</p>
            <h3>Points:</h3>
            <p>{userData.points}</p>
            <button
                className='btn'
                onClick={() =>{
                    addPoints(500);
                    refreshPage();
                }}
            >
                Add 500 Points
            </button>
        </div>
    );
}

export default CinemaAdmin;