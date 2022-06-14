import React from 'react'
import {ReactComponent as Sneakers} from '../../assets/home/Vector.svg';
import {ReactComponent as Hat} from '../../assets/home/hat.svg';
import {ReactComponent as Jacket} from '../../assets/home/jacket.svg';
import {ReactComponent as Bag} from '../../assets/home/bag.svg';

import CategoryItem from '../category-item/category-item.component'
import { Link } from 'react-router-dom';


import './directory-menu.styles.scss'
const DirectoryMenu = () => {
    const categories = [
        {
          "id": 1,
          "title": "hats",
          "imageUrl": "https://i.ibb.co/cvpntL1/hats.png"
        },
        {
          "id": 2,
          "title": "jackets",
          "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png"
        },
        {
          "id": 3,
          "title": "sneakers",
          "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png"
        },
        {
          "id": 4,
          "title": "women",
          "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png"
        },
        {
          "id": 5,
          "title": "men",
          "imageUrl": "https://i.ibb.co/R70vBrQ/men.png"
        }
      ]
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
                <Link to="/shop" className='promo-copy-cta-button promo-copy-cta-button--right'>
                  <div>SHOP</div>
                </Link>
                <Link to="/sell" className='promo-copy-cta-button promo-copy-cta-button--left'>
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
        <div className='categories-container'>
        {
           categories.map((category)=>(          
              
            <CategoryItem key = {category.id} category = {category}/>
            ))
         
        }     
        </div>

      </div>
    )
}


export default DirectoryMenu