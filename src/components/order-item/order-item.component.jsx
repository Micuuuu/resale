import React from "react"
import { selectUserDataMapById } from "../../store/user-data/user-data.selector";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./order-item.styles.scss"
const OrderItem = ({item}) => {
    const userDataMapById = useSelector(selectUserDataMapById);
    console.log(item);

    return(
        <div className="order-item-container">
                <div >
                    <img className="order-item-image-container" src={item.imageUrl} alt={`${item.name}`} />
                </div>
                <div>
                    
                    <span className="name">{item.name}</span>
                    <div className="owner">
                        <span className="owner-text">Owner:</span> 
                        <Link className = "owner-link" to = {`/profile/${item.owner.uid}/dressing`}><span>{userDataMapById[item.owner.uid].displayName}</span></Link>
                    </div>
                </div>
                <div className="order-item-details-container">
                    <span className="price">{`$${item.price}`}</span>
                </div>
            </div>
    );

}


export default OrderItem