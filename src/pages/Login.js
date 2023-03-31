import '../styles/App.css';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import moveoImage from '../images/moveo.png'

const Login = () => {

  const navigate = useNavigate();

  const [unauthorized, setUnauthorized] = useState(false);

  const [loginForm, setLoginForm] = useState({  
    email: "",
    password: ""
  });

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

  const authorizationRequest = async () => {

    const AUTHENTICATE_USER_ENDPOINT = "http://localhost:8080/api/v1/auth/authenticate";

    const body_lambda = JSON.stringify({
      email: loginForm.email,
      password: loginForm.password
    });

    console.log(`Body to be sent to Lambda = ${body_lambda}`)

    const response = await fetch(AUTHENTICATE_USER_ENDPOINT, {
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

    if (status === 200) {
      navigate("/");
      setLocalStorageLoginForm("auth_token", token);
      setLocalStorageLoginForm("username", loginForm.email);
    } else {
      setUnauthorized(true);
    }
  }

  const setLocalStorageLoginForm = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        document.getElementById("submit").click();
    }
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
      <h1>Login</h1>


      <div className="detallar_container">
      
        <div className='message_form'>

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
        </div>
        
        <button
          className='btn'
          type="button"
          id='submit'
          onClick={() => {
            authorizationRequest();
          }}
          onKeyDown={handleKeyDown}
        >
        Login
        </button>

        {unauthorized ?
        <div className='bad-credentials-login-label'>
          <p>** Account credentials are wrong</p>
          <p>Please provide correct ones</p>
        </div>
        :
        <></>}
        
        <div>
          <p>Or sign in with providers:</p>
          <button className='btn' >
            <FcGoogle /> Sign with Google
          </button>
          <button className='btn' >
            <AiFillFacebook /> Sign with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;