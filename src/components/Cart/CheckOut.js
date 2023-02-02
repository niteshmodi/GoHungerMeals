import { useRef ,useState } from 'react';
import classes from './Checkout.module.css';
 

const isEmpty = value => value.trim() === '';
const isSixChars = value => value.trim().length === 6;

const Checkout = (props) => {

  const [formInputValidity,setFromInputValidity]  =useState({
   name: true,
   street: true,
   postalCode: true,
   city: true
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();



  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid =  isSixChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)
    

    setFromInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalCodeIsValid,
        city: enteredCityIsValid
    })


    const formIsValid = 
    enteredNameIsValid && 
    enteredStreetIsValid && 
    enteredPostalCodeIsValid && 
    enteredCityIsValid;
   

    if (!formIsValid) {
     return;
    }
    

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postalCode: enteredPostalCode,
        city: enteredCity
    })
    //Submit the Cart Data
  };
  
  const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
  const streetControlClasses = `${classes.control} ${formInputValidity.street ? '' : classes.invalid}`
  const postalCodeControlClasses = `${classes.control} ${formInputValidity.postalCode? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputValidity.city ? '' : classes.invalid}`
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name'  ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please Write a valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please Write a valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputValidity.postalCode && <p>Please Write a valid postal code! (6 Chars Long.)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please Write a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;