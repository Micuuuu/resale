import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductsById } from "../../store/categories/category.selector";
import { updateItemsDocument } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";


import "./product-edit.styles.scss"
const ProductEditForm = () => {
    const {category, id} = useParams();
    const products = useSelector(selectProductsById);
    const defaultFormFields = products[id];
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { gender, name,  size,  brand, itemDescription, image, url, price, material,color } = formFields;
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
          await updateItemsDocument(category, formFields , defaultFormFields);
          setIsLoading(false);
          window.location.pathname = `/shop/${category}/${id}/details`;
        } catch (error) {
          setIsLoading(false);
          alert(error.message)
          console.log(error);
        }
      };
    // console.log(defaultFormFields)
    return(

      <div className="edit-item-container">
        
    
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
    
        <h2>Edit your item</h2>
        
          
        <form className="edit-form"  onSubmit={handleSubmit}>
          
      
          <FormInput label="Edit your item name" required type="input" onChange={handleChange} name="title" value={name} />
          <select as="select" required className=" dropbtn" defaultValue={gender} name="gender"  onChange={handleChange}>
                <option>Choose gender...</option>
                <option>Women</option>
                <option>Men</option>
              </select>
  
              <select as="select" className="dropbtn" defaultValue={material} name="material" required onChange={handleChange}>
                <option>Choose material...</option>
                <option>Cotton</option>
                <option>Leather</option>
                <option>Polyester</option>
              </select>  
              <select as="select" className="dropbtn" defaultValue={size} name="size" required onChange={handleChange}>
                <option>Choose your size...</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select> 
              <select as="select" className="dropbtn" defaultValue={color} name="color" required onChange={handleChange}>
                <option>Choose color...</option>
                <option>Black</option>
                <option>Brown</option>
                <option>Burgundy</option>
                <option>Caramel</option>
                <option>Dark blue</option>
                <option>Fuchsia</option>
                <option>Gold</option>
                <option>Grey</option>
                <option>Green</option>
                <option>Khaki</option>
                <option>Orange</option>
                <option>Pink</option>
                <option>Purple</option>
                <option>Red</option>
                <option>Silver</option>
                <option>Turquoise</option>
                <option>White</option>
                <option>Yellow</option>
                <option>Print</option>
                <option>Multicolor</option>
              </select>
          <FormInput
                label="Edit price"
                required
                type="text"
                onChange={handleChange}
                name="price"
                value={formFields.price}
              />
  
              <FormInput label="Edit brand" required type="text" onChange={handleChange} name="brand" value={brand} />
           
  
            
            <FormInput label="Edit your item description" required type="input" onChange={handleChange} name="itemDescription" value={itemDescription} />
            
            
  
              <Button type="submit">UPDATE</Button>
              </form>
      
      </div>
      
        
    )

}


export default ProductEditForm