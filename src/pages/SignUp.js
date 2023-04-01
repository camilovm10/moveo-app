import '../styles/App.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moveoImage from '../images/moveo.png'

const SignUp = () => {

  const navigate = useNavigate();

  const [unauthorized, setUnauthorized] = useState(false);

  const [loginForm, setLoginForm] = useState({  
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    promotional: false
  });

  const setPromotional = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      promotional: e,
    }))
  }

  const setFirstname = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      firstname: e,
    }))
  }

  const setLastname = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      lastname: e,
    }))
  }

  const setAddress = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      address: e,
    }))
  }

  const setPassword = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      password: e,
    }))
  }

  const setEmail = e => {
    setLoginForm(existingValues => ({
      ...existingValues,
      email: e,
    }))
  }

  const setLocalStorageLoginForm = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        document.getElementById("submit").click();
    }
  };

  const registerUser = async () => {

    const REGISTER_USER_ENDPOINT = "http://localhost:8080/api/v1/auth/register";

    const body_lambda = JSON.stringify({
      firstname: loginForm.firstname, 
      lastname: loginForm.lastname,
      email: loginForm.email,
      password: loginForm.password
    });

    console.log(`Body to be sent to Lambda = ${body_lambda}`)

    const response = await fetch(REGISTER_USER_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: body_lambda
    });

    let data, token, status;

    try {
      data = await response.json();
      token = data.token;
      status = response.status;
    } catch (error) {
      console.log(error)
    }

    if(status === 200) {
      setLocalStorageLoginForm("username", loginForm.email);
      setLocalStorageLoginForm("auth_token", token);
      createUserInDB();
      navigate("/");
    } else {
      setUnauthorized(true);
    }
  };

  const createUserInDB = async () => {

    const CREATE_USER_ENDPOINT = "http://169.51.206.190:30179/api/v1/users/create";

    const body_lambda = JSON.stringify({
      first_name: loginForm.firstname, 
      last_name: loginForm.lastname,
      email: loginForm.email,
      address: loginForm.address,
      role: "User",
      premium: false,
      promotional: loginForm.promotional
    });

    console.log(`Body to be sent to Lambda = ${body_lambda}`)

    await fetch(CREATE_USER_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: body_lambda
    });
  };

  return (
    <div className="mensajeria_app">

      <div className='central-title'>
          <Link to="/">
            <img
                className='hero-img'
                alt='Moveo cinema App hero'
                src={moveoImage}
            />
            </Link>
      </div>

      <h1>Create an account:</h1>

      <div className="detallar_container">
      
        <div className='message_form'>

          <label className='message_form_label'>First name:</label>
          <input 
            placeholder='First name...'
            value={loginForm.firstname}
            onChange={(e) => setFirstname(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <label className='message_form_label'>Last name:</label>
          <input 
            placeholder='Last name...'
            value={loginForm.lastname}
            onChange={(e) => setLastname(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <label className='message_form_label'>Address:</label>
          <input 
            placeholder='Address...'
            value={loginForm.address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={handleKeyDown}
          />  

          <label className='message_form_label'>Email:</label>
          <input 
            type="email"
            placeholder='Email...'
            value={loginForm.email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <label className='message_form_label'>Password:</label>
          <input 
            placeholder='Password...'
            value={loginForm.password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            type="password"
          />

          <div>
            <label className='message_form_label_promo'>Do you want to receive promotional information to your email ?</label>
            <input 
              value={loginForm.promotional}
              onChange={(e) => setPromotional(e.target.checked)}
              onKeyDown={handleKeyDown}
              type="checkbox"
            />
          </div>
        
        </div>
        <button
          className='btn'
          type="button"
          id='submit'
          onClick={() => {
            registerUser();
          }}
          onKeyDown={handleKeyDown}
        >
        Create Account
        </button>

        {unauthorized ?
          <div className='bad-credentials-login-label'>
            <p>** This email is already in use,</p>
            <p>Please use other one</p>
          </div>:
          <></>}
      </div>
    </div>
  );
}

export default SignUp;