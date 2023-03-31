import '../styles/App.css';
import React from "react";
import NavBar from './NavBar';
import Footer from './Footer';
import discountBanner from '../images/discount_banner.jpeg'

const Discounts = () => {

  return (
    <div className="mensajeria_app">
        <NavBar />
        <div>
            <h2 className='headers-homepage'>Join us as a premium member and enjoy all the benefits</h2>
        </div>

        <div className='central-title'>
            <img
                className='hero-img'
                alt='Moveo cinema App hero'
                src={discountBanner}
            />
        </div>

        <div>
          <h2>Offers for all the family !</h2>
        </div>

        <Footer />
    </div>
  );
}

export default Discounts;