
import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckOut  from './CheckOut';
const Cart = (props) => {   
   const [isCheckedOut , setIsCheckedOut] = useState(false);
   const [isSubmitting , setIsSubmitting] = useState(false);
   const [didSubmit,setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item,amount : 1});
  };
 const orderHandler = () => {
 setIsCheckedOut(true)
 }

 const submitOrderHandler = async (userData) => {
  setIsSubmitting(true);
  await fetch("https://react-food-order-ecc54-default-rtdb.firebaseio.com/orders.json" , {
    method: "POST",
    body:JSON.stringify({
      user: userData,
      orderedItems: cartCtx.items
    })
  })
  setIsSubmitting(false);
  setDidSubmit(true);
  cartCtx.clearCart();
 }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modelActions = <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
</div>
 

 const cartModelContent = (<>
     {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckedOut && <CheckOut onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
      {!isCheckedOut && modelActions}
 </>
 )

 const isSubmittingModelContent = <p>Sending Order Data...</p>
 const didSubmitModelContent = (<>
 <p>Sucessfully sent the order! Thank you for ordering from us</p>
 <div className={classes.actions}>
  <button className={classes.button} onClick={props.onClose}>
    Close
  </button>
</div>
 </>)

 
  return (  
    <Modal onClose={props.onClose}>
     {!isSubmitting && !didSubmit && cartModelContent}
     {isSubmitting &&  !didSubmit &&  isSubmittingModelContent}
     {!isSubmitting &&didSubmit && didSubmitModelContent}
    </Modal>
  );
};

export default Cart;
