import '../styles/App.css';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moveoImage from '../images/moveo.png';

const NavBar = () => {

  const [username, setUsername] = useState("");

  const [userData, setUserData] = useState([]);

  const getUserInDB = async (_user) => {

    const GET_USER_ENDPOINT = "http://localhost:8000/api/v1/users";

    const response = await fetch(GET_USER_ENDPOINT);

    const users = await response.json();

    console.log(`data = ${users}`);

    const arrayFiltered = users.filter(user => user.email === _user);

    setUserData(arrayFiltered[0]);
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('username'));
    if (user) {
      setUsername(user);
      getUserInDB(user);
    }
  }, []);

  const signOutUser = () => {
    sessionStorage.clear();
  }
  
  function refreshPage(){ 
    window.location.reload(); 
}

  return (
    <div>
        <div className='central-title'>
            <img
                className='hero-img'
                alt='Moveo cinema App hero'
                src={moveoImage}
            />
        </div>

        <ul className="navbar-nav">
              <li><Link to={'/'} className="nav-link nav-link-color"> Home </Link></li>
              <li><Link to={'/movies'} className="nav-link nav-link-color">Movies</Link></li>
              <li><Link to={'/discounts'} className="nav-link nav-link-color">Discounts & Rewards</Link></li>
              {username === "" ? <li><Link to={'/login'} className="nav-link nav-link-color">Login</Link></li>: <></>}
              {username !== "" ? <li onClick={() => {signOutUser(); refreshPage(); }}><Link to="/" className="nav-link nav-link-color">Log-out</Link></li> : <></>}
              {userData?.role === "Admin" ? <li><Link to={'/admin'} className="nav-link nav-link-color">Admin</Link></li> : <></>}
              {userData?.role === "Cinema" ? <li><Link to={'/cinema-admin'} className="nav-link nav-link-color">Cinema Admin</Link></li> : <></>}
              {username === "" ? <li><Link to={'/sign-up'} className="nav-link nav-link-color">Sign-Up</Link></li> : <></>}
              {username !== "" ? <li><Link to={'/profile'} className="nav-link nav-link-color">Profile</Link></li>: <></>}
        </ul>

        <div className='account-navbar-details'>
          <p>Account: </p>
          <p className='account-navbar-item'>{username === "" ? "Guest account" : userData.first_name}</p>
          <p>{username === "" ? "" : "Points:" }</p>
          <p className='account-navbar-item'>{username === "" ? <></> : userData.points }</p>
          {
            username !== "" ?
            (userData?.premium ? 
            <Link to={'/premium'}>
            <button
              className='premium-btn'
            >Premium</button> </Link> :
            <Link to={'/premium'}>
            <button
              className='nav-link nav-link-color'
            >Go premium</button> </Link>) :
            <></>
          }
          
        </div>
    </div>
  );
}

export default NavBar;