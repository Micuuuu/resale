import React from "react"


import "./sold-item.styles.scss"
const SoldItem = ({item}) => {

    console.log(item);

    return(
        <div className="sold-item-container">
            <div >
                <img className="sold-item-image-container" src={item.imageUrl} alt={`${item.name}`} />
            </div>
            <span className="name">{item.name}</span>
            <div className="sold-item-details-container">
            <span className="price">{`$${item.price}`}</span>
                </div>
            </div>
    );

}


export default SoldItem