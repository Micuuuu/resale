import React from 'react'
import './category-item.styles.scss'

const CategoryItem = ({category}) => {

const {id, title, imageUrl} = category;

return(
       
            <div key = {id} className='category-container'>
            <div className='background-image ' style = {
                {
                backgroundImage: `url(${imageUrl})`
            }}/>
            <div className = 'category-body-container'>
                <h2 className='title'> {title} </h2>
                <span className='subtitle'> SHOP NOW</span> 
            </div>
            </div>

        )
}

export default CategoryItem
