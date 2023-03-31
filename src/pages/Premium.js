import '../styles/App.css';
import React, { useState, useEffect } from "react";
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import Footer from './Footer';
import { AiFillCreditCard } from "react-icons/ai";

const Premium = () => {

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
      getUserInDB(user);
    }
  }, []);

  const updatePremiumPlan = async (boolean) => {

    const PREMIUM_USER_ENDPOINT = `http://localhost:8000/api/v1/users/${userData.id}/premium`;

    const body_lambda = JSON.stringify({
      premium: boolean
    });

    await fetch(PREMIUM_USER_ENDPOINT, {
      method: 'PATCH',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: body_lambda
    });
  }

  return (
    <div className="mensajeria_app">
        <NavBar />
        <div className='central-title'>

          {
            userData?.premium ?
            <div>
              <h3>You are a premium user !</h3>
              <p>
                You are enjoying all the benefits of Moveo Premium such as: 
              </p>
              <ul>
                <li>New releseas every week</li>
                <li>15% of discount on more than 100+ cinemas</li>
                <li>Awesome merch every month</li>
                <li>Online catalogue of more than 14.000 series and movies</li>
                <li>Much more !</li>
              </ul>

              <p>You are paying a monthly recurring bill of $19.95 USD, you can cancel anytime.</p>

              <Link to={'/'}>
                <button
                  className='btn'
                  onClick={() => updatePremiumPlan(false)}
                >
                  Cancel subscription
                </button>
              </Link>

            </div> :

            <div>
              <h3>You have free plan</h3>
              <p>
                Go Premium and enjoy all the Moveo Premium account benefits such as: 
              </p>

              <p>Pay a monthly recurring bill of $19.95 USD and enjoy all the Moveo Premium benefits. You can cancel anytime.</p>

              <div className='credit-card-container'>
                <h3>Credit Card Info: <AiFillCreditCard /></h3>

                <div>
                  <label>Credit Card #</label>
                  <input></input>
                </div>
                
                <div>
                  <label>Expiration date:</label>
                  <input
                    type="date"
                  ></input>

                  <label>CVV:</label>
                  <input
                    type="password"
                  ></input>
                </div>
                
              </div>  

              <Link to={'/'} className="link-btn">
                <button
                  className='premium-btn'
                  onClick={() => updatePremiumPlan(true)}
                >
                  Go Premium
                </button>
              </Link>
            </div>
          }
        </div>

        <Footer />
    </div>
  );
}

export default Premium;