import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { clearAllItemFromCart } from "../../store/cart/cart.action";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button, {BUTTON_TYPES_CLASSES} from "../button/button.component"
import PaymentPopup from "../payment-popup/payment.popup.component";
import "./payment-form.styles.scss"


//firebase
import { updateUserSoldItemsCount } from "../../utils/firebase/firebase.utils";
import { deleteItemsDocument } from "../../utils/firebase/firebase.utils";
import { updateUserSoldItemList } from "../../utils/firebase/firebase.utils";
import { updateUserOrderList } from "../../utils/firebase/firebase.utils";
const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
   
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
          return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }).then((res) => {
          return res.json();
        });
    
        const clientSecret = response.paymentIntent.client_secret;
        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: currentUser ? currentUser.displayName : 'Yihua Zhang',
            },
          },
        });
    
        setIsProcessingPayment(false);
    
        if (paymentResult.error) {
          setIsLoading(false);
          alert(paymentResult.error.message);

        } else {
          if (paymentResult.paymentIntent.status === 'succeeded') {
            clearData()
            setShowPopup(true)
            {cartItems.map(async(item) => {
              await updateSoldItems(item.owner.uid);
              await deleteItem(item);
              await updateUserSoldItems(item);
              await updateUserOrders(item)
             
            })
            
          }

            setIsLoading(false);
         
            
         
          }
        }

      };
    

      const clearData = () => {
         
              dispatch(clearAllItemFromCart())        
      
      }

      const updateSoldItems = async (ownerUid) =>{
        try {
          await updateUserSoldItemsCount(ownerUid);
        } catch (error) {
          
          console.log(error);
        }
      }

      const deleteItem = async (item) => {
        const {brand, category, color, createdAt, gender, id, imageUrl, itemDescription, material, name, owner, price, size  } = item;
        try {
          await deleteItemsDocument(item.category, {brand, category, color, createdAt, gender, id, imageUrl, itemDescription, material, name, owner, price, size  });
        } catch (error) {
          
          console.log(error);
        }
      }
      const updateUserSoldItems = async (item) => {
        try {
          await updateUserSoldItemList(item.owner.uid, item);
        } catch (error) {
          
          console.log(error);
        }
      }

      const updateUserOrders = async (item) => {
        try {
          await updateUserOrderList(currentUser.uid, item);
        } catch (error) {
          
          console.log(error);
        }
      }
      
    return(

        <div className="payment-form-container">
             {isLoading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ""
      )}
            <form className="form-container" onSubmit={paymentHandler}>
                <h2>Credit Card Payment</h2>
                <CardElement className="card-details"  />
                <Button  isLoading= {isProcessingPayment} buttonType = {BUTTON_TYPES_CLASSES.inverted}> Pay now</Button>
            </form>

            {showPopup && <PaymentPopup setShowPopup={setShowPopup}  />}

        </div>
    )

}

export default PaymentForm