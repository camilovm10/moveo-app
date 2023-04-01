import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import Footer from './Footer';

const Profile = () => {

  const [userData, setUserData] = useState([]);

  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
      getUserInDB();
  }, []);

  const getUserInDB = async () => {

    const username = JSON.parse(sessionStorage.getItem('username'));

    const GET_USER_ENDPOINT = "http://169.51.206.190:30179/api/v1/users";

    const response = await fetch(GET_USER_ENDPOINT);

    const users = await response.json();

    console.log(`data = ${users}`);

    const arrayFiltered = users.filter(user => user.email === username);

    setUserData(arrayFiltered[0])
  };

  const updateUserInDB = async () => {

    const UPDATE_USER_ENDPOINT = `http://169.51.206.190:30179/api/v1/users/${userData.id}`;

    console.log(UPDATE_USER_ENDPOINT)

    const body_lambda = JSON.stringify({
      email: userData.email,
      address: userData.address,
      promotional: userData.promotional
    });

    console.log(`Body to be sent to Lambda = ${body_lambda}`)

    await fetch(UPDATE_USER_ENDPOINT, {
      method: 'PATCH',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: body_lambda
    });

    setLocalStorageLoginForm("username", userData.email)
  };

  const setLocalStorageLoginForm = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  const setAddress = e => {
    setUserData(existingValues => ({
      ...existingValues,
      address: e,
    }))
  }

  const setEmail = e => {
    setUserData(existingValues => ({
      ...existingValues,
      email: e,
    }))
  }

  const setPromotional = e => {
    setUserData(existingValues => ({
      ...existingValues,
      promotional: e,
    }))
  }

  return (
    <div className="mensajeria_app">
        <NavBar />

        <div className='central-title'>
            <h3>Account details:</h3>
        </div>

        <div className='account-details-field'>
          <p>First name:</p>
          <p>{userData?.first_name}</p>
        </div>

        <div className='account-details-field'>
          <p>Last name:</p>
          <p>{userData?.last_name}</p>
        </div>

        <div className='account-details-field'>
          <p>Address:</p>
          {editStatus ? 
          <input 
            placeholder='Address...'
            value={userData.address}
            onChange={(e) => setAddress(e.target.value)}
          /> :
          <p>{userData?.address}</p>
          }
          
        </div>

        <div className='account-details-field'>
          <p>Premium:</p>
          <p>{userData?.premium ? "Yes" : "No"}</p>
        </div>

        <div className='account-details-field'>
          <p>Promotional content:</p>
          {editStatus ?
          <input 
            value={userData.promotional}
            onChange={(e) => setPromotional(e.target.checked)}
            type="checkbox"
          /> :
          <p>{userData?.promotional ? "Yes" : "No"}</p>
          }
          
        </div>

        <div className='account-details-field'>
          <p>Email:</p>
          {editStatus ?
          <input 
            type="email"
            placeholder='Email...'
            value={userData.email}
            onChange={(e) => setEmail(e.target.value)}
          /> : 
          <p>{userData?.email}</p>}
          
        </div>

        {
          editStatus ?
          <button
            className='btn'
            type="button"
            id='submit'
            onClick={() => {
              setEditStatus(false);
              updateUserInDB();
            }}
          >
          Save
          </button> :
            <button
            className='btn'
            type="button"
            id='submit'
            onClick={() => {
              setEditStatus(true);
            }}
          >
          Edit
          </button> 
        }
        <Footer />
    </div>
  );
}

export default Profile;