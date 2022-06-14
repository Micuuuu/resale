import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectProductsById } from "../../store/categories/category.selector";
import { updateItemsDocument } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";

const ProductEditForm = () => {
    const {category, id} = useParams();
    const products = useSelector(selectProductsById);
    const defaultFormFields = products[id];
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await updateItemsDocument(category, formFields , defaultFormFields);
        } catch (error) {
          if (error.code === "auth/email-already-in-use")
            alert("email already in use");
          console.log("user creation encountered an error", error);
        }
      };
    // console.log(defaultFormFields)
    return(
        <form onSubmit={handleSubmit}>
        <FormInput
              label="Price"
              required
              type="text"
              onChange={handleChange}
              name="price"
              value={formFields.price}
            />

            <Button type="submit">UPDATE</Button>
            </form>
    )

}


export default ProductEditForm