import React from "react";
import "./payment-popup.styles.scss";

const PaymentPopup = ({ setShowPopup}) => {
 
    const clickHandler = () =>{
        setShowPopup(false)
        window.location.pathname = "/shop";
    }

  return (
    <div id="signin-popup" className="PopupContainer" >
      <div className="Popup">
        <span className="PopupTitle">Payment Successfull</span>
        <span className="PopupDescription">You can go back to the shop page</span>
        <button onClick={() => clickHandler()} className="PopupAction" >
         Shop
        </button>
      </div>
    </div>
  );
};

export default PaymentPopup;
