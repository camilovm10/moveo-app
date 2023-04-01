import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import Footer from './Footer';

const Admin = () => {

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
            <h3>Account details:</h3>
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

  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    setInternalUserData(userData);
  }, [])

  const updateUserInDB = async () => {

    const UPDATE_USER_ENDPOINT = `http://169.51.206.190:30179/api/v1/users/${userData.id}`;

    console.log(UPDATE_USER_ENDPOINT)

    const body_lambda = JSON.stringify({
      first_name: internalUserData.first_name,
      last_name: internalUserData.last_name,
      email: internalUserData.email,
      address: internalUserData.address,
      promotional: internalUserData.promotional,
      premium: internalUserData.premium,
      role: internalUserData.role
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
  };

  const deleteUser = async () => {

    const DELETE_USER_ENDPOINT = `http://169.51.206.190:30179/api/v1/users/${userData.id}`;

    await fetch(DELETE_USER_ENDPOINT, {
      method: 'DELETE',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      }
    });
  }

  const setFirstname = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      first_name: e,
    }))
  }

  const setLastname = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      last_name: e,
    }))
  }

  const setAddress = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      address: e,
    }))
  }

  const setEmail = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      email: e,
    }))
  }

  const setPromotional = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      promotional: e,
    }))
  }

  const setPremium = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      premium: e,
    }))
  }

  const setRole = e => {
    setInternalUserData(existingValues => ({
      ...existingValues,
      role: e,
    }))
  }

  function refreshPage(){ 
    window.location.reload(); 
}

  return (
    <div>
      <div className='central-title'>
          <h3>Account details:</h3>
      </div>

      <div className='account-details-field'>
        <p>First name:</p>
        
        {editStatus ? 
        <input 
          placeholder='Firstname...'
          value={internalUserData.first_name}
          onChange={(e) => setFirstname(e.target.value)}
        /> :
        <p>{internalUserData?.first_name}</p>
        }
      </div>

      <div className='account-details-field'>
        <p>Last name:</p>
        {editStatus ? 
        <input 
          placeholder='Lastname...'
          value={internalUserData.last_name}
          onChange={(e) => setLastname(e.target.value)}
        /> :
        <p>{internalUserData?.last_name}</p>}
      </div>

      <div className='account-details-field'>
        <p>Address:</p>
        {editStatus ? 
        <input 
          placeholder='Address...'
          value={internalUserData.address}
          onChange={(e) => setAddress(e.target.value)}
        /> :
        <p>{internalUserData?.address}</p>
        }
      </div>

      <div className='account-details-field'>
        <p>Premium:</p>

        {editStatus ?
        <input 
          value={internalUserData.premium}
          type="checkbox"
          onChange={(e) => setPremium(e.target.checked)}
        /> :
        <p>{internalUserData?.premium ? "Yes" : "No"}</p>}
      </div>

      <div className='account-details-field'>
        <p>Promotional content:</p>
        {editStatus ?
        <input 
          value={internalUserData.promotional}
          type="checkbox"
          onChange={(e) => setPromotional(e.target.checked)}
        /> :
        <p>{internalUserData?.promotional ? "Yes" : "No"}</p>
        }
      </div>

      <div className='account-details-field'>
        <p>Email:</p>
        {editStatus ?
        <input 
          type="email"
          placeholder='Email...'
          value={internalUserData.email}
          onChange={(e) => setEmail(e.target.value)}
        /> : 
        <p>{internalUserData?.email}</p>}
        
      </div>

      <div className='account-details-field'>
        <p>Role:</p>
        {editStatus ?
        <select 
          name="select"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" selected disabled hidden>Select Role...</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Cinema">Cinema</option>
        </select> : 
        <p>{internalUserData?.role}</p>}
        
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
            refreshPage();
          }}
        >
        Save
        </button> :
        <>
        <button
          type="button"
          id='submit'
          onClick={() => {
            setEditStatus(true);
          }}
        >
        Edit User
        </button> 
        <button
          onClick={() => {
            deleteUser();
            refreshPage();
          }}
        >
          Delete user
        </button>
      </>
      }
    </div>
  );
}

export default Admin;