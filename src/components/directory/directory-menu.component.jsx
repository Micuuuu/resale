import React from 'react'
import { useState } from "react";

import {ReactComponent as Sneakers} from '../../assets/home/Vector.svg';
import {ReactComponent as Hat} from '../../assets/home/hat.svg';
import {ReactComponent as Jacket} from '../../assets/home/jacket.svg';
import {ReactComponent as Bag} from '../../assets/home/bag.svg';

import { Link } from 'react-router-dom';
import { selectCurrentUser } from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import SigninPopup from '../signin-popup/signin-popup.component';

import './directory-menu.styles.scss'
const DirectoryMenu = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [showPopup, setShowPopup] = useState(false);
  const [pageName, setPageName] = useState("");
   
  const openSigninPopup = (e) => {
    if (!currentUser) {
      console.log(e.target.id);
      setPageName(e.target.id)
      e.preventDefault();
      setShowPopup(true);
    }
  };

    return (
      <div>
        <section className='home-section promo-container'>
          <div className = 'promo-copy'>
            <div className='promo-copy-texts'>
              <h2 className='promo-copy-text promo-copy-heading'>2 WEAR</h2>
              <h3 className='promo-copy-text promo-copy-subheading'>Join us in redefining second hand market </h3>
              <p className='promo-copy-text promo-copy-paragraph'>When you buy or sell a pre-owned fashion item, 
                you extend its life by approximately 9 months, 
                which can lead to almost 30% decrease of its carbon footprint. </p>
            </div>

            <div className='promo-copy-cta'>
                <Link id="Shop" onClick={(e) => openSigninPopup(e)} to="/shop" className='promo-copy-cta-button promo-copy-cta-button--right'>
                  <div>SHOP</div>
                </Link>
                <Link to="/sell"  id="Sell" onClick={(e) => openSigninPopup(e)} className='promo-copy-cta-button promo-copy-cta-button--left'>
                  <div>SELL</div>
                </Link>
            </div>
            
            {/* <p>Our goal is to create a community of fashion lovers that promotes
               sustainable slow fashion through pre-owned clothes.</p> */}
          </div>
          
          <div className = "svg-container-sneaker">
            <Sneakers className='svg' />
          </div>
          <div className = "svg-container-hat">
            <Hat className='svg' />
          </div>
          <div className = "svg-container-jacket">
            <Jacket className='svg' />
          </div>
          <div className = "svg-container-bag">
            <Bag className='svg' />
          </div>
        </section>
       
        {showPopup && <SigninPopup setShowPopup={setShowPopup} pageName = {pageName} />}

      </div>
    )
}


export default DirectoryMenu