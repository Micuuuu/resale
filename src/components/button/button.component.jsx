/*
default

inverted

google sign in

*/

import "./button.styles.scss"
export const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'

}
const Button  = ({children, buttonType, isLoading,  ...otherProps}) => {
    console.log(isLoading)
    return(
        <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} disabled = { isLoading } {...otherProps}> 
            {isLoading ?(<div className="button-spinner"></div>) : children  }
        </button>
    )
}


export default Button