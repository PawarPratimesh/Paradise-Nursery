import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += parseInt(item.cost) * item.quantity;
    });
    return total;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container" style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cartItems.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ccc', flexWrap: 'wrap' }}>
            <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
            
            <div style={{ flex: '1', marginLeft: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ margin: '0' }}>Unit Price: ${item.cost}</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>-</button>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>+</button>
            </div>
            
            <div style={{ flex: '1', textAlign: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>Subtotal: ${parseInt(item.cost) * item.quantity}</p>
            </div>
            
            <button 
              onClick={() => handleRemove(item)} 
              style={{ backgroundColor: '#f44336', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          onClick={(e) => onContinueShopping ? onContinueShopping(e) : window.location.href='/plants'} 
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Continue Shopping
        </button>
        <button 
          onClick={() => alert('Coming Soon')} 
          style={{ padding: '10px 20px', backgroundColor: '#ff9800', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;